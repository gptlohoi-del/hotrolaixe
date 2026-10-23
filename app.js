/**************************************************************
 * 0. CẤU HÌNH CÁC NÚT ĐỘ NHẠY NHANH
 **************************************************************/
const QUICK_SCALE_PRESETS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const BASE_THRESHOLDS = {
  maxGa: 0.25,
  maxPhanh: 0.28,
  maxCua: 0.25,
  potholeThreshold: 0.30,
  maxJerk: 0.30
};

const WAVE_TYPES = ['square', 'sine', 'triangle'];
const WAVE_NAMES = {
  square: 'Square (Siêu to)',
  triangle: 'Triangle (Vừa)',
  sine: 'Sine (Êm)'
};

const POTHOLE_WAVES = ['sawtooth', 'square', 'sine'];
const POTHOLE_WAVE_NAMES = {
  sawtooth: 'Sawtooth (Chuông lùi)',
  square: 'Square (Siêu to)',
  sine: 'Sine (Êm)'
};

/**************************************************************
 * 1. ĐĂNG KÝ SERVICE WORKER
 **************************************************************/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

/**************************************************************
 * 2. QUẢN LÝ CẤU HÌNH NGƯỜI DÙNG (LOCALSTORAGE)
 **************************************************************/
const defaultConfig = {
  masterScale: 40,
  maxGa: 0.10,
  maxPhanh: 0.11,
  maxCua: 0.10,
  potholeThreshold: 0.12, // Ngưỡng 100% cho thanh Ổ gà & Đường xóc
  maxJerk: 0.12,
  waveType: 'square',
  potholeWave: 'sawtooth',
  volumeBoost: 3.0,
  startBeep: 70,
  scoreRecovery: 3,
  peakHoldTime: 1.5,
  alertHoldTime: 3.0,
  theme: 'light',
  chartType: 'bar'
};

let config = { ...defaultConfig };
try {
  const saved = JSON.parse(localStorage.getItem('smoodri_cfg_v6'));
  if (saved) config = { ...defaultConfig, ...saved };
} catch (e) {}

function saveConfig() {
  localStorage.setItem('smoodri_cfg_v6', JSON.stringify(config));
}

/**************************************************************
 * 3. GIAO DIỆN, KIỂU BIỂU ĐỒ, SÓNG ÂM & Ổ GÀ
 **************************************************************/
function applyTheme(themeName) {
  config.theme = themeName;
  const metaTheme = document.getElementById('metaThemeColor');
  if (themeName === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('lblThemeName').textContent = 'Sáng (Light)';
    document.getElementById('btnThemeLight').classList.add('selected');
    document.getElementById('btnThemeDark').classList.remove('selected');
    if (metaTheme) metaTheme.setAttribute('content', '#f1f5f9');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('lblThemeName').textContent = 'Tối (Dark)';
    document.getElementById('btnThemeDark').classList.add('selected');
    document.getElementById('btnThemeLight').classList.remove('selected');
    if (metaTheme) metaTheme.setAttribute('content', '#0b1120');
  }
  saveConfig();
}

function applyChartType(type) {
  config.chartType = type;
  const barsView = document.getElementById('barsView');
  const donutsView = document.getElementById('donutsView');
  const btnBar = document.getElementById('btnChartBar');
  const btnDonut = document.getElementById('btnChartDonut');

  if (type === 'donut') {
    barsView.classList.add('hidden');
    donutsView.classList.remove('hidden');
    btnDonut.classList.add('selected');
    btnBar.classList.remove('selected');
    document.getElementById('lblChartType').textContent = 'Vòng tròn (Donut)';
  } else {
    donutsView.classList.add('hidden');
    barsView.classList.remove('hidden');
    btnBar.classList.add('selected');
    btnDonut.classList.remove('selected');
    document.getElementById('lblChartType').textContent = 'Thanh ngang (Bar)';
  }
  saveConfig();
}

function applyWaveType(wave, playSample = false) {
  if (!WAVE_TYPES.includes(wave)) wave = 'square';
  config.waveType = wave;

  document.getElementById('lblWaveType').textContent = WAVE_NAMES[wave] || wave;
  document.getElementById('mainWaveLabel').textContent = wave.toUpperCase();

  ['square', 'triangle', 'sine'].forEach((w) => {
    const btn = document.querySelector(`[data-wave="${w}"]`);
    if (btn) btn.classList.toggle('selected', w === wave);
  });

  saveConfig();
  if (playSample) emitSingleBeep(1850, 75);
}

function applyPotholeWave(wave, playSample = false) {
  if (!POTHOLE_WAVES.includes(wave)) wave = 'sawtooth';
  config.potholeWave = wave;

  document.getElementById('lblPotholeWave').textContent = POTHOLE_WAVE_NAMES[wave] || wave;

  ['sawtooth', 'square', 'sine'].forEach((w) => {
    const btn = document.querySelector(`[data-pothole="${w}"]`);
    if (btn) btn.classList.toggle('selected', w === wave);
  });

  saveConfig();
  if (playSample) emitPotholeBeep();
}

function renderScalePresetButtons() {
  const container = document.getElementById('scalePresetsContainer');
  if (!container) return;
  container.innerHTML = '';

  QUICK_SCALE_PRESETS.forEach((pct) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-option preset-scale-btn';
    btn.dataset.scale = pct;
    btn.textContent = `${pct}%`;
    if (Number(config.masterScale) === pct) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => {
      applyMasterScale(pct, true);
    });
    container.appendChild(btn);
  });
}

function updateScaleUIHighlights(pct) {
  document.getElementById('lblMasterScale').textContent = `${pct} %`;
  document.getElementById('rngMasterScale').value = pct;
  document.getElementById('mainScaleLabel').textContent = `${pct}%`;

  document.querySelectorAll('.preset-scale-btn').forEach((btn) => {
    btn.classList.toggle('selected', Number(btn.dataset.scale) === Number(pct));
  });
}

function applyMasterScale(scalePct, playSample = false) {
  const pct = Math.max(20, Math.min(150, Number(scalePct) || 100));
  config.masterScale = pct;
  const ratio = pct / 100;

  config.maxGa = Math.max(0.05, +(BASE_THRESHOLDS.maxGa * ratio).toFixed(2));
  config.maxPhanh = Math.max(0.05, +(BASE_THRESHOLDS.maxPhanh * ratio).toFixed(2));
  config.maxCua = Math.max(0.05, +(BASE_THRESHOLDS.maxCua * ratio).toFixed(2));
  config.potholeThreshold = Math.max(0.08, +(BASE_THRESHOLDS.potholeThreshold * ratio).toFixed(2));
  config.maxJerk = Math.max(0.08, +(BASE_THRESHOLDS.maxJerk * ratio).toFixed(2));

  const mapSliders = [
    ['rngMaxGa', 'lblMaxGa', config.maxGa, 'G'],
    ['rngMaxPhanh', 'lblMaxPhanh', config.maxPhanh, 'G'],
    ['rngMaxCua', 'lblMaxCua', config.maxCua, 'G'],
    ['rngPotholeThreshold', 'lblPotholeThreshold', config.potholeThreshold, 'G'],
    ['rngMaxJerk', 'lblMaxJerk', config.maxJerk, 'G/s']
  ];
  mapSliders.forEach(([sId, lId, val, unit]) => {
    const s = document.getElementById(sId);
    const l = document.getElementById(lId);
    if (s) s.value = val;
    if (l) l.textContent = `${val.toFixed(2)} ${unit}`;
  });

  updateScaleUIHighlights(pct);
  saveConfig();
  if (playSample) emitSingleBeep(1750, 60);
}

function syncBeepLevels() {
  const start = Number(config.startBeep) || 70;
  config.beepLvl1 = start;
  config.beepLvl2 = Math.round((start + 100) / 2);
  config.beepLvl3 = 100;
}

function updateVisualThresholdMarkers() {
  syncBeepLevels();
  const r1 = Math.min(100, Math.round((config.beepLvl1 / config.beepLvl3) * 100));
  const r2 = Math.min(100, Math.round((config.beepLvl2 / config.beepLvl3) * 100));

  document.getElementById('cupRingLvl1').style.width = `${r1}%`;
  document.getElementById('cupRingLvl1').style.height = `${r1}%`;
  document.getElementById('cupRingLvl2').style.width = `${r2}%`;
  document.getElementById('cupRingLvl2').style.height = `${r2}%`;

  ['Ga', 'Phanh', 'Cua', 'Xoc'].forEach((k) => {
    const m1 = document.getElementById(`mark${k}1`);
    const m2 = document.getElementById(`mark${k}2`);
    if (m1) m1.style.left = `${Math.min(98, config.beepLvl1)}%`;
    if (m2) m2.style.left = `${Math.min(98, config.beepLvl2)}%`;
  });
}

/**************************************************************
 * 4. BỘ PHÁT ÂM THANH DUAL-TONE & ÂM THANH Ổ GÀ RIÊNG BIỆT
 **************************************************************/
let audioCtx = null;
let lastBeepTime = 0;
let lastPotholeTime = 0;
let weaveToneToggle = false;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function emitSingleBeep(freq, durationMs, customWave = null, customVol = null) {
  initAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const wave = customWave || config.waveType || 'square';
  const volume = customVol !== null ? customVol : (Number(config.volumeBoost) || 3.0);

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = wave;
  osc2.type = wave;

  osc1.frequency.setValueAtTime(freq, now);
  osc2.frequency.setValueAtTime(Math.round(freq * 1.18), now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + durationMs / 1000 + 0.02);
  osc2.stop(now + durationMs / 1000 + 0.02);
}

// Âm thanh riêng biệt khi qua ổ gà / đường xóc
function emitPotholeBeep() {
  initAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const wave = config.potholeWave || 'sawtooth';
  const volume = Number(config.volumeBoost) || 3.0;

  [0, 140].forEach((delay) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(wave === 'sawtooth' ? 950 : 1400, now + delay / 1000);
    osc.frequency.exponentialRampToValueAtTime(wave === 'sawtooth' ? 450 : 900, now + (delay + 100) / 1000);

    gain.gain.setValueAtTime(0.001, now + delay / 1000);
    gain.gain.linearRampToValueAtTime(volume, now + (delay + 5) / 1000);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (delay + 110) / 1000);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + delay / 1000);
    osc.stop(now + (delay + 120) / 1000);
  });
}

function handleLinearBeep(maxPct) {
  const startLimit = config.startBeep || 70;
  if (maxPct < startLimit) {
    lastBeepTime = 0;
    return;
  }

  const now = performance.now();
  const ratio = Math.min(1, (maxPct - startLimit) / Math.max(1, 100 - startLimit));
  const intervalMs = Math.round(650 - ratio * (650 - 115));
  const freq = Math.round(1600 + ratio * 1000);

  if (now - lastBeepTime >= intervalMs) {
    lastBeepTime = now;
    emitSingleBeep(freq, 65);
    if (maxPct < 100) {
      setTimeout(() => emitSingleBeep(freq, 65), 110);
    }
  }
}

function handleWeavingBeep() {
  const now = performance.now();
  const intervalMs = 135;
  if (now - lastBeepTime >= intervalMs) {
    lastBeepTime = now;
    weaveToneToggle = !weaveToneToggle;
    const freq = weaveToneToggle ? 2800 : 1750;
    emitSingleBeep(freq, 85);
  }
}

/**************************************************************
 * 5. THUẬT TOÁN CẢM BIẾN 3D & ĐO LỰC XÓC THẲNG ĐỨNG CHUẨN MỌI GÓC ĐẶT MÁY
 **************************************************************/
let isRunning = false;
let needsCalibration = false;
let hasSensorData = false;
let smoothnessScore = 100;
let violationCount = 0;
let isCurrentlyViolating = false;
let lastViolationTime = 0;
let wakeLock = null;

let manualOffset = { x: 0, y: 0, z: 1 };
let rawSensor = { x: 0, y: 0, z: 1 };

let slopeBaselineLon = 0;
let vertBaseline = 0; // Đường cơ sở lọc trọng lực cho trục thẳng đứng (ổ gà)
let smoothG = { x: 0, lon: 0, vert: 0 };
let prevLateralG = 0;
let prevTimestamp = performance.now();

let reversalTimestamps = [];
let lastSignX = 0;

const peakHoldData = {
  Ga: { val: 0, time: 0 },
  Phanh: { val: 0, time: 0 },
  Cua: { val: 0, time: 0 },
  Xoc: { val: 0, time: 0 }
};

const alertHoldData = {
  active: false,
  lastTriggerTime: 0,
  maxLevel: 0,
  peakGa: 0,
  peakPhanh: 0,
  peakCua: 0,
  peakXoc: 0,
  weaving: false
};

function calibrateZeroG(resetScoreAndCount = false) {
  if (hasSensorData) {
    manualOffset.x = rawSensor.x;
    manualOffset.y = rawSensor.y;
    manualOffset.z = rawSensor.z;
    needsCalibration = false;
  } else {
    needsCalibration = true;
  }
  slopeBaselineLon = 0;
  vertBaseline = 0;
  smoothG.x = 0;
  smoothG.lon = 0;
  smoothG.vert = 0;
  reversalTimestamps = [];
  ['Ga', 'Phanh', 'Cua', 'Xoc'].forEach((k) => {
    peakHoldData[k].val = 0;
    peakHoldData[k].time = 0;
  });
  alertHoldData.active = false;
  isCurrentlyViolating = false;

  if (resetScoreAndCount) {
    smoothnessScore = 100;
    violationCount = 0;
    document.getElementById('scoreValue').textContent = '100';
    document.getElementById('scoreValue').style.color = 'var(--green)';
    document.getElementById('violationCount').textContent = '0';
  }
}

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try { wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && isRunning) {
    requestWakeLock();
  }
});

function handleMotion(event) {
  if (!isRunning) return;

  const now = performance.now();
  const dt = Math.max((now - prevTimestamp) / 1000, 0.016);
  prevTimestamp = now;

  const ag = event.accelerationIncludingGravity;
  const lin = event.acceleration;
  if (!ag) return;

  const gxRaw = (ag.x || 0) / 9.80665;
  const gyRaw = (ag.y || 0) / 9.80665;
  const gzRaw = (ag.z || 0) / 9.80665;

  rawSensor.x = gxRaw;
  rawSensor.y = gyRaw;
  rawSensor.z = gzRaw;
  hasSensorData = true;

  if (needsCalibration) {
    calibrateZeroG(false);
  }

  // 1. ĐỘ LỆCH SO VỚI TÂM 0G KHI BẤM CÂN CHỈNH (ĐÚNG VỚI MỌI GÓC ĐẶT ĐIỆN THOẠI)
  const dx = gxRaw - manualOffset.x;
  const dy = gyRaw - manualOffset.y;
  const dz = gzRaw - manualOffset.z;

  const normYZ = Math.hypot(manualOffset.y, manualOffset.z);
  let lonCal = dy;
  if (normYZ > 0.25) {
    lonCal = (dy * manualOffset.z - dz * manualOffset.y) / normYZ;
  }

  // 2. TÍNH LỰC XÓC THẲNG ĐỨNG (Chiếu dọc theo phương trọng lực thực tế của máy)
  const norm3D = Math.hypot(manualOffset.x, manualOffset.y, manualOffset.z) || 1;
  let vertCal = (dx * manualOffset.x + dy * manualOffset.y + dz * manualOffset.z) / norm3D;

  // Bộ lọc thông cao (High-pass filter) để loại bỏ độ nghiêng tĩnh, chỉ bắt xung xóc ổ gà/mố cầu
  const vertAlpha = Math.min(dt / 0.6, 0.15);
  vertBaseline += (vertCal - vertBaseline) * vertAlpha;
  let dynamicVert = Math.abs(vertCal - vertBaseline);

  // 3. TỰ ĐỘNG PHÁT HIỆN ĐỘ DỐC ĐƯỜNG ĐÈO & CHỈ BÙ DỐC TRỤC DỌC
  const slopeAlpha = Math.min(dt / 4.0, 0.05);
  slopeBaselineLon += (lonCal - slopeBaselineLon) * slopeAlpha;

  const slopeDeg = Math.round(Math.abs(Math.asin(Math.max(-1, Math.min(1, slopeBaselineLon))) * (180 / Math.PI)));
  const isMountainPass = slopeDeg >= 3;
  updateSlopeBadge(slopeDeg, isMountainPass);

  let dynamicX = dx;
  let dynamicLon = lonCal - slopeBaselineLon;

  if (lin && lin.x !== null && lin.y !== null) {
    const linX = lin.x / 9.80665;
    const linY = lin.y / 9.80665;
    const linZ = (lin.z || 0) / 9.80665;
    const linLon = normYZ > 0.25 ? (linY * manualOffset.z - linZ * manualOffset.y) / normYZ : linY;
    const linVert = Math.abs((linX * manualOffset.x + linY * manualOffset.y + linZ * manualOffset.z) / norm3D);

    dynamicX = dynamicX * 0.5 + linX * 0.5;
    dynamicLon = dynamicLon * 0.5 + linLon * 0.5;
    dynamicVert = dynamicVert * 0.5 + linVert * 0.5;
  }

  // Khử nhiễu cảm biến siêu nhỏ khi máy đang đứng im trên bàn/giá đỡ (< 0.015G -> 0)
  if (dynamicVert < 0.015) dynamicVert = 0;

  const smoothAlpha = 0.22;
  smoothG.x += (dynamicX - smoothG.x) * smoothAlpha;
  smoothG.lon += (dynamicLon - smoothG.lon) * smoothAlpha;
  // Lực xóc ổ gà dùng hệ số phản hồi nhanh hơn (0.45) để bắt kịp cú dằn xóc ngắn
  smoothG.vert += (dynamicVert - smoothG.vert) * 0.45;

  const lateralJerk = Math.abs(smoothG.x - prevLateralG) / dt;
  prevLateralG = smoothG.x;

  if (Math.abs(smoothG.x) > config.maxCua * 0.45) {
    const currentSign = Math.sign(smoothG.x);
    if (lastSignX !== 0 && currentSign !== lastSignX) {
      reversalTimestamps.push(now);
    }
    lastSignX = currentSign;
  }
  reversalTimestamps = reversalTimestamps.filter((t) => now - t < 3200);

  const isWeaving =
    reversalTimestamps.length >= 2 ||
    (lateralJerk > config.maxJerk && Math.abs(smoothG.x) > config.maxCua * 0.65);

  evaluateAndRender(smoothG.x, smoothG.lon, smoothG.vert, isWeaving, dt, now);
}

function updateSlopeBadge(deg, isMountain) {
  const badge = document.getElementById('slopeBadge');
  const text = document.getElementById('slopeText');
  if (isMountain) {
    badge.classList.add('mountain-active');
    text.textContent = `Đang đi đèo (Bù dốc ${deg}°)`;
  } else {
    badge.classList.remove('mountain-active');
    text.textContent = `Đường bằng (${deg}°)`;
  }
}

function getLevelColor(pct) {
  if (pct >= config.beepLvl3) return 'var(--red)';
  if (pct >= config.beepLvl2) return 'var(--orange)';
  if (pct >= config.beepLvl1) return 'var(--yellow)';
  return 'var(--green)';
}

function updateMetricDisplay(key, livePct, now) {
  const holdMs = (Number(config.peakHoldTime) || 0) * 1000;
  const pk = peakHoldData[key];

  if (livePct >= pk.val) {
    pk.val = livePct;
    if (livePct > 0) pk.time = now;
  } else if (holdMs <= 0 || now - pk.time > holdMs) {
    pk.val = livePct;
  }

  const displayPct = pk.val;
  const liveClamped = Math.min(100, livePct);
  const peakClamped = Math.min(100, displayPct);
  const liveColor = getLevelColor(livePct);
  const peakColor = getLevelColor(displayPct);

  const bar = document.getElementById(`bar${key}`);
  const val = document.getElementById(`val${key}`);
  const peakLine = document.getElementById(`peak${key}`);

  if (bar && val && peakLine) {
    bar.style.width = `${liveClamped}%`;
    bar.style.backgroundColor = liveColor;
    val.textContent = `${displayPct}%`;
    val.style.color = displayPct >= config.beepLvl1 ? peakColor : 'var(--text)';

    if (holdMs > 0 && displayPct >= 15) {
      peakLine.style.opacity = '1';
      peakLine.style.left = `calc(${peakClamped}% - 2px)`;
      peakLine.style.backgroundColor = peakColor;
    } else {
      peakLine.style.opacity = '0';
    }
  }

  const ring = document.getElementById(`donut${key}`);
  const dVal = document.getElementById(`donutVal${key}`);
  if (ring && dVal) {
    const circumference = 188.5;
    const offset = circumference - (peakClamped / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = peakColor;
    dVal.textContent = `${displayPct}%`;
    dVal.style.color = displayPct >= config.beepLvl1 ? peakColor : 'var(--text)';
  }
}

function evaluateAndRender(gx, glon, gvert, isWeaving, dt, now) {
  const accelG = Math.max(0, glon);
  const brakeG = Math.max(0, -glon);
  const cornerG = Math.abs(gx);
  const totalG = Math.hypot(gx, glon);

  const potholeLimit = Number(config.potholeThreshold) || 0.30;

  const pctGa = Math.min(150, Math.round((accelG / config.maxGa) * 100));
  const pctPhanh = Math.min(150, Math.round((brakeG / config.maxPhanh) * 100));
  const pctCua = Math.min(150, Math.round((cornerG / config.maxCua) * 100));
  const pctXoc = Math.min(150, Math.round((gvert / potholeLimit) * 100));

  const maxDrivingPct = Math.max(pctGa, pctPhanh, pctCua);
  const maxAllPct = Math.max(maxDrivingPct, pctXoc);

  updateMetricDisplay('Ga', pctGa, now);
  updateMetricDisplay('Phanh', pctPhanh, now);
  updateMetricDisplay('Cua', pctCua, now);
  updateMetricDisplay('Xoc', pctXoc, now);

  const startLimit = Number(config.startBeep) || 70;
  const isPotholeTriggered = pctXoc >= startLimit;

  // Phát âm thanh riêng khi thanh Ổ gà & Đường xóc vượt mức cảnh báo
  if (isPotholeTriggered && now - lastPotholeTime > 750) {
    lastPotholeTime = now;
    emitPotholeBeep();
  }

  const cupEl = document.getElementById('cupCircle');
  const maxRadiusPx = Math.max(45, cupEl.clientWidth / 2 - 14);
  const maxRef = Math.max(config.maxGa, config.maxPhanh, config.maxCua);
  const normX = Math.max(-1, Math.min(1, gx / maxRef));
  const normY = Math.max(-1, Math.min(1, glon / maxRef));

  const ball = document.getElementById('gBall');
  const ballColor = isWeaving || pctXoc >= 100 ? 'var(--red)' : getLevelColor(maxAllPct);
  ball.style.transform = `translate(${normX * maxRadiusPx}px, ${-normY * maxRadiusPx}px)`;
  ball.style.background = ballColor;
  ball.style.boxShadow = `0 0 12px ${ballColor}`;
  document.getElementById('cupReadout').textContent = `${totalG.toFixed(2)} G`;

  const banner = document.getElementById('alertBanner');
  const title = document.getElementById('alertTitle');
  const sub = document.getElementById('alertSub');

  const isTriggered = isWeaving || maxAllPct >= startLimit;
  const isSevere = isWeaving || maxAllPct >= 100;

  if (isSevere) {
    if (!isCurrentlyViolating && now - lastViolationTime > 1200) {
      violationCount++;
      lastViolationTime = now;
      document.getElementById('violationCount').textContent = violationCount;
    }
    isCurrentlyViolating = true;
  } else if (maxAllPct < 88 && !isWeaving) {
    isCurrentlyViolating = false;
  }

  if (isWeaving) {
    smoothnessScore = Math.max(0, smoothnessScore - dt * 12);
    handleWeavingBeep();
  } else if (maxDrivingPct >= 100) {
    smoothnessScore = Math.max(0, smoothnessScore - dt * 9);
    handleLinearBeep(maxDrivingPct);
  } else if (maxDrivingPct >= startLimit) {
    smoothnessScore = Math.max(0, smoothnessScore - dt * 3);
    handleLinearBeep(maxDrivingPct);
  } else if (isPotholeTriggered) {
    smoothnessScore = Math.max(0, smoothnessScore - dt * (pctXoc >= 100 ? 6 : 2));
    handleLinearBeep(0);
  } else {
    handleLinearBeep(0);
    const recRate = Number(config.scoreRecovery) || 3;
    smoothnessScore = Math.min(100, smoothnessScore + dt * recRate);
  }

  const alertHoldMs = (Number(config.alertHoldTime) || 3.0) * 1000;

  if (isTriggered) {
    if (!alertHoldData.active || now - alertHoldData.lastTriggerTime > alertHoldMs) {
      alertHoldData.peakGa = 0;
      alertHoldData.peakPhanh = 0;
      alertHoldData.peakCua = 0;
      alertHoldData.peakXoc = 0;
      alertHoldData.maxLevel = 0;
      alertHoldData.weaving = false;
    }

    alertHoldData.active = true;
    alertHoldData.lastTriggerTime = now;

    if (isWeaving) alertHoldData.weaving = true;
    if (pctGa >= startLimit) alertHoldData.peakGa = Math.max(alertHoldData.peakGa, pctGa);
    if (pctPhanh >= startLimit) alertHoldData.peakPhanh = Math.max(alertHoldData.peakPhanh, pctPhanh);
    if (pctCua >= startLimit) alertHoldData.peakCua = Math.max(alertHoldData.peakCua, pctCua);
    if (pctXoc >= startLimit) alertHoldData.peakXoc = Math.max(alertHoldData.peakXoc, pctXoc);
    alertHoldData.maxLevel = Math.max(alertHoldData.maxLevel, maxAllPct);
  }

  if (alertHoldData.active && now - alertHoldData.lastTriggerTime <= alertHoldMs) {
    const parts = [];
    if (alertHoldData.weaving) parts.push('Lạng lách!');
    if (alertHoldData.peakGa >= startLimit) parts.push(`Ga: ${alertHoldData.peakGa}%`);
    if (alertHoldData.peakPhanh >= startLimit) parts.push(`Phanh: ${alertHoldData.peakPhanh}%`);
    if (alertHoldData.peakCua >= startLimit) parts.push(`Cua: ${alertHoldData.peakCua}%`);
    if (alertHoldData.peakXoc >= startLimit) parts.push(`Xóc: ${alertHoldData.peakXoc}%`);

    banner.className = 'alert-banner';
    if (alertHoldData.maxLevel >= 100 || alertHoldData.weaving) {
      banner.classList.add('warn-100');
      sub.textContent = isTriggered ? 'Vượt ngưỡng! Giảm cường độ ngay' : 'Đang giữ thông số đỉnh vừa vượt';
    } else {
      banner.classList.add('warn-80');
      sub.textContent = isTriggered ? 'Nới nhẹ thao tác để giữ êm ái' : 'Đang giữ thông số cảnh báo';
    }
    title.textContent = parts.join(' • ') || `Cảnh báo: ${alertHoldData.maxLevel}%`;
  } else {
    alertHoldData.active = false;
    banner.className = 'alert-banner';
    title.textContent = 'LÁI XE ÊM ÁI';
    sub.textContent = 'Người ngồi sau rất thoải mái';
  }

  const scoreEl = document.getElementById('scoreValue');
  const roundedScore = Math.round(smoothnessScore);
  scoreEl.textContent = roundedScore;
  scoreEl.style.color =
    roundedScore >= 85 ? 'var(--green)' : roundedScore >= 65 ? 'var(--yellow)' : 'var(--red)';
}

/**************************************************************
 * 6. SỰ KIỆN NÚT BẤM MÀN HÌNH CHÍNH & CÀI ĐẶT
 **************************************************************/
const btnStart = document.getElementById('btnStart');
const btnQuickCalib = document.getElementById('btnQuickCalib');
const btnMainScale = document.getElementById('btnMainScale');
const btnMainWave = document.getElementById('btnMainWave');

btnStart.addEventListener('click', async () => {
  initAudioContext();

  if (!isRunning) {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        const state = await DeviceMotionEvent.requestPermission();
        if (state !== 'granted') {
          alert('Bạn cần cấp quyền Cảm biến chuyển động để đo lực G!');
          return;
        }
      } catch (e) {}
    }

    isRunning = true;
    prevTimestamp = performance.now();
    calibrateZeroG(true);
    window.addEventListener('devicemotion', handleMotion);
    requestWakeLock();

    btnStart.classList.add('running');
    btnStart.innerHTML = '<span>⏹ DỪNG LẠI</span>';
    document.getElementById('alertTitle').textContent = 'ĐANG THEO DÕI';
    document.getElementById('alertSub').textContent = 'Đã cân chỉnh 0G - Sẵn sàng lăn bánh';
    emitSingleBeep(1750, 60);
  } else {
    isRunning = false;
    window.removeEventListener('devicemotion', handleMotion);
    handleLinearBeep(0);
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }

    btnStart.classList.remove('running');
    btnStart.innerHTML = '<span>🎯 CÂN CHỈNH & BẮT ĐẦU</span>';
    document.getElementById('alertBanner').className = 'alert-banner';
    document.getElementById('alertTitle').textContent = 'ĐÃ TẠM DỪNG';
    document.getElementById('alertSub').textContent = 'Bấm nút dưới để cân chỉnh & chạy lại';
  }
});

btnQuickCalib.addEventListener('click', () => {
  calibrateZeroG(false);
  initAudioContext();
  emitSingleBeep(1950, 55);
  document.getElementById('alertTitle').textContent = 'ĐÃ ĐẶT LẠI TÂM 0G';
  document.getElementById('alertSub').textContent = 'Đã nhận góc nghiêng hiện tại làm gốc';
});

btnMainScale.addEventListener('click', () => {
  initAudioContext();
  const current = Number(config.masterScale) || 100;
  const idx = QUICK_SCALE_PRESETS.indexOf(current);
  const nextIdx = (idx + 1) % QUICK_SCALE_PRESETS.length;
  applyMasterScale(QUICK_SCALE_PRESETS[nextIdx], true);
});

btnMainWave.addEventListener('click', () => {
  initAudioContext();
  const idx = WAVE_TYPES.indexOf(config.waveType);
  const nextIdx = (idx + 1) % WAVE_TYPES.length;
  applyWaveType(WAVE_TYPES[nextIdx], true);
});

const modal = document.getElementById('settingsModal');
document.getElementById('btnSettings').addEventListener('click', () => {
  initAudioContext();
  modal.classList.add('open');
});
document.getElementById('btnCloseModal').addEventListener('click', () => {
  modal.classList.remove('open');
});

document.getElementById('btnThemeLight').addEventListener('click', () => applyTheme('light'));
document.getElementById('btnThemeDark').addEventListener('click', () => applyTheme('dark'));
document.getElementById('btnChartBar').addEventListener('click', () => applyChartType('bar'));
document.getElementById('btnChartDonut').addEventListener('click', () => applyChartType('donut'));

document.getElementById('btnWaveSquare').addEventListener('click', () => applyWaveType('square', true));
document.getElementById('btnWaveTriangle').addEventListener('click', () => applyWaveType('triangle', true));
document.getElementById('btnWaveSine').addEventListener('click', () => applyWaveType('sine', true));

document.getElementById('btnPotholeSaw').addEventListener('click', () => applyPotholeWave('sawtooth', true));
document.getElementById('btnPotholeSquare').addEventListener('click', () => applyPotholeWave('square', true));
document.getElementById('btnPotholeSine').addEventListener('click', () => applyPotholeWave('sine', true));

document.getElementById('rngMasterScale').addEventListener('input', (e) => {
  applyMasterScale(parseFloat(e.target.value), false);
});

document.getElementById('btnTestBeepLow').addEventListener('click', () => {
  initAudioContext();
  emitSingleBeep(1650, 70);
  setTimeout(() => emitSingleBeep(1650, 70), 140);
});

document.getElementById('btnTestBeepHigh').addEventListener('click', () => {
  initAudioContext();
  for (let i = 0; i < 4; i++) {
    setTimeout(() => emitSingleBeep(2550, 70), i * 125);
  }
});

document.getElementById('btnTestPothole').addEventListener('click', () => {
  initAudioContext();
  emitPotholeBeep();
});

function bindSlider(sliderId, labelId, cfgKey, unit, decimals = 2) {
  const slider = document.getElementById(sliderId);
  const label = document.getElementById(labelId);
  if (!slider || !label) return;

  slider.value = config[cfgKey];
  label.textContent = `${Number(config[cfgKey]).toFixed(decimals)} ${unit}`;

  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    config[cfgKey] = val;
    label.textContent = `${val.toFixed(decimals)} ${unit}`;
    updateVisualThresholdMarkers();
    saveConfig();
  });
}

bindSlider('rngPotholeThreshold', 'lblPotholeThreshold', 'potholeThreshold', 'G', 2);
bindSlider('rngVolumeBoost', 'lblVolumeBoost', 'volumeBoost', 'x', 1);
bindSlider('rngStartBeep', 'lblStartBeep', 'startBeep', '%', 0);
bindSlider('rngScoreRecovery', 'lblScoreRecovery', 'scoreRecovery', 'đ/s', 0);
bindSlider('rngPeakHoldTime', 'lblPeakHoldTime', 'peakHoldTime', 'giây', 1);
bindSlider('rngAlertHoldTime', 'lblAlertHoldTime', 'alertHoldTime', 'giây', 1);
bindSlider('rngMaxGa', 'lblMaxGa', 'maxGa', 'G', 2);
bindSlider('rngMaxPhanh', 'lblMaxPhanh', 'maxPhanh', 'G', 2);
bindSlider('rngMaxCua', 'lblMaxCua', 'maxCua', 'G', 2);
bindSlider('rngMaxJerk', 'lblMaxJerk', 'maxJerk', 'G/s', 2);

// Khởi chạy trạng thái ban đầu
renderScalePresetButtons();
applyTheme(config.theme);
applyChartType(config.chartType);
applyWaveType(config.waveType, false);
applyPotholeWave(config.potholeWave, false);
applyMasterScale(config.masterScale, false);
updateVisualThresholdMarkers();

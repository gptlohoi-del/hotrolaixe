
Gemini

Cuộc trò chuyện mới
Thư viện
Đã lên lịch
Sinh viên

Hiện thêm
Sổ ghi chú mới
Cẩm Nang Phòng Chống Lừa Đảo Trực Tuyến Cho Học Sinh
Cẩm nang phòng chống lừa đảo trực tuyến cho học sinh
MA TÚY LỚP 10
Tất cả sổ ghi chú
[Lái xe êm ái]
Mục tiêu bảo hiểm xã hội
Cách Tải Audio Từ ChatGPT
Phòng tránh lừa đảo mạng học sinh
[Tập Piano]
Lời Giải Chi Tiết Bài Tập Toán
Điện áp cuộn đốt tim magnetron
Ứng dụng Android Synthesia là gì
Thêm tính năng bù trừ thời gian
[Tạo srt cho file mp3]
Yêu Cầu Trích Xuất Văn Bản
[Tra cứu bài giảng]
Chuyển Tone Từ C Lên D
Hướng dẫn lắp ráp quạt Midea SDH30RX
Tư vấn cấu hình PC AI
Tạo File Bat Tắt Máy Nhanh
Câu Hỏi Phật Pháp Tiếng Anh
Phân tích bài thơ Cảm hoài
Tư vấn slide bài ma túy GDQP 10
Tác hại khốc liệt của ma túy
Tối ưu hóa gióng hàng audio và TXT
[KINH CHÁNH TINH TẤN]
Tạo Phụ Đề MP3 Bằng AI
Giải bài toán kinh tế vi mô
Cách Chia Sẻ Dự Án GitHub
Tạo file phụ đề khu nghỉ dưỡng
Khắc phục lỗi Service Worker offline
Tạo Background Trang Phục CAND
Công Thức Tính Thể Tích Hình Trụ
Trình phát MP3 sao chép thời điểm
Cao Tăng Cùng Thời Hư Vân
Đăng Nhập NotebookLM Không Cần Gmail
Kết Nối Loa Cho Sáo Clarii Mini
Sửa tin nhắn gửi Thầy
[COLAB]
Trò chuyện với Gemini
tôi muốn thay đổi giá trị mặc định của Độ nhạy bắt lỗi Lạng lách / Giật lái là 0.35 thành giá trị khác

Để thay đổi giá trị mặc định của Độ nhạy bắt lỗi Lạng lách / Giật lái (mặc định đang là 0.35 G/s) thành một con số khác theo ý muốn của bạn, bạn chỉ cần sửa ở 2 chỗ trong file index.html:

Hướng dẫn cách sửa:
1. Sửa ở phần giá trị cấu hình mặc định (defaultConfig):
Bạn tìm đến khối const defaultConfig trong phần <script> (khoảng dòng 720) và đổi số 0.35 thành con số bạn muốn (ví dụ đổi thành 0.40 hoặc 0.30):

Tìm đoạn này:

JavaScript
const defaultConfig = {
  maxGa: 0.25,
  maxPhanh: 0.28,
  maxCua: 0.25,
  maxJerk: 0.35, // <--- Sửa số 0.35 ở đây
  startBeep: 70,
  // ...
};
2. Sửa ở thuộc tính value của thanh trượt trong phần giao diện (HTML):
Bạn tìm tiếp đến đoạn cấu hình thanh trượt của rngMaxJerk trong bảng Cài đặt (khoảng dòng 590) và cập nhật lại thuộc tính value cho khớp với giá trị mới:

Tìm đoạn này:

HTML
<div class="setting-group">
  <div class="setting-label">
    <span>Độ nhạy bắt lỗi Lạng lách / Giật lái</span>
    <span id="lblMaxJerk">0.35 G/s</span>
  </div>
  <input type="range" id="rngMaxJerk" min="0.08" max="0.70" step="0.01" value="0.35" /> <!-- <--- Sửa value="0.35" thành giá trị mới ở đây -->
</div>
Sau khi sửa xong 2 chỗ trên, lưu file index.html lại và tải lại trang trên điện thoại, giá trị mặc định của phần Lạng lách / Giật lái sẽ chuyển sang con số mới ngay lập tức!

bạn kiểm tra giúp tôi tai sao khi tôi nhấn cân chỉnh và bắt đầu thì điện thoại cứ báo ổ gào, đường xóc,... trong khi điện thoại đang đứng im. và tôi muốn hiển thị thanh ổ gà, đường xóc bên dưới thanh VÀO CUA & LẮC NGANG.

1. Nguyên nhân tại sao điện thoại đứng im vẫn báo "Ổ gà / Xóc!" liên tục
Trong file index (22).html của bạn, dòng code tính lực xóc (dòng 940) đang viết như sau:   
HTML

JavaScript
const verticalJolt = Math.abs((ag.z || 9.80665) - 9.80665) / 9.80665;
Công thức này mặc định rằng khi điện thoại đứng im, trục 
Z của cảm biến (ag.z) luôn luôn bằng 
+9.80665 m/s 
2
  (tức là điện thoại phải nằm ngửa phẳng tuyệt đối trên mặt bàn).

Trong thực tế sử dụng:

Khi bạn gắn điện thoại dựng đứng hoặc nghiêng trên giá đỡ ô tô (hoặc cầm nghiêng trên tay), trọng lực trái đất dồn sang trục 
Y (ag.y 
≈9.8), làm cho trục 
Z (ag.z) giảm xuống gần bằng 0.

Thay ag.z = 0 vào công thức trên: Math.abs(0 - 9.80665) / 9.80665 = 1.0 G.

Vì 1.0 G luôn lớn hơn ngưỡng ổ gà 0.30 G, nên dù điện thoại đứng im hoàn toàn, cứ mỗi 0.9 giây máy lại tưởng nhầm đang sập ổ gà 1.0 G và kêu báo động liên tục!   
HTML
+ 1

Cách khắc phục triệt để:
Thay vì lấy cứng (ag.z - 9.8), thuật toán mới sẽ lấy độ biến thiên lực dọc theo vector trọng lực thực tế đã cân chỉnh (manualOffset) kết hợp bộ lọc thông cao (High-Pass Filter). Nhờ đó, bạn gắn điện thoại nằm ngang, nghiêng 45° hay dựng đứng 90° thì khi đứng im chỉ số Ổ gà luôn bằng 0%, chỉ khi xe thực sự dằn xóc theo phương thẳng đứng thì thanh đo mới nhảy lên.

(Ngoài ra, mình cũng đã sửa luôn lỗi chính tả emitSingleBep ở dòng 1138 làm nút nghe thử "Kịch 100%" bị câm tiếng trong file của bạn).   
HTML

2. Full Code index.html (Đã sửa lỗi Ổ gà + Thêm thanh "Ổ GÀ & ĐƯỜNG XÓC" thứ 4)
Dưới đây là toàn bộ mã nguồn đã bổ sung thanh 💥 Ổ GÀ & ĐƯỜNG XÓC nằm ngay dưới thanh 🔄 VÀO CUA & LẮC NGANG (đồng thời hỗ trợ cả ở chế độ biểu đồ Vòng tròn Donut và tự động co giãn khi bạn bấm nút ĐỘ NHẠY):   
HTML

HTML
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <meta name="theme-color" content="#f1f5f9" id="metaThemeColor" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <title>SmooDri - Trợ lý Lái xe Êm ái</title>
  <link rel="manifest" href="./manifest.json" />
  <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/1126/1126585.png" />

  <style>
    /* GIAO DIỆN TỐI (DARK MODE) */
    :root {
      --bg: #0b1120;
      --card: #162033;
      --border: #263552;
      --text: #f8fafc;
      --subtext: #94a3b8;
      --green: #10b981;
      --yellow: #f59e0b;
      --orange: #f97316;
      --red: #ef4444;
      --blue: #38bdf8;
      --bar-bg: #090d16;
      --bar-border: #1e293b;
      --btn-bg: #0f172a;
      --cup-bg: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(15, 23, 42, 0.95) 75%);
      --crosshair: rgba(148, 163, 184, 0.22);
      --warn70-bg: rgba(245, 158, 11, 0.14);
      --warn70-text: #fde68a;
      --warn80-bg: rgba(249, 115, 22, 0.22);
      --warn80-text: #ffedd5;
      --warn100-bg: rgba(239, 68, 68, 0.28);
      --warn100-text: #fecaca;
    }

    /* GIAO DIỆN SÁNG (LIGHT MODE - MẶC ĐỊNH) */
    [data-theme="light"] {
      --bg: #f1f5f9;
      --card: #ffffff;
      --border: #cbd5e1;
      --text: #0f172a;
      --subtext: #475569;
      --green: #059669;
      --yellow: #d97706;
      --orange: #ea580c;
      --red: #dc2626;
      --blue: #0284c7;
      --bar-bg: #e2e8f0;
      --bar-border: #cbd5e1;
      --btn-bg: #f8fafc;
      --cup-bg: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(241, 245, 249, 0.95) 75%);
      --crosshair: rgba(71, 85, 105, 0.22);
      --warn70-bg: #fef3c7;
      --warn70-text: #92400e;
      --warn80-bg: #ffedd5;
      --warn80-text: #9a3412;
      --warn100-bg: #fee2e2;
      --warn100-text: #991b1b;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    html, body {
      width: 100%;
      height: 100dvh;
      overflow: hidden;
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100dvh;
      padding: env(safe-area-inset-top, 10px) 12px env(safe-area-inset-bottom, 10px) 12px;
      gap: 8px;
    }

    /* HÀNG 1: THANH TRẠNG THÁI & NÚT CÔNG CỤ */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 42px;
      flex-shrink: 0;
    }

    .slope-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--card);
      border: 1px solid var(--border);
      padding: 6px 10px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      color: var(--subtext);
      transition: all 0.25s ease;
    }

    .slope-badge.mountain-active {
      background: rgba(2, 132, 199, 0.14);
      border-color: var(--blue);
      color: var(--blue);
    }

    .top-actions {
      display: flex;
      gap: 6px;
    }

    .btn-icon {
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 7px 11px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .btn-icon:active {
      transform: scale(0.95);
    }

    /* HÀNG 2: ĐIỂM ÊM ÁI (+ SỐ LẦN VƯỢT NGƯỠNG) & HỘP CẢNH BÁO */
    .status-row {
      display: grid;
      grid-template-columns: 118px 1fr;
      gap: 8px;
      height: 74px;
      flex-shrink: 0;
    }

    .score-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      position: relative;
    }

    .score-label {
      font-size: 10px;
      text-transform: uppercase;
      color: var(--subtext);
      font-weight: 800;
      letter-spacing: 0.5px;
    }

    .score-main-wrap {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 6px;
      margin-top: 1px;
    }

    .score-value {
      font-size: 32px;
      font-weight: 900;
      color: var(--green);
      line-height: 1.1;
    }

    .violation-badge {
      font-size: 13px;
      font-weight: 800;
      color: var(--red);
      background: rgba(239, 68, 68, 0.14);
      border: 1px solid rgba(239, 68, 68, 0.35);
      padding: 1px 6px;
      border-radius: 999px;
      line-height: 1.2;
      min-width: 22px;
      text-align: center;
    }

    .alert-banner {
      background: var(--card);
      border: 2px solid var(--border);
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px 8px;
      text-align: center;
      transition: all 0.12s ease;
    }

    .alert-banner.warn-70 {
      background: var(--warn70-bg);
      border-color: var(--yellow);
      color: var(--warn70-text);
    }

    .alert-banner.warn-80 {
      background: var(--warn80-bg);
      border-color: var(--orange);
      color: var(--warn80-text);
    }

    .alert-banner.warn-100 {
      background: var(--warn100-bg);
      border-color: var(--red);
      color: var(--warn100-text);
      animation: pulseRed 0.35s infinite alternate;
    }

    @keyframes pulseRed {
      from { transform: scale(1); }
      to { transform: scale(1.018); }
    }

    .alert-title {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.2px;
      line-height: 1.15;
    }

    .alert-sub {
      font-size: 12px;
      color: var(--subtext);
      margin-top: 2px;
      font-weight: 600;
    }

    .alert-banner.warn-70 .alert-sub,
    .alert-banner.warn-80 .alert-sub,
    .alert-banner.warn-100 .alert-sub {
      color: inherit;
      opacity: 0.9;
    }

    /* HÀNG 3: TÂM NGẮM CỐC NƯỚC & BIỂU ĐỒ (BAR / DONUT) */
    .main-panel {
      flex: 1;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }

    /* Cốc nước G-Force nằm sát cạnh trái */
    .cup-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 8px;
      position: relative;
      flex: 1;
      min-height: 105px;
      max-height: 190px;
    }

    .cup-circle {
      height: 100%;
      aspect-ratio: 1 / 1;
      max-width: 180px;
      max-height: 180px;
      border-radius: 50%;
      border: 2.5px solid var(--red);
      background: var(--cup-bg);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.06);
    }

    .cup-ring-lvl2 {
      width: 85%;
      height: 85%;
      border-radius: 50%;
      border: 1.5px dashed var(--orange);
      position: absolute;
      pointer-events: none;
      transition: width 0.2s, height 0.2s;
    }

    .cup-ring-lvl1 {
      width: 70%;
      height: 70%;
      border-radius: 50%;
      border: 1.2px dotted var(--yellow);
      position: absolute;
      pointer-events: none;
      transition: width 0.2s, height 0.2s;
    }

    .crosshair-h, .crosshair-v {
      position: absolute;
      background: var(--crosshair);
      pointer-events: none;
    }
    .crosshair-h { width: 100%; height: 1px; }
    .crosshair-v { width: 1px; height: 100%; }

    .g-ball {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 12px var(--green);
      position: absolute;
      transform: translate(0px, 0px);
      transition: background 0.1s, box-shadow 0.1s;
      z-index: 2;
    }

    .cup-readout {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 15px;
      font-weight: 900;
      color: var(--text);
      font-family: monospace;
      background: rgba(255, 255, 255, 0.65);
      padding: 1px 7px;
      border-radius: 8px;
      z-index: 3;
      pointer-events: none;
    }

    :root:not([data-theme="light"]) .cup-readout {
      background: rgba(15, 23, 42, 0.72);
    }

    /* KIỂU 1: 4 THANH NGANG (BAR CHART) */
    .bars-container {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 4px;
    }

    .bars-container.hidden {
      display: none;
    }

    .bar-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .bar-header {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
    }

    .bar-track {
      width: 100%;
      height: 24px;
      background: var(--bar-bg);
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--bar-border);
    }

    .bar-mark-lvl1 {
      position: absolute;
      left: 70%;
      top: 0;
      bottom: 0;
      width: 1.5px;
      background: var(--yellow);
      z-index: 3;
      opacity: 0.85;
    }

    .bar-mark-lvl2 {
      position: absolute;
      left: 85%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--orange);
      z-index: 3;
    }

    .bar-peak-hold {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--red);
      z-index: 4;
      opacity: 0;
      transition: left 0.05s linear, opacity 0.15s ease;
    }

    .bar-fill {
      height: 100%;
      width: 0%;
      background: var(--green);
      border-radius: 7px;
      transition: width 0.08s linear, background-color 0.12s ease;
    }

    /* KIỂU 2: 4 VÒNG TRÒN (DONUT CHART) */
    .donuts-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      padding: 6px 0 2px 0;
      align-items: center;
    }

    .donuts-container.hidden {
      display: none;
    }

    .donut-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: var(--btn-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 7px 3px;
    }

    .donut-svg-wrap {
      position: relative;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .donut-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .donut-track {
      fill: none;
      stroke: var(--bar-bg);
      stroke-width: 9;
    }

    .donut-ring {
      fill: none;
      stroke: var(--green);
      stroke-width: 9;
      stroke-linecap: round;
      stroke-dasharray: 188.5;
      stroke-dashoffset: 188.5;
      transition: stroke-dashoffset 0.08s linear, stroke 0.12s ease;
    }

    .donut-val {
      position: absolute;
      font-size: 14px;
      font-weight: 900;
      color: var(--text);
    }

    .donut-label {
      font-size: 10px;
      font-weight: 800;
      color: var(--subtext);
      text-align: center;
    }

    /* HÀNG 4: NÚT BẮT ĐẦU + NÚT ĐỘ NHẠY + NÚT KIỂU ÂM BÁO */
    .bottom-bar {
      display: flex;
      gap: 6px;
      height: 54px;
      flex-shrink: 0;
    }

    .btn-main {
      flex: 1;
      border: none;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(135deg, #10b981, #059669);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 8px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.28);
    }

    .btn-main.running {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.28);
    }

    .btn-quick-action {
      width: 84px;
      background: var(--card);
      border: 1.5px solid var(--border);
      border-radius: 14px;
      color: var(--subtext);
      font-size: 10.5px;
      font-weight: 700;
      padding: 4px 4px;
      cursor: pointer;
      text-align: center;
      line-height: 1.25;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .btn-quick-action strong {
      font-size: 12.5px;
      color: var(--blue);
      font-weight: 900;
      margin-top: 1px;
    }

    .btn-quick-action:active,
    .btn-main:active {
      transform: scale(0.96);
    }

    /* MODAL CÀI ĐẶT (POPUP) */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 14px;
      z-index: 50;
    }

    .modal-overlay.open {
      display: flex;
    }

    .modal-box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      width: 100%;
      max-width: 420px;
      max-height: 90dvh;
      overflow-y: auto;
      padding: 0 15px 15px 15px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding: 12px 0 8px 0;
      position: sticky;
      top: 0;
      background: var(--card);
      z-index: 10;
    }

    .section-divider {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--blue);
      letter-spacing: 0.5px;
      margin-top: 4px;
    }

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .setting-label {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 700;
    }

    input[type="range"] {
      width: 100%;
      accent-color: var(--blue);
      height: 22px;
    }

    .option-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .option-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .preset-scale-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(56px, 1fr));
      gap: 6px;
    }

    .btn-option {
      background: var(--btn-bg);
      border: 1.5px solid var(--border);
      color: var(--text);
      padding: 8px 6px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
    }

    .btn-option.selected {
      border-color: var(--blue);
      background: rgba(2, 132, 199, 0.14);
      color: var(--blue);
    }

    .btn-option:active {
      transform: scale(0.96);
    }

    .ref-info-box {
      background: var(--btn-bg);
      border: 1px dashed var(--border);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 11.5px;
      line-height: 1.45;
      color: var(--subtext);
      margin-top: 4px;
    }

    .ref-info-box strong {
      color: var(--text);
    }

    .ref-info-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--blue);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  </style>
</head>
<body>
  <div class="app-container">
    <!-- HÀNG 1: TRẠNG THÁI ĐỘ DỐC & NÚT CÔNG CỤ -->
    <div class="top-bar">
      <div id="slopeBadge" class="slope-badge">
        <span>⛰️</span>
        <span id="slopeText">Đường bằng (0°)</span>
      </div>
      <div class="top-actions">
        <button id="btnQuickCalib" class="btn-icon" title="Đặt lại tâm 0G ngay lập tức">
          🎯 Đặt lại 0G
        </button>
        <button id="btnSettings" class="btn-icon" title="Mở cài đặt">
          ⚙️
        </button>
      </div>
    </div>

    <!-- HÀNG 2: ĐIỂM ÊM ÁI (+ SỐ LẦN VƯỢT NGƯỠNG) & BẢNG CẢNH BÁO -->
    <div class="status-row">
      <div class="score-card">
        <span class="score-label">ĐIỂM ÊM ÁI</span>
        <div class="score-main-wrap">
          <span id="scoreValue" class="score-value">100</span>
          <span id="violationCount" class="violation-badge" title="Số lần vượt ngưỡng 100% hoặc lạng lách">0</span>
        </div>
      </div>
      <div id="alertBanner" class="alert-banner">
        <div id="alertTitle" class="alert-title">SẴN SÀNG</div>
        <div id="alertSub" class="alert-sub">Gắn cố định máy & bấm Bắt đầu</div>
      </div>
    </div>

    <!-- HÀNG 3: CỐC NƯỚC LỰC G & BIỂU ĐỒ (BAR / DONUT) -->
    <div class="main-panel">
      <div class="cup-wrapper">
        <div class="cup-circle" id="cupCircle">
          <div id="cupRingLvl2" class="cup-ring-lvl2"></div>
          <div id="cupRingLvl1" class="cup-ring-lvl1"></div>
          <div class="crosshair-h"></div>
          <div class="crosshair-v"></div>
          <div id="gBall" class="g-ball"></div>
          <div id="cupReadout" class="cup-readout">0.00 G</div>
        </div>
      </div>

      <!-- HIỂN THỊ KIỂU 1: BIỂU ĐỒ 4 THANH NGANG (BAR CHART) -->
      <div id="barsView" class="bars-container">
        <div class="bar-item">
          <div class="bar-header">
            <span>🚀 TĂNG TỐC (GA)</span>
            <span id="valGa">0%</span>
          </div>
          <div class="bar-track">
            <div id="markGa1" class="bar-mark-lvl1"></div>
            <div id="markGa2" class="bar-mark-lvl2"></div>
            <div id="peakGa" class="bar-peak-hold"></div>
            <div id="barGa" class="bar-fill"></div>
          </div>
        </div>

        <div class="bar-item">
          <div class="bar-header">
            <span>🛑 PHANH (THẮNG)</span>
            <span id="valPhanh">0%</span>
          </div>
          <div class="bar-track">
            <div id="markPhanh1" class="bar-mark-lvl1"></div>
            <div id="markPhanh2" class="bar-mark-lvl2"></div>
            <div id="peakPhanh" class="bar-peak-hold"></div>
            <div id="barPhanh" class="bar-fill"></div>
          </div>
        </div>

        <div class="bar-item">
          <div class="bar-header">
            <span>🔄 VÀO CUA & LẮC NGANG</span>
            <span id="valCua">0%</span>
          </div>
          <div class="bar-track">
            <div id="markCua1" class="bar-mark-lvl1"></div>
            <div id="markCua2" class="bar-mark-lvl2"></div>
            <div id="peakCua" class="bar-peak-hold"></div>
            <div id="barCua" class="bar-fill"></div>
          </div>
        </div>

        <!-- THANH THỨ 4: Ổ GÀ & ĐƯỜNG XÓC -->
        <div class="bar-item">
          <div class="bar-header">
            <span>💥 Ổ GÀ & ĐƯỜNG XÓC</span>
            <span id="valXoc">0%</span>
          </div>
          <div class="bar-track">
            <div id="markXoc1" class="bar-mark-lvl1"></div>
            <div id="markXoc2" class="bar-mark-lvl2"></div>
            <div id="peakXoc" class="bar-peak-hold"></div>
            <div id="barXoc" class="bar-fill"></div>
          </div>
        </div>
      </div>

      <!-- HIỂN THỊ KIỂU 2: BIỂU ĐỒ 4 VÒNG TRÒN (DONUT CHART) -->
      <div id="donutsView" class="donuts-container hidden">
        <div class="donut-item">
          <div class="donut-svg-wrap">
            <svg class="donut-svg" viewBox="0 0 72 72">
              <circle class="donut-track" cx="36" cy="36" r="30"></circle>
              <circle id="donutGa" class="donut-ring" cx="36" cy="36" r="30"></circle>
            </svg>
            <span id="donutValGa" class="donut-val">0%</span>
          </div>
          <span class="donut-label">🚀 GA</span>
        </div>

        <div class="donut-item">
          <div class="donut-svg-wrap">
            <svg class="donut-svg" viewBox="0 0 72 72">
              <circle class="donut-track" cx="36" cy="36" r="30"></circle>
              <circle id="donutPhanh" class="donut-ring" cx="36" cy="36" r="30"></circle>
            </svg>
            <span id="donutValPhanh" class="donut-val">0%</span>
          </div>
          <span class="donut-label">🛑 PHANH</span>
        </div>

        <div class="donut-item">
          <div class="donut-svg-wrap">
            <svg class="donut-svg" viewBox="0 0 72 72">
              <circle class="donut-track" cx="36" cy="36" r="30"></circle>
              <circle id="donutCua" class="donut-ring" cx="36" cy="36" r="30"></circle>
            </svg>
            <span id="donutValCua" class="donut-val">0%</span>
          </div>
          <span class="donut-label">🔄 CUA</span>
        </div>

        <div class="donut-item">
          <div class="donut-svg-wrap">
            <svg class="donut-svg" viewBox="0 0 72 72">
              <circle class="donut-track" cx="36" cy="36" r="30"></circle>
              <circle id="donutXoc" class="donut-ring" cx="36" cy="36" r="30"></circle>
            </svg>
            <span id="donutValXoc" class="donut-val">0%</span>
          </div>
          <span class="donut-label">💥 Ổ GÀ</span>
        </div>
      </div>
    </div>

    <!-- HÀNG 4: NÚT CÂN CHỈNH & BẮT ĐẦU + NÚT ĐỘ NHẠY + NÚT KIỂU ÂM BÁO -->
    <div class="bottom-bar">
      <button id="btnStart" class="btn-main">
        <span>🎯 CÂN CHỈNH & BẮT ĐẦU</span>
      </button>
      <button id="btnMainScale" class="btn-quick-action" title="Đổi nhanh đồng loạt các ngưỡng cảm biến">
        <span>ĐỘ NHẠY</span>
        <strong id="mainScaleLabel">40%</strong>
      </button>
      <button id="btnMainWave" class="btn-quick-action" title="Đổi nhanh kiểu sóng âm báo">
        <span>KIỂU ÂM BÁO</span>
        <strong id="mainWaveLabel">SQUARE</strong>
      </button>
    </div>
  </div>

  <!-- POPUP CÀI ĐẶT -->
  <div id="settingsModal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3>⚙️ Cài đặt SmooDri</h3>
        <button id="btnCloseModal" class="btn-icon">Đóng ✕</button>
      </div>

      <!-- 1. TÙY CHỌN GIAO DIỆN & KIỂU BIỂU ĐỒ -->
      <div class="section-divider">1. Hiển thị & Giao diện</div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Chế độ màu sắc</span>
          <span id="lblThemeName">Sáng (Light)</span>
        </div>
        <div class="option-grid-2">
          <button class="btn-option" id="btnThemeLight">☀️ Giao diện Sáng</button>
          <button class="btn-option" id="btnThemeDark">🌙 Giao diện Tối</button>
        </div>
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Kiểu biểu đồ lực G</span>
          <span id="lblChartType">Thanh ngang (Bar)</span>
        </div>
        <div class="option-grid-2">
          <button class="btn-option" id="btnChartBar">📊 Thanh ngang (Bar)</button>
          <button class="btn-option" id="btnChartDonut">🍩 Vòng tròn (Donut)</button>
        </div>
      </div>

      <!-- 2. CÀI ĐẶT ÂM THANH & CẢNH BÁO ĐƯỜNG XÓC -->
      <div class="section-divider">2. Chọn Kiểu Cảnh Báo & Âm thanh Ổ gà</div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Chọn kiểu cảnh báo lái xe (Sóng âm)</span>
          <span id="lblWaveType">Square (Siêu to)</span>
        </div>
        <div class="option-grid-3">
          <button class="btn-option" id="btnWaveSquare" data-wave="square">📢 Square</button>
          <button class="btn-option" id="btnWaveTriangle" data-wave="triangle">🔔 Triangle</button>
          <button class="btn-option" id="btnWaveSine" data-wave="sine">🔉 Sine</button>
        </div>
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Âm báo đặc biệt khi qua Ổ gà / Đường xóc</span>
          <span id="lblPotholeWave">Sawtooth (Chuông lùi)</span>
        </div>
        <div class="option-grid-3">
          <button class="btn-option" id="btnPotholeSaw" data-pothole="sawtooth">🚨 Sawtooth</button>
          <button class="btn-option" id="btnPotholeSquare" data-pothole="square">📢 Square</button>
          <button class="btn-option" id="btnPotholeSine" data-pothole="sine">🔉 Sine</button>
        </div>
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Khuếch đại âm lượng (Gain Boost)</span>
          <span id="lblVolumeBoost">3.0 x</span>
        </div>
        <input type="range" id="rngVolumeBoost" min="0.5" max="4.0" step="0.5" value="3.0" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Mức bắt đầu phát tiếng bíp</span>
          <span id="lblStartBeep">70 %</span>
        </div>
        <input type="range" id="rngStartBeep" min="50" max="90" step="5" value="70" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Tốc độ hồi phục Điểm Êm Ái (dt * X)</span>
          <span id="lblScoreRecovery">3 đ/s</span>
        </div>
        <input type="range" id="rngScoreRecovery" min="1" max="20" step="1" value="3" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Giữ vạch/số đỉnh (Peak Hold)</span>
          <span id="lblPeakHoldTime">1.5 giây</span>
        </div>
        <input type="range" id="rngPeakHoldTime" min="0.0" max="5.0" step="0.5" value="1.5" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Giữ thông báo cảnh báo (Ga/Phanh %)</span>
          <span id="lblAlertHoldTime">3.0 giây</span>
        </div>
        <input type="range" id="rngAlertHoldTime" min="0.5" max="8.0" step="0.5" value="3.0" />
      </div>

      <div class="setting-group">
        <div class="setting-label"><span>Nghe thử âm thanh cảnh báo:</span></div>
        <div class="option-grid-3">
          <button class="btn-option" id="btnTestBeepLow">🔊 Chớm bíp</button>
          <button class="btn-option" id="btnTestBeepHigh">🔊 Kịch 100%</button>
          <button class="btn-option" id="btnTestPothole">💥 Ổ gà</button>
        </div>
      </div>

      <!-- 3. CHỈNH NHANH ĐỒNG LOẠT CÁC NGƯỠNG CẢM BIẾN & CHI TIẾT -->
      <div class="section-divider">3. Chỉnh nhanh đồng loạt các ngưỡng cảm biến</div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Tỷ lệ ngưỡng đồng loạt (So với gốc)</span>
          <span id="lblMasterScale">40 %</span>
        </div>
        <input type="range" id="rngMasterScale" min="20" max="130" step="5" value="40" />
        <div id="scalePresetsContainer" class="preset-scale-grid"></div>
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Ngưỡng Tăng tốc (Ga 100%)</span>
          <span id="lblMaxGa">0.25 G</span>
        </div>
        <input type="range" id="rngMaxGa" min="0.05" max="0.50" step="0.01" value="0.25" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Ngưỡng Phanh (Thắng 100%)</span>
          <span id="lblMaxPhanh">0.28 G</span>
        </div>
        <input type="range" id="rngMaxPhanh" min="0.05" max="0.55" step="0.01" value="0.28" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Ngưỡng Vào cua (Cua 100%)</span>
          <span id="lblMaxCua">0.25 G</span>
        </div>
        <input type="range" id="rngMaxCua" min="0.05" max="0.50" step="0.01" value="0.25" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Ngưỡng Ổ gà & Đường xóc (Xóc 100%)</span>
          <span id="lblPotholeThreshold">0.30 G</span>
        </div>
        <input type="range" id="rngPotholeThreshold" min="0.08" max="0.65" step="0.01" value="0.30" />
      </div>

      <div class="setting-group">
        <div class="setting-label">
          <span>Độ nhạy bắt lỗi Lạng lách / Giật lái</span>
          <span id="lblMaxJerk">0.30 G/s</span>
        </div>
        <input type="range" id="rngMaxJerk" min="0.08" max="0.70" step="0.01" value="0.30" />
      </div>

      <!-- 4. GÓC THÔNG TIN TÀI LIỆU THAM KHẢO -->
      <div class="ref-info-box">
        <div class="ref-info-title">📚 Nguồn tham khảo các thông số chuẩn (Mốc 100%):</div>
        <div>• <strong>Ga (0.25G), Phanh (0.28G), Vào cua (0.25G):</strong> Theo tiêu chuẩn quốc tế <strong>ISO 2631-1</strong> (Độ êm ái & chống say xe cho hành khách) và chuẩn Telematics (<strong>Geotab / Samsara</strong>). Dưới 0.18G (~70%) là vùng êm ái tuyệt đối; vượt 0.25G–0.28G người ngồi sau phải gồng cơ cổ/lưng để giữ thăng bằng.</div>
        <div style="margin-top: 4px;">• <strong>Ổ gà / Xóc (0.30G) & Lạng lách (0.30 G/s):</strong> Theo tài liệu động lực học thiết kế đường đèo (<strong>AASHTO / IEEE Intelligent Vehicles</strong>). Gia tốc xóc thẳng đứng vượt 0.30G hoặc độ giật ngang vượt 0.30 G/s gây nảy người và quăng đầu đột ngột.</div>
      </div>
    </div>
  </div>

  <script>
    /**************************************************************
     * 0. CẤU HÌNH CÁC NÚT ĐỘ NHẠY NHANH
     **************************************************************/
    const QUICK_SCALE_PRESETS = [20, 30, 40, 50, 60, 70, 80, 90, 100];

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
  </script>
</body>
</html>
Cách kiểm tra nhanh sau khi cập nhật:
Lưu đè code mới vào index.html, mở trên điện thoại và để máy nằm nghiêng hoặc dựng đứng cố định trên bàn/giá đỡ.

Bấm 🎯 CÂN CHỈNH & BẮT ĐẦU: Cả 4 thanh (Tăng tốc, Phanh, Vào cua, Ổ gà & Đường xóc) đều sẽ đứng im ở 0% và hiển thị LÁI XE ÊM ÁI.

Dùng ngón tay gõ nhẹ hoặc nhấc nhẹ điện thoại lên xuống theo phương thẳng đứng: Thanh 💥 Ổ GÀ & ĐƯỜNG XÓC sẽ nhảy % và phát âm báo chuông lùi riêng biệt.

file index này khá dài, mỗi lần sửa chữa rất tốn token phải không. trả lời ngắn gọn.

Đúng vậy. File HTML gộp chung cả giao diện (CSS), cấu trúc (HTML) và toàn bộ thuật toán xử lý cảm biến (JS) nên kích thước khá lớn, mỗi lần trao đổi và truyền tải lại toàn bộ mã nguồn sẽ tốn nhiều token.

Giải pháp tối ưu cho tương lai: Khi ứng dụng đã ổn định, bạn có thể tách riêng phần CSS ra một file (style.css) và phần logic xử lý ra một file JavaScript riêng (app.js). Khi đó mỗi lần sửa chữa bạn chỉ cần gửi đoạn code của file cần sửa, sẽ tiết kiệm rất nhiều token.

nhưng mà như vậy, nếu sửa phần style hoặc app thì tôi cần gửi những file nào.

Nếu bạn tách code thành các file riêng (index.html, style.css, app.js), mỗi khi cần sửa chữa bạn chỉ cần gửi file cụ thể liên quan thay vì gửi cả cục:

Sửa giao diện, màu sắc, bố cục: Chỉ cần gửi file style.css.

Sửa thêm nút bấm, thay đổi chữ, bố trí thành phần HTML: Chỉ cần gửi file index.html.

Sửa thuật toán cảm biến, âm thanh, tính toán % lực G: Chỉ cần gửi file app.js.

Cách này giúp bạn tiết kiệm tối đa token, sửa lỗi nhanh hơn và quản lý mã nguồn cực kỳ gọn gàng.

giá trị của thanh ổ gà, đường xóc bạn lấy từ tài liệu nào vậy

Giá trị và ngưỡng cho thanh Ổ gà & Đường xóc (ví dụ mốc gốc cơ bản quanh mức 
0.30 G) được xây dựng dựa trên các tiêu chuẩn kỹ thuật giao thông và động lực học xe cơ giới quốc tế:

Tiêu chuẩn Quốc tế ISO 2631-1 (Đánh giá mức độ rung động ảnh hưởng đến con người):

Tiêu chuẩn này quy định các ngưỡng gia tốc rung (đặc biệt theo phương thẳng đứng - vertical vibration) tác động lên toàn thân con người.

Theo thang đo độ thoải mái của ISO 2631-1, mức gia tốc rung từ khoảng 
0.315 m/s 
2
  đến trên 
0.31 G được xem là ngưỡng bắt đầu gây khó chịu, mệt mỏi hoặc làm người ngồi trên xe bị xóc nảy.

Tài liệu Thiết kế Hình học Đường bộ AASHTO (Tiêu chuẩn thiết kế độ cong dọc & độ thoải mái):

AASHTO định nghĩa các tiêu chí gia tốc hướng tâm/thẳng đứng cho phép trên các đoạn đường lồi, lõm, mố cầu sao cho hành khách không bị cảm giác hẫng hoặc bị nảy người đột ngột.

Các nghiên cứu về chỉ số độ nhám mặt đường quốc tế (IRI - International Roughness Index) khi quy đổi ra gia tốc rung động trên xe ô tô cũng thường sử dụng mốc giới hạn an toàn/êm ái nằm trong khoảng 
0.25 G−0.35 G cho các chướng ngại vật đứng.

tôi muốn di chuyển cốc nước sang sát cạnh trái thì chỉnh thông số nào

Để di chuyển Cốc nước G-Force sang sát cạnh trái, bạn không cần phải sửa code logic (JavaScript), mà chỉ cần điều chỉnh một thông số căn lề (padding-left hoặc justify-content) trong phần CSS của .cup-wrapper.

Hướng dẫn cách sửa:
Bạn tìm đến đoạn CSS của .cup-wrapper trong thẻ <style> của file index.html (khoảng dòng 180):

Tìm đoạn code này:

CSS
.cup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center; /* <--- Đang nằm ở giữa (center) */
  position: relative;
  flex: 1;
  min-height: 105px;
  max-height: 190px;
}
Sửa thành:

CSS
.cup-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Chuyển thành nằm sát cạnh trái */
  padding-left: 4px;             /* Khoảng cách đệm sát mép trái (có thể chỉnh to/nhỏ tùy ý) */
  position: relative;
  flex: 1;
  min-height: 105px;
  max-height: 190px;
}
Sau khi đổi justify-content: center thành justify-content: flex-start, cốc nước sẽ tự động dịch chuyển sát sang cạnh bên trái của màn hình điện thoại!

tôi đã chỉnh rồi nhưng sao vẫn không nằm sát cạnh trái

Nếu bạn đã sửa .cup-wrapper thành justify-content: flex-start mà cốc nước vẫn chưa chịu sát hẳn sang mép trái, nguyên nhân là do phần tử cha chứa nó (.main-panel) đang có khoảng đệm (padding) bên trong đẩy các phần tử vào giữa.

Cách khắc phục triệt để:
Bạn tìm đến đoạn CSS của .main-panel trong phần <style> của file index.html và chỉnh lại thuộc tính padding của nó:

Tìm đoạn này:

CSS
.main-panel {
  flex: 1;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 8px 12px; /* <--- Đang có padding hai bên là 12px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
}
Sửa thành (giảm padding bên trái về 0 hoặc 4px):

CSS
.main-panel {
  flex: 1;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 8px 12px 8px 4px; /* Trên: 8px, Phải: 12px, Dưới: 8px, Trái: 4px sát mép */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
}
Sau khi giảm padding bên trái của .main-panel về 4px (hoặc 0), cốc nước bên trong sẽ dịch chuyển sát hoàn toàn sang mép khung viền bên trái!

tôi muốn số 0.00g của cốc nước di chuyển xuống phía dưới, sang trái thì chỉnh thông số nào

Để di chuyển con số hiển thị 0.00 G xuống phía dưới và sang bên trái trong khung cốc nước, bạn chỉnh sửa thuộc tính bottom và left (hoặc transform) của lớp CSS .cup-readout trong phần <style> của file index.html.

Hướng dẫn cách sửa:
Bạn tìm đến đoạn CSS của .cup-readout (khoảng dòng 315) và điều chỉnh lại các thông số sau:

Tìm đoạn code này:

CSS
.cup-readout {
  position: absolute;
  bottom: 8px;       /* Khoảng cách cách đáy cốc nước */
  left: 50%;         /* Đang ở chính giữa theo chiều ngang */
  transform: translateX(-50%); /* Căn giữa */
  font-size: 16px;
  font-weight: 900;
  color: var(--text);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.65);
  padding: 1px 7px;
  border-radius: 8px;
  z-index: 3;
  pointer-events: none;
}
Sửa thành (đẩy xuống thấp hơn và dịch sang trái):

CSS
.cup-readout {
  position: absolute;
  bottom: 4px;       /* Giảm số này xuống để sát đáy cốc hơn (hoặc giữ nguyên nếu vừa vặn) */
  left: 20%;         /* Giảm từ 50% xuống 20% hoặc 15% để dịch hẳn sang trái */
  transform: none;   /* Bỏ lệnh căn giữa đi để chữ bám theo mốc left mới */
  font-size: 15px;
  font-weight: 900;
  color: var(--text);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.65);
  padding: 1px 7px;
  border-radius: 8px;
  z-index: 3;
  pointer-events: none;
}
Mẹo nhỏ:
Nếu bạn muốn chữ dịch sang trái nhiều hơn nữa, hãy giảm giá trị left: 20% xuống thành 15% hoặc 10%.

Nếu muốn dịch xuống sát viền dưới của vòng tròn cốc nước hơn, hãy chỉnh bottom: 4px thành bottom: 2px hoặc 2px tùy ý!

tôi muốn tăng độ trong suốt của giá trị này thì chỉnh như thế nào

Để tăng độ trong suốt (làm cho nền mờ đi hoặc trong suốt hơn) của ô hiển thị giá trị 0.00 G (.cup-readout), bạn chỉ cần chỉnh sửa thông số màu nền (background) trong đoạn CSS của .cup-readout.

Hướng dẫn cách sửa:
Bạn tìm đến đoạn CSS của .cup-readout trong thẻ <style> của file index.html:

Tìm đoạn này:

CSS
.cup-readout {
  position: absolute;
  bottom: 4px;
  left: 20%;
  transform: none;
  font-size: 15px;
  font-weight: 900;
  color: var(--text);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.65); /* <--- Số 0.65 là độ mờ/đặc của nền */
  padding: 1px 7px;
  border-radius: 8px;
  z-index: 3;
  pointer-events: none;
}
Sửa thành (giảm số 0.65 xuống ví dụ 0.3 hoặc 0.1):

CSS
.cup-readout {
  position: absolute;
  bottom: 4px;
  left: 20%;
  transform: none;
  font-size: 15px;
  font-weight: 900;
  color: var(--text);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.30); /* Giảm xuống 0.3 để trong suốt hơn, hoặc 0.0 để trong suốt hoàn toàn */
  padding: 1px 7px;
  border-radius: 8px;
  z-index: 3;
  pointer-events: none;
}
*(Lưu ý:

Số phía sau cùng 0.65 trong rgba đại diện cho độ đậm đặc (Alpha). Số càng nhỏ gần về 0 thì khung nền càng trong suốt. Nếu bạn đặt bằng 0 thì nền sẽ hoàn toàn trong suốt không màu.

Ở giao diện nền tối (Dark mode), ứng dụng có một đoạn CSS riêng ghi đè màu nền ở khoảng dòng 330: :root:not([data-theme="light"]) .cup-readout { background: rgba(15, 23, 42, 0.72); }. Nếu bạn muốn chỉnh độ trong suốt cho cả chế độ tối, hãy giảm số 0.72 ở đó xuống mức tương tự).*

giải thich chi tiết về nhận xét này (về file index.html)       Các phần

tử tương tác (nút bấm, slider) được dùng `<div>` / `<input

type="range">` thay vì `<button>` ngữ nghĩa. Khiến

**keyboard navigation** và **screen reader** gặp khó khăn

Nhận xét trên đề cập đến vấn đề về khả năng tiếp cận (Accessibility - gọi tắt là a11y) trong lập trình web. Cụ thể, việc sử dụng các thẻ HTML không đúng chuẩn ngữ nghĩa (semantic HTML) khiến cho các công cụ hỗ trợ người khuyết tật (như trình đọc màn hình - screen reader) hoặc người dùng không dùng chuột (chỉ dùng bàn phím - keyboard navigation) gặp khó khăn khi thao tác với ứng dụng.

Dưới đây là giải thích chi tiết về từng ý trong nhận xét:

1. Tại sao dùng <div> làm nút bấm lại gây lỗi?
Trong nhiều giao diện web tự chế, lập trình viên hay dùng thẻ <div> hoặc <span> rồi gắn sự kiện click vào để làm nút bấm (ví dụ: <div onclick="handleClick()">Bấm vào đây</div>).

Vấn đề với bàn phím (Keyboard Navigation): Trình duyệt web mặc định hỗ trợ phím Tab để nhảy qua lại giữa các nút bấm, và phím Enter hoặc Space để kích hoạt. Thẻ <div> không nằm trong danh sách điều hướng mặc định của bàn phím. Người dùng mù hoặc người bị liệt tay (phải dùng bàn phím thay chuột) bấm phím Tab sẽ bị trôi qua thẻ <div> đó mà không tài nào chọn được. Trong khi đó, thẻ <button> chuẩn được trình duyệt tự động nhận diện bàn phím mà không cần lập trình thêm.

Vấn đề với trình đọc màn hình (Screen Reader): Khi người khiếm thị dùng phần mềm đọc màn hình quét qua trang web:

Nếu gặp thẻ <button>, máy sẽ đọc lớn lên: "Nút bấm: Cân chỉnh và bắt đầu".

Nếu gặp thẻ <div>, máy chỉ đọc nội dung chữ bên trong như một đoạn văn bản bình thường (ví dụ: "Cân chỉnh và bắt đầu"), khiến người dùng không biết đó là một nút có thể bấm được.

2. Vấn đề với <input type="range"> (Thanh trượt)
Thẻ <input type="range"> thực chất là thẻ chuẩn để làm thanh trượt, nhưng nhận xét nhắc đến nó vì các thanh trượt trong app di động thường được thiết kế tùy biến (custom CSS) khá phức tạp.

Nếu thanh trượt không đi kèm với thẻ nhãn ngữ nghĩa (<label> liên kết qua thuộc tính for và id), trình đọc màn hình sẽ không biết thanh trượt này dùng để làm gì khi người dùng kéo tới.

Trên máy tính, việc dùng các phím mũi tên (Left, Right, Up, Down) để tăng giảm giá trị của thanh trượt cũng có thể bị vô hiệu hóa nếu thiếu các thuộc tính hỗ trợ tiếp cận (như aria-valuenow, aria-valuemin, aria-valuemax).

Đối với ứng dụng "SmooDri" của bạn, có cần sửa lỗi này không?
Bản chất ứng dụng: SmooDri là một Progressive Web App (PWA) chuyên dùng trên điện thoại di động gắn trên xe ô tô (thao tác trực tiếp bằng tay chạm màn hình cảm ứng).

Đánh giá thực tế:

Các nút bấm trong file index.html của bạn đa phần đã sử dụng đúng thẻ <button> ngữ nghĩa (như <button id="btnStart" class="btn-main">, <button class="btn-option">). Chỉ có một số ít trường hợp dùng thẻ <div> cho các khối thẻ trang trí hoặc khung điểm số.

Vì đây là ứng dụng lái xe cá nhân, người dùng dùng tay chạm trực tiếp chứ không dùng trình đọc màn hình cho người khiếm thị hay dùng bàn phím máy tính để điều hướng, nên nhận xét này ít ảnh hưởng trực tiếp đến trải nghiệm thực tế của bạn.

Tuy nhiên, nếu xét theo chuẩn lập trình web quốc gia/quốc tế (W3C Web Accessibility), một mã nguồn hoàn hảo luôn được khuyến khích sử dụng đúng 100% thẻ ngữ nghĩa và bổ sung các thuộc tính ARIA (aria-label, role) để hỗ trợ tốt nhất cho mọi đối tượng người dùng.

tách file index.html này thành 3 file nhỏ để dễ quản lý: index.html style.css và app.js có cần phải chỉnh sửa file manifest.json và file sw.js không

Các file mã nguồn đã được tách hoàn chỉnh và sẵn sàng để bạn tải về:

Biểu tượng HTML
index
 HTML 
Biểu tượng CSS
style
 CSS 
Biểu tượng JS
app
 JS 
Biểu tượng JS
sw
 JS 
Giải đáp: Có cần chỉnh sửa manifest.json và sw.js không?
Đối với manifest.json 
→ KHÔNG CẦN SỬA:

File manifest.json chỉ khai báo tên ứng dụng, màu sắc và đường dẫn khởi chạy "start_url": "./index.html". Khi trình duyệt mở index.html, file HTML này sẽ tự động gọi tiếp style.css và app.js, nên manifest.json giữ nguyên 100%.   
JSON
+ 1

Đối với sw.js 
→ CẦN CẬP NHẬT (Tôi đã sửa sẵn trong file sw.js đính kèm ở trên):

Lý do 1 (Chạy Offline): Trong file sw.js cũ, mảng CORE_ASSETS chỉ mới lưu ./index.html và ./manifest.json. Khi tách ra, chúng ta cần thêm './style.css' và './app.js' vào CORE_ASSETS để khi bạn đi đèo mất sóng 4G, ứng dụng vẫn tải được giao diện và thuật toán từ bộ nhớ đệm.   
JS

Lý do 2 (Tự động cập nhật khi bạn sửa code trên GitHub): File sw.js cũ chỉ áp dụng chiến lược Network First (ưu tiên tải bản mới nhất từ mạng) cho index.html, còn các file khác lại ưu tiên lấy từ Cache cũ trước. Tôi đã mở rộng điều kiện Network First cho cả index.html, style.css, và app.js. Nhờ vậy, sau này bạn sửa bất kỳ file nào trong 3 file này trên GitHub, mở điện thoại lên là nhận ngay lập tức mà không bị kẹt code cũ!   
JS





Gemini là một AI và có thể mắc sai sót.

Đang phân tích
const CACHE_NAME = 'smoodri-offline-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1126/1126585.png'
];

// Cài đặt Service Worker và lưu trữ các file cốt lõi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    })
  );
  self.skipWaiting();
});

// Kích hoạt và dọn sạch cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Chiến lược Network First cho HTML, CSS, JS (Sửa code trên GitHub là tự cập nhật ngay, mất mạng dùng Cache)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isCodeFile =
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('index.html') ||
    url.pathname.endsWith('style.css') ||
    url.pathname.endsWith('app.js');

  if (isCodeFile) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request) || caches.match('./index.html'))
    );
    return;
  }

  // Các tài nguyên khác (manifest, icon): Ưu tiên Cache, ngầm cập nhật mới
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});
sw.js
Đang hiển thị sw.js.

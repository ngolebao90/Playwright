import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  
  /* 1. KHẮC PHỤC LỖI MẠNG (ERR_NETWORK_CHANGED)
     Tắt chế độ chạy song song hoàn toàn và giới hạn workers xuống 1. 
     Trang web demo thường bị nghẽn nếu có quá nhiều trình duyệt truy cập cùng lúc. */
  fullyParallel: false,
  workers: 1, 

  /* 2. CƠ CHẾ TỰ ĐỘNG CHẠY LẠI (RETRIES)
     Nếu bị lỗi mạng nhất thời, Playwright sẽ thử lại. Đây là cách tốt nhất để xử lý lỗi mạng. */
  retries: 2, 

  /* 3. TĂNG THỜI GIAN CHỜ TỔNG THỂ CHO TEST CASE */
  timeout: 60000, 

  forbidOnly: !!process.env.CI,
  
  reporter: [
    ['html'], 
    [
      'allure-playwright', 
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
      },
    ],
  ],

  use: {
    /* Đã cấu hình baseURL để bạn gọi page.goto('/') trong POM */
    baseURL: 'https://practicesoftwaretesting.com/',

    /* 4. TĂNG THỜI GIAN ĐỢI CHO TỪNG HÀNH ĐỘNG CỤ THỂ */
    actionTimeout: 20000,      // Đợi 20s cho click, fill...
    navigationTimeout: 45000,  // Đợi 45s cho việc tải trang (Page Load)

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
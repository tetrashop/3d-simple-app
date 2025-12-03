import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // این تنظیمات برای build بهینه ضروری است
  build: {
    outDir: 'dist',
    sourcemap: false, // غیرفعال کردن sourcemap برای کاهش حجم
    rollupOptions: {
      output: {
        manualChunks: {
          // جدا کردن کتابخانه‌های بزرگ به باندل‌های مجزا
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'] // اگر از three.js استفاده می‌کنید
        }
      }
    }
  }
})

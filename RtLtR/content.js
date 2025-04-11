// 1. ابتدا متغیرها و استایل‌ها را تعریف می‌کنیم
const originalColors = new WeakMap();

// ایجاد و اضافه کردن استایل‌های مورد نیاز
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse-animation {
    0%, 100% {
      color: inherit;
      text-shadow: none;
      transform: scale(1);
    }
    50% {
      color: #ff2200;
      text-shadow: 0 0 12px #ff5500;
      transform: scale(1.05);
    }
  }
  
  .pulse-effect {
    animation: pulse-animation 0.4s ease-out;
    display: inline-block;
    will-change: transform, color, text-shadow;
  }
`;
document.head.appendChild(style);

// 2. رویداد کلیک را اضافه می‌کنیم
document.addEventListener('click', function(e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    try {
      const element = e.target;

      /*
      // بررسی عناصر معتبر
      if (!element || !element.style || 
          element.tagName === 'INPUT' || 
          element.tagName === 'TEXTAREA') {
        return;
      }
      */

      // ذخیره استایل‌های اصلی
      if (!originalColors.has(element)) {
        originalColors.set(element, {
          color: getComputedStyle(element).color,
          textShadow: getComputedStyle(element).textShadow,
          fontWeight: getComputedStyle(element).fontWeight
        });
      }

      // تغییر جهت متن
      const currentDir = getComputedStyle(element).direction;
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      element.style.direction = newDir;
      element.style.textAlign = newDir === 'rtl' ? 'right' : 'left';
      
      // اعمال افکت پالس
      element.classList.add('pulse-effect');
      
      // حذف کلاس پس از اتمام انیمیشن
      element.addEventListener('animationend', function handler() {
        element.classList.remove('pulse-effect');
        element.removeEventListener('animationend', handler);
      });
      
    } catch (err) {
      console.error('خطا در اجرای افکت:', err);
    }
  }
}, true);

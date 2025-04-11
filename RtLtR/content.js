// ذخیره رنگ اصلی متن
const originalColors = new WeakMap();

document.addEventListener('click', function(e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    try {
      const element = e.target;
      
      // فقط برای عناصر متنی مناسب
      if (!element || !element.style || 
          element.tagName === 'INPUT' || 
          element.tagName === 'TEXTAREA' ||
          element.tagName === 'BUTTON') {
        return;
      }

      // ذخیره رنگ اصلی اگر وجود نداشته باشد
      if (!originalColors.has(element)) {
        originalColors.set(element, getComputedStyle(element).color);
      }

      // تغییر جهت
      const currentDir = getComputedStyle(element).direction;
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      // اعمال تغییرات
      element.style.direction = newDir;
      element.style.textAlign = newDir === 'rtl' ? 'right' : 'left';
      
      // ایجاد افکت چشمک زدن با تغییر opacity
      element.style.transition = 'opacity 0.2s ease';
      element.style.opacity = '0.7';
      
      // بازگشت سریع به حالت اولیه (300ms)
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transition = 'none';
      }, 300);
      
    } catch (err) {
      console.error('خطا در تغییر جهت متن:', err);
    }
  }
}, true);

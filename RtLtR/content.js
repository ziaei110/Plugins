// ذخیره رنگ اصلی متن
let originalColors = new WeakMap();

document.addEventListener('click', function(e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    try {
      const element = e.target;
      
      // فقط برای عناصر متنی
      if (!element || !element.style || 
          !(element instanceof HTMLElement) || 
          element.tagName === 'INPUT' || 
          element.tagName === 'TEXTAREA') {
        return;
      }

      // ذخیره رنگ اصلی اگر وجود نداشته باشد
      if (!originalColors.has(element)) {
        originalColors.set(element, {
          color: element.style.color || getComputedStyle(element).color,
          dir: element.style.direction || getComputedStyle(element).direction
        });
      }

      // تغییر جهت
      const currentDir = element.style.direction || getComputedStyle(element).direction;
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      // اعمال تغییرات
      element.style.direction = newDir;
      element.style.textAlign = newDir === 'rtl' ? 'right' : 'left';
      
      // تغییر موقت رنگ متن
      element.style.color = newDir === 'rtl' ? '#0066cc' : '#cc6600';
      element.style.transition = 'color 0.3s, text-align 0.3s';
      
      // بازگشت به رنگ اصلی پس از 1 ثانیه
      setTimeout(() => {
        const original = originalColors.get(element);
        if (original) {
          element.style.color = original.color;
        }
      }, 1000);
      
    } catch (err) {
      console.error('خطا در تغییر جهت متن:', err);
    }
  }
}, true);

// ======= تنظیمات قابل تغییر توسط کاربر =======
// Effects: wave , glow , fade , rotate , pulse
const ACTIVE_EFFECTS = ['rotate','glow', 'palse']; // افکت‌های فعال (ترتیب مهم است)
const EFFECT_DURATION = 0.3; // مدت زمان افکت به ثانیه

// ======= کد اصلی =======
const originalColors = new WeakMap();

// تعریف تمام افکت‌ها
const effectDefinitions = {
  wave: `
    @keyframes wave-effect {
      0% { transform: translateY(0) scaleX(1); }
      25% { transform: translateY(-5px) scaleX(1.05); }
      50% { transform: translateY(0) scaleX(0.95); }
      75% { transform: translateY(3px) scaleX(1.02); }
      100% { transform: translateY(0) scaleX(1); }
    }
  `,
  
  glow: `
    @keyframes glow-effect {
      0%, 100% { text-shadow: 0 0 0px #fff; }
      50% { text-shadow: 0 0 10px #ffdd00; }
    }
  `,
  
  fade: `
    @keyframes fade-effect {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
  `,
  
  rotate: `
    @keyframes rotate-effect {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      75% { transform: rotate(-5deg); }
    }
  `,
  
  pulse: `
    @keyframes pulse-effect {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
  `
};

// تولید کلاس ترکیبی افکت‌ها
function generateCombinedEffect() {
  let styles = '';
  let animations = '';
  
  // اضافه کردن تعاریف افکت‌ها
  ACTIVE_EFFECTS.forEach(effect => {
    styles += effectDefinitions[effect] + '\n';
  });
  
  // تولید انیمیشن ترکیبی
  ACTIVE_EFFECTS.forEach((effect, index) => {
    animations += `${effect}-effect ${EFFECT_DURATION}s ease-out`;
    if (index < ACTIVE_EFFECTS.length - 1) animations += ', ';
  });
  
  styles += `
    .combined-effect {
      animation: ${animations};
      display: inline-block;
      will-change: transform, opacity, text-shadow;
    }
  `;
  
  return styles;
}

// افزودن استایل‌ها به صفحه
const style = document.createElement('style');
style.textContent = generateCombinedEffect();
document.head.appendChild(style);

// رویداد کلیک
document.addEventListener('click', function(e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    try {
      const element = e.target;
      /*
      if (!element || !element.style || 
          element.tagName === 'INPUT' || 
          element.tagName === 'TEXTAREA') {
        return;
      }
      */

      // تغییر جهت متن
      const currentDir = getComputedStyle(element).direction;
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      element.style.direction = newDir;
      element.style.textAlign = newDir === 'rtl' ? 'right' : 'left';
      
      // اعمال افکت ترکیبی
      element.classList.add('combined-effect');
      element.addEventListener('animationend', () => {
        element.classList.remove('combined-effect');
        // بازنشانی استایل‌ها
        element.style.transform = '';
        element.style.opacity = '';
        element.style.textShadow = '';
      });

    } catch (err) {
      console.error('خطا در اجرای افکت:', err);
    }
  }
}, true);

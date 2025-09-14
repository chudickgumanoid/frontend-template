export function throttle(callee, timeout) {
  // Таймер будет определять, надо ли пропускать вызовы
  let timer = null;

  // Возвращаем функцию-обёртку
  return function perform(...args) {
    // Если таймер активен, пропускаем вызов
    if (timer) return;

    // Если таймера нет, вызываем функцию
    timer = setTimeout(() => {
      // Вызываем оригинальную функцию с аргументами
      callee(...args);

      // Сбрасываем таймер после выполнения
      timer = null;
    }, timeout);
  };
}

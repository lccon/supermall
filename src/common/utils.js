// 防抖动函数，图片加载单位时间内只执行一次，delay时长
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}
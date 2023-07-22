let keys = {37: 1, 38: 1, 39: 1, 40: 1};

export const preventDefault = (event) => {
  event.preventDefault();
}

export const preventDefaultForScrollKeys = (event) => {
  if (keys[event.keyCode]) {
    preventDefault(event);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function() { supportsPassive = true; }
  }));
} catch (_err) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to disable
export const disableScroll = (element) => {
  element.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  element.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  element.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  element.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to enable
export const enableScroll = (element) => {
  element.removeEventListener('DOMMouseScroll', preventDefault, false);
  element.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  element.removeEventListener('touchmove', preventDefault, wheelOpt);
  element.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
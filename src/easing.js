const easeIn = power => t => Math.pow(t, power);
const easeOut = power => t => 1 - Math.abs(Math.pow(t - 1, power));
const easeInOut = power => t => t < 0.5
      ? easeIn(power)(t * 2) / 2
  : easeOut(power)(t * 2 - 1) / 2 + 0.5;

const easing = {
  linear: t => t,
  easeInQuad: easeIn(2),
  easeOutQuad: easeOut(2),
  easeInOutQuad: easeInOut(2),
  easeInCubic: easeIn(3),
  easeOutCubic: easeOut(3),
  easeInOutCubic: easeInOut(3),
  easeInQuart: easeIn(4),
  easeOutQuart: easeOut(4),
  easeInOutQuart: easeInOut(4),
  easeInQuint: easeIn(5),
  easeOutQuint: easeOut(5),
  easeInOutQuint: easeInOut(5),
  easeInSin: t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  easeOutSin: t => Math.sin(Math.PI / 2 * t),
  easeInOutSin: t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2,
};

export default easing;

const { raf, caf } = require('./request-animation-frame');

const TIME_TOLERANCE = 8;
const noop = () => {};
const linearEasing = t => t;

class Animazione {
  constructor(render = noop, opts = {}) {
    const {
      target = null,
      duration = 0,
      initialValue = 0,
      endValue = 100,
      easing = linearEasing,
      fps = 60,
      onComplete = noop,
    } = opts;

    this._initialValue = initialValue;
    this._endValue = endValue;
    if (typeof easing === 'function') {
      this._easing = easing;
    } else {
      this._easing = linearEasing; // fallback to linear
    }
    this._value = initialValue;
    this._frameDuration = 1000 / fps;
    this._framesCount = duration / this._frameDuration;
    this._currentFrame = 0;
    this._lastTime = 0;
    this._delta = endValue - initialValue;
    this._target = target;
    this._render = render.bind(target);
    this._onComplete = onComplete.bind(target);
    this._tick = (time) => {
      this._lastTime = time || 0;
      if (!this._lastTime || time >= (this._nextTime - TIME_TOLERANCE)) {
        this._nextTime = this._lastTime + this._frameDuration;
        this._updateValue();
        this._render(this._value);
        if (this._value >= this._endValue) {
          this._onComplete();
          return;
        }
      }
      this._id = raf(this._tick);
    };
  }

  _updateValue() {
    this._currentFrame++;
    if (this._currentFrame >= this._framesCount) {
      this._value = this._endValue;
    } else {
      const value = this._initialValue + this._delta * this._easing(this._currentFrame / this._framesCount);
      this._value = value >= this._endValue ? this._endValue : value;
    }
  }

  start() {
    this._tick();
  }

  stop() {
    if (this._id) {
      caf(this._id);
      this._onComplete();
    }
  }
}

module.exports = Animazione;


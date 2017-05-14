import easingFunctions from './easing';
import { raf, caf } from './request-animation-frame';

const TIME_TOLERANCE = 8;

class Animazione {
  constructor(target, render, opts = {}) {
    const {
      duration = 0,
      initialValue = 0,
      endValue = 100,
      easing = easingFunctions.linear,
      fps = 60,
    } = opts;

    this._initialValue = initialValue;
    this._endValue = endValue;
    if (typeof easing === 'function') this._easing = easing;
    if (typeof easing === 'string') this._easing = easingFunctions[easing];
    this._value = initialValue;
    this._frameDuration = 1000 / fps;
    this._framesCount = duration / this._frameDuration;
    this._currentFrame = 0;
    this._lastTime = 0;
    this._delta = endValue - initialValue;
    this._target = target;
    this._render = render.bind(target);
    this._tick = (time) => {
      this._lastTime = time || 0;
      if (!this._lastTime || time >= (this._nextTime - TIME_TOLERANCE)) {
        this._nextTime = this._lastTime + this._frameDuration;
        this._updateValue();
        this._render(this._value);
        if (this._value >= this._endValue) return;
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
    }
  }
}

module.exports = Animazione;


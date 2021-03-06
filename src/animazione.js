const { raf, caf } = require('./request-animation-frame');

const TOLERANCE_THRESHOLD = 0.667;
const noop = () => {};
const linearEasing = t => t;

class Animazione {
  constructor(opts = {}) {
    const {
      render = noop,
      target = null,
      duration = 0,
      initialValue = 0,
      endValue = 1,
      easing = linearEasing,
      fps = 60,
      onComplete = noop,
      loop = false,
    } = opts;

    this._opts = opts;
    this._loop = loop;
    this._animations = [{
      render,
      target,
      initialValue,
      endValue,
      duration,
      easing,
      fps,
      onComplete,
    }];

    this._firstAnimation = this._animations.shift();
    this._initializeAnimation(this._firstAnimation);
    this._tick = (time) => {
      this._lastTime = time || 0;
      if (!this._lastTime || time >= (this._nextTime - this._tolerance)) {
        this._nextTime = this._lastTime + this._frameDuration;
        this._updateValue();
        this._render(this._value);
        if (this._value === this._endValue) {
          if (this._animations.length > 0) {
            this._onComplete();
            const nextAnimation = this._animations.shift();
            this._initializeAnimation(nextAnimation);
            if (this._loop) this._animations.push(nextAnimation);
            this._id = raf(this._tick);
            return
          }
            this._onComplete();
            this.stop();
          return;
        }
      }
      this._id = raf(this._tick);
    };
  }

  _initializeAnimation(animation) {
    const {
      render = this._render,
      target = this._target,
      initialValue = 0,
      endValue = 0,
      duration = 0,
      easing = this._opts.easing || linearEasing,
      fps = this._opts.fps || 60,
      onComplete = noop,
    } = animation;

    this._target = target;
    this._render = render.bind(target);
    this._onComplete = onComplete.bind(target);
    this._initialValue = initialValue;
    this._endValue = endValue;
    if (typeof easing === 'function') {
      this._easing = easing;
    }

    this._value = initialValue;
    this._frameDuration = 1000 / fps;
    this._tolerance = this._frameDuration * TOLERANCE_THRESHOLD;
    this._framesCount = duration / this._frameDuration;
    this._currentFrame = 0;
    this._lastTime = 0;
    this._delta = endValue - initialValue;
  }

  _updateValue() {
    this._currentFrame++;
    if (this._currentFrame >= this._framesCount) {
      this._value = this._endValue;
    } else {
      const value = this._initialValue + this._delta * this._easing(this._currentFrame / this._framesCount);
      this._value = value === this._endValue ? this._endValue : value;
    }
  }

  start() {
    this._tick();
    return this;
  }

  andThen(animation) {
    this._animations.push(animation);
    return this;
  }

  wait(duration) {
    this._animations.push({
      render: noop,
      duration: duration,
      endValue: duration,
    });
    return this;
  }

  loop() {
    this._animations.push(this._firstAnimation);
    this._loop = true;
    return this;
  }

  stop() {
    if (this._id) {
      caf(this._id);
    }
  }
}

module.exports = Animazione;


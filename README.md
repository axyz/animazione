# Animazione 

> simple easing animations using requestAnimationFrame


## Features

- custom easing
- chainable animations
- optimized frame skip
- target fps
- animation completed callback
- loop

## Install

```
$ npm install --save animazione
```


## Usage
```html
<div class="box"></div>
```

```js
const box = document.querySelector('.box');
const a = new Animazione({
  render: renderLeft, // render function for each frame
  target: box, // set the context to bind the render function to
  duration: 400, // animation step duration
  initialValue: 0, // initial value passed to render function
  endValue: 500, // end value to be reached in the render function
  easing: t => -0.5 * (Math.cos(Math.PI*t) - 1), // easing function
  onComplete: () => { console.log('first finished') }, // callback on animation step completed
}).andThen({ // multiple steps can be chained
  render: renderTop,
  duration: 400,
  initialValue: 0,
  endValue: 500,
  onComplete: () => { console.log('second finished') }
})
.loop() // a set of step animations can be looped forever
.start(); // start the animation
      
function renderLeft(val) {
  this.style['left'] = val + 'px';
}

function renderTop(val) {
  this.style['top'] = val + 'px';
}

```


## API

### Class: Animazione

Create a new Animazione instance.

```js
new Animazione(animation)
```

#### animation
> animation step

type: `Object`
* `render` {function} Render function
  * Default: `noop`
* `target` {Any} Context for the render function
  * Default: `null`
* `duration` {integer} Step duration
  * Default: `0`
* `easing` {function} Easing function
  * Default: `t => t` (linear easing)
* `initialValue`
  * Default: {integer} `0`
* `endValue`
  * Default: {integer} `1`
* `fps`
  * Default: {integer} `60`
* `loop`
  * Default: {boolean} `false`
* `onComplete`
  * Default: {function} `noop`
  
#### Methods

* `start()` Start the animation
  * Returns current Animazione instance
* `andThen(animation)` Chain another animation step
  * `animation` and animation step
  * Returns current Animazione instance
* `wait(duration)` pause the animation
  * `duration` {integer} pause duration in ms
  * Returns current Animazione instance
* `loop()` Make the animation an infinite loop of all the currently defined steps
  * Returns current Animazione instance
* `stop()` Stop the animation

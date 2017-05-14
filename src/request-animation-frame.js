const canUseDom = !!((typeof window !== 'undefined'
  && window.document && window.document.createElement));

const raf = canUseDom ? window.requestAnimationFrame : () => {};
const caf = canUseDom ? window.cancelAnimationFrame : () => {};

module.exports = {
  raf,
  caf,
};

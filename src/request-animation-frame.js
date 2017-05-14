const canUseDom = !!((typeof window !== 'undefined'
  && window.document && window.document.createElement));

export const raf = canUseDom ? window.requestAnimationFrame : () => {};
export const caf = canUseDom ? window.cancelAnimationFrame : () => {};

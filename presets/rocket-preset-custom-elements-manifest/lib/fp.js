export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export const isLengthy = xs => !!xs.length;

export const propIs = prop => test => obj =>
  test instanceof RegExp ? !!obj[prop]?.match(test) : obj[prop] === test;

export const and = (p, q) => x => p(x) && q(x);

export const not = p => x => !p(x);

export const trace = (x, tag) =>
  (console.log(tag, x), x);

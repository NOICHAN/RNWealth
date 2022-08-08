// eslint-disable-next-line import/prefer-default-export
export function currency(num) {
  const n = num === undefined ? 0 : parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

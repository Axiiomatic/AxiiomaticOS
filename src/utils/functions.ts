export const hexToRGB = (hex : string) => {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i) || [];


    return m.length === 4 ? {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    } : {r: 0, g: 0, b: 0};
};

export const clamp = (x : number, a : number, b : number) => {
  return Math.max(a, Math.min(x, b));
}

export const joinList = (list : string[], conjunction : string) => {
  if (list.length === 0) return '';
  if (list.length === 1) return list[0];
  return list.slice(0, -1).join(', ') + ' ' + conjunction + ' ' + list.slice(-1);
}

export const numberWithCommas = (x : number) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
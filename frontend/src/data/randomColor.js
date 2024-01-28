export const backgroundColorGenerator = () => {
  let r = Math.floor(Math.random() * 256).toString(16);
  let g = Math.floor(Math.random() * 256).toString(16);
  let b = Math.floor(Math.random() * 256).toString(16);

  r = r.length === 1 ? "0" + r : r;
  g = g.length === 1 ? "0" + g : g;
  b = b.length === 1 ? "0" + b : b;

  const color = "#"+r+g+b;
  return color;
};


export const isDarkColor = (color) =>{
  const hex = color.substring(1);
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  const brightness = 0.299*r+0.587*g+0.114*b;
  const threshold=126;
  return brightness<threshold;

}
export default function RandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

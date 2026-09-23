export default function changeOpacity(color: string, opacity: number): string {
  return `oklch(from ${color} l c h / ${opacity}%)`;
}

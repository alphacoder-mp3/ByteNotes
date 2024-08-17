export function getLightModeColor(color: string) {
  return color.replace('-700', '-200');
}

export function getDarkModeColor(color: string) {
  return `dark:${color}`;
}

export function getColorName(color: string) {
  return color.replace('-700', '').replace('bg-', '');
}

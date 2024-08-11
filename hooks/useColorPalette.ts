import { useState, useRef } from 'react';

export type Color =
  | ''
  | 'bg-slate-700'
  | 'bg-neutral-700'
  | 'bg-violet-700'
  | 'bg-blue-700'
  | 'bg-sky-700'
  | 'bg-indigo-700'
  | 'bg-fuchsia-700'
  | 'bg-pink-700'
  | 'bg-rose-700'
  | 'bg-purple-700'
  | 'bg-cyan-700'
  | 'bg-teal-700'
  | 'bg-emerald-700'
  | 'bg-lime-700'
  | 'bg-amber-700';

export function useColorPalette() {
  const bgColors: Color[] = [
    '',
    'bg-slate-700',
    'bg-neutral-700',
    'bg-violet-700',
    'bg-blue-700',
    'bg-sky-700',
    'bg-indigo-700',
    'bg-fuchsia-700',
    'bg-pink-700',
    'bg-rose-700',
    'bg-purple-700',
    'bg-cyan-700',
    'bg-teal-700',
    'bg-emerald-700',
    'bg-lime-700',
    'bg-amber-700',
  ];
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState<Color>('');

  return {
    isOpened,
    setIsOpened,
    bgColors,
    bgColor,
    setBgColor,
    colorPaletteRef,
  };
}
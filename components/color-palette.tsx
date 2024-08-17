import { Dispatch, RefObject, SetStateAction } from 'react';
import { Color } from '@/hooks/useColorPalette';
import { getLightModeColor, getDarkModeColor } from '@/common/common';
import { cn } from '@/lib/utils';
import { type ClassValue } from 'clsx';

export const ColorPalette = ({
  colorPaletteRef,
  bgColors,
  setBgColor,
  className,
}: {
  colorPaletteRef: RefObject<HTMLDivElement>;
  bgColors: Color[];
  setBgColor: Dispatch<SetStateAction<Color>>;
  className?: ClassValue;
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 max-w-full min-h-fit md:h-12 px-2 py-4 md:py-0 dark:bg-zinc-900 bg-zinc-100 flex items-center justify-center flex-wrap gap-2 dark:rounded-xl z-50',
        className
      )}
      ref={colorPaletteRef}
    >
      {bgColors.map(color => (
        <div
          className={`h-6 w-6 rounded-full hover:border dark:border-white border-black cursor-pointer ${getLightModeColor(
            color
          )} ${getDarkModeColor(color)}`}
          key={color}
          onClick={() => setBgColor(color)}
        />
      ))}
    </div>
  );
};

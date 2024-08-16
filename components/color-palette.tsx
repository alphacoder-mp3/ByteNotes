import { Color } from '@/hooks/useColorPalette';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { getLightModeColor, getDarkModeColor } from '@/common/common';

export const ColorPalette = ({
  colorPaletteRef,
  bgColors,
  setBgColor,
}: {
  colorPaletteRef: RefObject<HTMLDivElement>;
  bgColors: Color[];
  setBgColor: Dispatch<SetStateAction<Color>>;
}) => {
  return (
    <div
      className="fixed inset-0 max-w-full h-12 px-2 py-4 md:py-0 bg-zinc-900 flex items-center justify-center flex-wrap gap-2 dark:rounded-xl z-50"
      ref={colorPaletteRef}
    >
      {bgColors.map(color => (
        <div
          className={`h-6 w-6 rounded-full hover:border border-white cursor-pointer ${getLightModeColor(
            color
          )} ${getDarkModeColor(color)}`}
          key={color}
          onClick={() => setBgColor(color)}
        />
      ))}
    </div>
  );
};

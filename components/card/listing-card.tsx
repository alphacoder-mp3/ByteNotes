'use client';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useColorPalette } from '@/hooks/useColorPalette';
import { useRef } from 'react';
import {
  EllipsisVertical,
  CircleCheck,
  CircleUser,
  Palette,
  Pin,
  DeleteIcon,
  Trash2,
} from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { handleKeyDown, autoResizeTextarea } from '@/common/utility';
import { UpdateTodo } from '@/components/update-todo';
import { DeleteTodo } from '@/components/delete-todo';
import { ImageUploadButton } from '@/components/upload-image';
import Image from 'next/image';

export const ListingCard = ({
  item,
  children,
  className,
}: {
  item: {
    id: string;
    todoColor: string;
    title: string;
    description: string;
    images: {
      url: string;
      id: string;
    }[];
  };
  children: React.ReactNode;
  className: string;
}) => {
  const {
    isOpened,
    setIsOpened,
    bgColors,
    bgColor,
    setBgColor,
    colorPaletteRef,
  } = useColorPalette();
  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => {
    setIsOpened(false);
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card key={item.id} className={className + ' group'} ref={cardRef}>
          {children}
          <div className="flex items-center gap-6 absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Palette
              size={16}
              onClick={e => {
                e.preventDefault();
                setIsOpened(true);
              }}
            />
            <ImageUploadButton todoId={item.id} />
            <CircleUser size={16} />
            <EllipsisVertical size={16} />
          </div>
          <div className="absolute top-[-10] left-[-10] opacity-0 group-hover:opacity-100 transition-opacity">
            <CircleCheck size={24} fill="#ffffff" stroke="#000000" />
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pin size={24} />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent
        className={`mb-4 border border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column ${
          item.todoColor ? item.todoColor : bgColor ? bgColor : ''
        }`}
      >
        <DialogHeader>
          {item.images?.map((item: any) => (
            <div className="relative group">
              <Image
                src={item.url}
                key={item.id}
                alt="Image"
                width={400}
                height={400}
                className="h-full w-full rounded "
              />
              <div className="opacity-0 absolute right-2 bottom-2 bg-slate-400 p-2 rounded overflow-hidden transition-opacity duration-700 ease-in-out group-hover:opacity-70 cursor-pointer">
                <Trash2 size={16} />
              </div>
            </div>
          ))}
          <DialogTitle>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              defaultValue={item.title}
              className={`w-full p-2 border-b border-slate-700 mb-2 outline-none ${
                item.todoColor ? item.todoColor : bgColor ? bgColor : ''
              }`}
            />
          </DialogTitle>

          <textarea
            name="description"
            placeholder="Take a note..."
            id="description"
            rows={1}
            required
            autoFocus
            defaultValue={item.description}
            className={`w-full p-2 border-b border-slate-700 mb-2 outline-none resize-none ${
              item.todoColor ? item.todoColor : bgColor ? bgColor : ''
            }`}
            onKeyDown={handleKeyDown}
            onFocus={e =>
              autoResizeTextarea(e.currentTarget as HTMLTextAreaElement)
            }
            onInput={e =>
              autoResizeTextarea(e.currentTarget as HTMLTextAreaElement)
            }
          />
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-6 absolute bottom-4 left-4">
            <Palette
              size={16}
              onClick={e => {
                e.preventDefault();
                setIsOpened(true);
              }}
              className="cursor-pointer"
            />
            <ImageUploadButton todoId={item.id} />
            <CircleUser size={16} className="cursor-pointer" />
            <EllipsisVertical size={16} className="cursor-pointer" />
          </div>
          <div className="absolute top-2 right-2">
            <Pin size={24} />
          </div>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
      {isOpened && (
        <div
          className="absolute max-w-full h-12 px-2 bg-zinc-900 flex items-center gap-2 rounded-xl z-10"
          ref={colorPaletteRef}
        >
          {bgColors.map(color => (
            <div
              className={`${color} h-3 w-3 lg:h-6 lg:w-6 rounded-full hover:border border-white cursor-pointer`}
              key={color}
              onClick={() => setBgColor(color)}
            />
          ))}
        </div>
      )}
    </Dialog>
  );
};

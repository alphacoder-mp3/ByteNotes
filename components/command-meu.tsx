'use client';

import * as React from 'react';
import useDebounce from '@/hooks/useDebounce';
import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { searchNotes } from '@/app/actions/search-notes';
import { ListingCard } from './card/listing-card';
import { getDarkModeColor, getLightModeColor } from '@/common/common';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { parseFormattedText } from '@/common/formatted-text';
import Image from 'next/image';
import { getCollaborators } from '@/app/actions/collaborate-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePic?: string | null;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Collaborator = {
  id: string;
  userId: string;
  todoId: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
  todoHistoryId: string | null;
  user: User;
};

type Note = {
  title: string;
  description: string;
  done: boolean;
  id: string;
  todoColor: string;
  updatedAt: Date;
  lastModifiedBy: string;
  user: {
    username: string;
  };
  images: {
    id: string;
    url: string;
  }[];
  collabs?: Collaborator[]; // Updated collabs type to match the shape
};

export function CommandMenu({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Note[]>([]);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Handle search with debouncing
  const handleSearch = useDebounce(async (query: string) => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const res = await searchNotes(query, userId);
    if (res.success) {
      // Fetch collaborators for each note
      const updatedResults: Note[] = await Promise.all(
        res.data.map(async item => {
          const { data: collabs, success } = await getCollaborators(item.id);
          return { ...item, collabs: success ? collabs : [] };
        })
      );
      setResults(updatedResults);
    } else {
      setResults([]);
    }
  }, 300);

  const handleInputChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search Your Notes...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setQuery('');
          setResults([]);
        }}
      >
        <CommandInput
          placeholder="Search your notes..."
          value={query}
          onValueChange={handleInputChange}
        />
        <CommandList>
          {results?.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            results.map((item: Note) => (
              <div key={item.id} className="px-4 py-2">
                <ListingCard
                  item={item}
                  userId={userId}
                  className={`relative mb-4 border dark:border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column group ${getLightModeColor(
                    item.todoColor
                  )} ${getDarkModeColor(item.todoColor)}`}
                  collabs={item.collabs as any}
                >
                  <CardHeader className="py-2 px-4">
                    {item.images?.map(image => (
                      <Image
                        src={image.url}
                        key={image.id}
                        alt="Image"
                        width={200}
                        height={200}
                        className="h-full w-full rounded"
                        priority={true}
                      />
                    ))}
                    <CardTitle className="font-bold text-lg break-words">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4 break-words">
                    {parseFormattedText(item.description)}
                  </CardContent>
                  <CardFooter className="mb-4">
                    {item.collabs
                      ?.filter(collab => collab.user.id !== userId)
                      .map(collab => (
                        <Avatar
                          key={collab.user.id}
                          className="flex items-center justify-center"
                        >
                          <AvatarImage
                            src={collab.user.profilePic as string}
                            alt="AS"
                            className="cursor-pointer w-7 h-7 rounded-full"
                            width={50}
                            height={50}
                          />
                          <AvatarFallback className="cursor-pointer w-7 h-7 p-2 shadow rounded-full dark:border border-gray-600 text-xs">
                            {collab.user?.firstName.charAt(0)}
                            {collab.user?.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                  </CardFooter>
                </ListingCard>
              </div>
            ))
          )}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

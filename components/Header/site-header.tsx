import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { CommandMenu } from '@/components/command-meu';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { GetUserInfo } from '@/app/page';
import prisma from '@/lib/db';
import { User } from '@prisma/client';

export async function SiteHeader() {
  const user = await GetUserInfo();
  const UserDetails: User | null = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* component if required here*/}
        <h1 className="hidden sm:block">
          Welcome {UserDetails?.firstName} {UserDetails?.lastName}!
        </h1>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0'
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0'
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
            <Link href={'/profile'}>
              <Avatar>
                <AvatarImage
                  src={UserDetails?.profilePic || ''}
                  alt="AS"
                  className="cursor-pointer h-9 w-9 mx-4 rounded-full"
                />
                <AvatarFallback className="cursor-pointer h-9 w-9 mx-4 rounded-full">
                  {UserDetails?.firstName.charAt(0)}
                  {UserDetails?.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

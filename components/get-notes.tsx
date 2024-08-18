'use server';
import { getTodo } from '@/app/actions/todo-actions';
// import { PaginateTodo } from '@/components/paginate-todo';
import { parseFormattedText } from '@/common/formatted-text';
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { ListingCard } from './card/listing-card';
import Image from 'next/image';
import { getLightModeColor, getDarkModeColor } from '@/common/common';
import { getCollaborators } from '@/app/actions/collaborate-actions';

const GetNotes = async ({
  userId,
  page,
}: {
  userId: string;
  page?: string;
}) => {
  const { todo, error, currentPage, totalPages, totalCount, message } =
    await getTodo(userId, page ? Number(page) : 1, 25);

  if (error) {
    <span> Error while fetching todos {message}</span>;
  }

  return (
    <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 mt-10">
      {todo &&
        todo.map(async item => {
          const { data: collabs, success } = await getCollaborators(item.id);

          return (
            <ListingCard
              key={item.id}
              item={item}
              userId={userId}
              className={`relative mb-4 border dark:border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column group ${getLightModeColor(
                item.todoColor
              )} ${getDarkModeColor(item.todoColor)}`}
              collabs={collabs}
            >
              <CardHeader className="py-2 px-4">
                {item.images?.map((item: any) => (
                  <Image
                    src={item.url}
                    key={item.id}
                    alt="Image"
                    width={200}
                    height={200}
                    className="h-full w-full rounded"
                    priority={true}
                  />
                ))}
                <CardTitle className="font-bold text-lg">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                {parseFormattedText(item.description)}
              </CardContent>
              <CardFooter className="mb-4">
                {collabs?.map(item => (
                  <Image
                    key={item.user.id}
                    src={item.user.profilePic || '/default-avatar.png'}
                    alt={item.user.username}
                    className="w-6 h-6 rounded-full"
                    height={50}
                    width={50}
                  />
                ))}
              </CardFooter>
            </ListingCard>
          );
        })}
    </section>
  );
};

export default GetNotes;

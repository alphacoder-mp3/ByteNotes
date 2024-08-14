'use server';
import { getTodo } from '@/app/actions/todo-actions';
// import { PaginateTodo } from '@/components/paginate-todo';
import { parseFormattedText } from '@/common/formatted-text';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListingCard } from './card/listing-card';
import Image from 'next/image';

const GetNotes = async ({
  user,
  page,
}: {
  user: { id: string; username: string };
  page?: string;
}) => {
  const { todo, error, currentPage, totalPages, totalCount, message } =
    await getTodo(user.id, page ? Number(page) : 1, 25);

  if (error) {
    <span> Error while fetching todos {message}</span>;
  }

  return (
    <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 mt-10">
      {todo &&
        todo.map(item => (
          <ListingCard
            key={item.id}
            item={item}
            userId={user.id}
            className={`relative mb-4 border border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column ${item.todoColor}`}
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
              <CardTitle className="font-bold text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 mb-8">
              {parseFormattedText(item.description)}
            </CardContent>
            {/* <CardFooter className="py-2 px-4 mb-8">
              <div
                className={`${
                  item.done ? 'bg-emerald-800' : 'bg-amber-800'
                } py-1 px-2 text-sm rounded-xl`}
              >
                {item.done ? 'Done' : 'Pending'}
              </div>
            </CardFooter> */}
          </ListingCard>
        ))}
    </section>
  );
};

export default GetNotes;
{
  /* <DeleteTodo id={item.id} userId={user.id} />

 <UpdateTodo item={item} userId={user.id} /> */
}

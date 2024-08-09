import { DeleteTodo } from './delete-todo';
import { UpdateTodo } from './update-todo';
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

const GetNotes = async ({
  user,
  page,
}: {
  user: { id: string; username: string };
  page?: string;
}) => {
  const { todo, error, currentPage, totalPages, totalCount, message } =
    await getTodo(user.id, page ? Number(page) : 1, 20);

  if (error) {
    <span> Error while fetching todos {message}</span>;
  }

  return (
    <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {todo &&
        todo.map(item => (
          <Card
            key={item.id}
            className={`mb-4 border border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 break-inside-avoid-column ${item.todoColor}`}
          >
            <CardHeader className="py-2 px-4">
              <CardTitle className="font-bold text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              {parseFormattedText(item.description)}
            </CardContent>
            <CardFooter className="py-2 px-4 mb-8">
              <div
                className={`${
                  item.done ? 'bg-emerald-800' : 'bg-amber-800'
                } py-1 px-2 text-sm rounded-xl`}
              >
                {item.done ? 'Done' : 'Pending'}
              </div>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
};

export default GetNotes;
{
  /* <DeleteTodo id={item.id} userId={user.id} />

 <UpdateTodo item={item} userId={user.id} /> */
}

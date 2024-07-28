import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteTodo } from './delete-todo';
import { UpdateTodo } from './update-todo';
import { getTodo } from '@/app/actions/todoactions';
import { PaginateTodo } from '@/components/paginate-todo';

const GetTodos = async ({
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
    <>
      <Table>
        <TableCaption>A list of {user.username} todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todo &&
            todo.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.done ? 'Done' : 'Pending'}</TableCell>
                <TableCell>{item.user.username}</TableCell>
                <TableCell>
                  <DeleteTodo id={item.id} userId={user.id} />
                </TableCell>
                <TableCell>
                  <UpdateTodo item={item} userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginateTodo totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};

export default GetTodos;

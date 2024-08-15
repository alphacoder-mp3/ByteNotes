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
import { getTodo } from '@/app/actions/todo-actions';
import { PaginateTodo } from '@/components/paginate-todo';
import { parseFormattedText } from '@/common/formatted-text';

const GetTodos = async ({
  userId,
  page,
}: {
  userId: string;
  page?: string;
}) => {
  const { todo, error, currentPage, totalPages, totalCount, message } =
    await getTodo(userId, page ? Number(page) : 1, 20);

  if (error) {
    <span> Error while fetching notes {message}</span>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of Notes.</TableCaption>
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
                <TableCell>{parseFormattedText(item.description)}</TableCell>
                <TableCell>{item.done ? 'Done' : 'Pending'}</TableCell>
                <TableCell>{item.user.username}</TableCell>
                <TableCell>
                  <DeleteTodo id={item.id} userId={userId} />
                </TableCell>
                <TableCell>
                  <UpdateTodo item={item} userId={userId} />
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

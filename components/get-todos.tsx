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

const GetTodos = async ({
  user,
}: {
  user: { id: string; username: string };
}) => {
  const { todo, error } = await getTodo(user.id);

  if (error) {
    <span> Error while fetching todos</span>;
  }

  return (
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
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
  );
};

export default GetTodos;

import CreateTodo from '@/components/createtodo';
import prisma from '@/lib/db';

export default async function Home() {
  const myTODO = await prisma.todo.findMany({
    where: {
      id: 'clyx67qx00001wyma4rqa3ynf',
    },
    select: {
      title: true,
      description: true,
      done: true,
      User: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return (
    <div className="container mx-auto p-4 max-h-screen w-full">
      MY OBJ:
      <div className="max-w-sm">{JSON.stringify(myTODO)}</div>
      <h1 className="text-2xl font-bold mb-4">Create a New Todo</h1>
      <CreateTodo />
    </div>
  );
}

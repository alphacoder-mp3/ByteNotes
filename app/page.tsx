import CreateTodo from '@/components/create-todo';
import GetTodos from '@/components/get-todos';
import { useServerSession } from '@/lib/useServerSession';

export default async function Home() {
  const { user } = await useServerSession();

  return (
    <div className="container mx-auto p-4 m-12 max-h-screen w-full">
      <GetTodos user={user} />
      <h1 className="text-2xl font-bold mb-4 mt-8">Create a New Todo</h1>
      <CreateTodo user={user} />
    </div>
  );
}

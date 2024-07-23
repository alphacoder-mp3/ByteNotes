import CreateTodo from '@/components/create-todo';
import GetTodos from '@/components/get-todos';

export default async function Home() {
  return (
    <div className="container mx-auto p-4 m-6 max-h-screen w-full">
      <GetTodos />
      <h1 className="text-2xl font-bold mb-4 mt-8">Create a New Todo</h1>
      <CreateTodo />
    </div>
  );
}

import CreateNotes from '@/components/create-notes';
// import CreateTodo from '@/components/create-todo';
import GetNotes from '@/components/get-notes';
import { useServerSession } from '@/lib/useServerSession';

export default async function Home() {
  const { user } = await useServerSession();

  return (
    <div className="container mx-auto p-4 m-12 max-h-screen w-full">
      {/* <h1 className="text-2xl font-bold mb-4 mt-8">Create a New Todo</h1> */}
      {/* <CreateTodo user={user} /> */}
      <CreateNotes user={user} />
      <GetNotes user={user} />
    </div>
  );
}

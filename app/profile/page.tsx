import { User } from '@prisma/client';
import ProfilePicUpload from '@/components/profile-pic-upload';
import Image from 'next/image';
import { useServerSession } from '@/hooks/useServerSession';
import { GetUserDetails } from '@/common/get-user-details';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';

export default async function ProfilePage() {
  const userId = await useServerSession();
  if (!userId) return;

  const { data: UserDetails } = (await GetUserDetails(userId)) as {
    data: User;
  };

  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <Link href="/">
        <Button className=" flex justify-center items-center bg-violet-400 px-2 py-1 rounded-md gap-1">
          <Home size={20} /> Home
        </Button>
      </Link>

      <h1 className="m-4">Profile</h1>
      <div className="m-4">
        {!UserDetails?.profilePic && 'Add your profile picture here'}
      </div>

      {UserDetails?.profilePic && (
        <div className="rounded-full border-violet-600 border-8 overflow-hidden w-40 h-40 mb-4">
          <Image
            src={UserDetails.profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            height={200}
            width={200}
            priority={true}
          />
        </div>
      )}

      <ProfilePicUpload userId={userId} />
      <p className="p-4">@{UserDetails?.username}</p>
      {/* <p>Created At: {UserDetails?.createdAt?.toLocaleString()}</p>
      <p>Last Updated: {UserDetails?.updatedAt?.toLocaleString()}</p> */}
      <SignOutButton />
    </div>
  );
}

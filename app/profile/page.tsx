import prisma from '@/lib/db';
import { User } from '@prisma/client';
import ProfilePicUpload from '@/components/profile-pic-upload';
import Image from 'next/image';
import { GetUserInfo } from '@/app/page';

export default async function ProfilePage() {
  const userId = await GetUserInfo();
  if (!userId) return;

  const UserDetails: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <h1 className="m-4">Profile</h1>
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
      <p className="p-4">Username: {UserDetails?.username}</p>
      <p>
        Name: {UserDetails?.firstName} {UserDetails?.lastName}
      </p>
      <p>Created At: {UserDetails?.createdAt?.toLocaleString()}</p>
      <p>Last Updated: {UserDetails?.updatedAt?.toLocaleString()}</p>
    </div>
  );
}

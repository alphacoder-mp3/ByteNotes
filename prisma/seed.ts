// prisma/seed.js

import bcrypt from 'bcryptjs';

import prisma from '@/lib/db';

async function main() {
  // Create users
  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { username: 'john.doe' },
    update: {},
    create: {
      username: 'john.doe',
      password: password,
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'jane.smith' },
    update: {},
    create: {
      username: 'jane.smith',
      password: password,
      firstName: 'Jane',
      lastName: 'Smith',
    },
  });

  // Create todos
  await prisma.todo.createMany({
    data: [
      {
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        userId: user1.id,
      },
      {
        title: 'Finish project',
        description: 'Complete the React component',
        userId: user1.id,
      },
      {
        title: 'Go to gym',
        description: 'Cardio and strength training',
        userId: user2.id,
      },
      {
        title: 'Read a book',
        description: 'Start reading "The Great Gatsby"',
        userId: user2.id,
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

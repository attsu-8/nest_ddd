import {
  BacklogItem,
  PrismaClient,
  ProductBacklog,
  Task,
  User,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

/*
  Users
 */
const taro: User = {
  id: uuidv4(),
  name: '太郎',
};

const hanako: User = {
  id: uuidv4(),
  name: '花子',
};

const pochi: User = {
  id: uuidv4(),
  name: 'ポチ',
};

/*
  ProductBacklogs
 */
const productA: ProductBacklog = {
  id: uuidv4(),
  name: 'productA',
  description: 'ProductA description',
  productOwnerId: taro.id,
};

/*
  BacklogItems
 */
const productABacklogItem1: BacklogItem = {
  id: uuidv4(),
  story: 'story1',
  storyPoint: 1,
  backlogItemPriority: 1,
  description: 'description1',
  productBacklogId: productA.id,
};
const productABacklogItem2: BacklogItem = {
  id: uuidv4(),
  story: 'story2',
  storyPoint: 2,
  backlogItemPriority: 2,
  description: 'description2',
  productBacklogId: productA.id,
};
const productABacklogItem3: BacklogItem = {
  id: uuidv4(),
  story: 'story3',
  storyPoint: 3,
  backlogItemPriority: 3,
  description: 'description3',
  productBacklogId: productA.id,
};
const productABacklogItem4: BacklogItem = {
  id: uuidv4(),
  story: 'story4',
  storyPoint: 1,
  backlogItemPriority: 4,
  description: 'description4',
  productBacklogId: productA.id,
};
const productABacklogItem5: BacklogItem = {
  id: uuidv4(),
  story: 'story5',
  storyPoint: 5,
  backlogItemPriority: 5,
  description: 'description5',
  productBacklogId: productA.id,
};

/*
  Tasks
 */
const productABacklogItem1Task1: Task = {
  id: uuidv4(),
  name: 'nameA_1_1',
  description: 'taskA_1_1',
  deadline: DateTime.local(2020, 1, 1).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem1.id,
  userId: taro.id,
};
const productABacklogItem1Task2: Task = {
  id: uuidv4(),
  name: 'nameA_1_2',
  description: 'taskA_1_2',
  deadline: DateTime.local(2020, 1, 2).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem1.id,
  userId: taro.id,
};
const productABacklogItem2Task1: Task = {
  id: uuidv4(),
  name: 'nameA_2_1',
  description: 'taskA_2_1',
  deadline: DateTime.local(2020, 1, 1).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem2.id,
  userId: hanako.id,
};
const productABacklogItem2Task2: Task = {
  id: uuidv4(),
  name: 'nameA_2_2',
  description: 'taskA_2_2',
  deadline: DateTime.local(2020, 1, 2).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem2.id,
  userId: hanako.id,
};
const productABacklogItem2Task3: Task = {
  id: uuidv4(),
  name: 'nameA_2_3',
  description: 'taskA_2_3',
  deadline: DateTime.local(2020, 1, 2).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem2.id,
  userId: hanako.id,
};
const productABacklogItem3Task1: Task = {
  id: uuidv4(),
  name: 'nameA_3_1',
  description: 'taskA_3_1',
  deadline: DateTime.local(2020, 1, 1).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem3.id,
  userId: pochi.id,
};
const productABacklogItem4Task1: Task = {
  id: uuidv4(),
  name: 'nameA_4_1',
  description: 'taskA_4_1',
  deadline: DateTime.local(2020, 1, 1).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem4.id,
  userId: pochi.id,
};
const productABacklogItem5Task1: Task = {
  id: uuidv4(),
  name: 'nameA_5_1',
  description: 'taskA_5_1',
  deadline: DateTime.local(2020, 1, 1).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem5.id,
  userId: hanako.id,
};
const productABacklogItem5Task2: Task = {
  id: uuidv4(),
  name: 'nameA_5_2',
  description: 'taskA_5_2',
  deadline: DateTime.local(2020, 1, 2).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem5.id,
  userId: hanako.id,
};
const productABacklogItem5Task3: Task = {
  id: uuidv4(),
  name: 'nameA_5_3',
  description: 'taskA_5_3',
  deadline: DateTime.local(2020, 1, 2).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem5.id,
  userId: hanako.id,
};
const productABacklogItem5Task4: Task = {
  id: uuidv4(),
  name: 'nameA_5_4',
  description: 'taskA_5_4',
  deadline: DateTime.local(2020, 1, 3).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem5.id,
  userId: hanako.id,
};
const productABacklogItem5Task5: Task = {
  id: uuidv4(),
  name: 'nameA_5_5',
  description: 'taskA_5_5',
  deadline: DateTime.local(2020, 1, 4).toJSDate(),
  status: 1,
  backlogItemId: productABacklogItem5.id,
  userId: hanako.id,
};

const main = async () => {
  await prisma.user.createMany({
    data: [taro, hanako, pochi],
  });

  await prisma.productBacklog.createMany({
    data: [productA],
  });

  await prisma.backlogItem.createMany({
    data: [
      productABacklogItem1,
      productABacklogItem2,
      productABacklogItem3,
      productABacklogItem4,
      productABacklogItem5,
    ],
  });

  await prisma.task.createMany({
    data: [
      productABacklogItem1Task1,
      productABacklogItem1Task2,
      productABacklogItem2Task1,
      productABacklogItem2Task2,
      productABacklogItem2Task3,
      productABacklogItem3Task1,
      productABacklogItem4Task1,
      productABacklogItem5Task1,
      productABacklogItem5Task2,
      productABacklogItem5Task3,
      productABacklogItem5Task4,
      productABacklogItem5Task5,
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

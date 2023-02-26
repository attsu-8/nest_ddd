import { Injectable } from '@nestjs/common';
import { BacklogItemEntity } from 'src/core/backlogItem/domain/BacklogItemEntiry';
import { BacklogItemRepositoryPort } from 'src/core/backlogItem/port/secondary/BacklogItemRepositoryPort';
import { ResultSucceeded, ResultType } from '../../../../../shared/Result';

@Injectable()
export class BacklogItemInMemoryRepositoryAdapter
  implements BacklogItemRepositoryPort
{
  // Mock.
  private backlogItems: BacklogItemEntity[] = [
    BacklogItemEntity.create({
      id: '1',
      story: 'story',
      storyPoint: 1,
      backlogItemPriority: 1,
      productBacklogId: 'hge',
      description: 'hoge',
      tasks: [],
    }).unwrap(),
  ];

  async findAll(): Promise<ResultType<BacklogItemEntity[], Error>> {
    return new ResultSucceeded([]);
  }

  async findOneById(id: string): Promise<ResultType<BacklogItemEntity, Error>> {
    return new ResultSucceeded({} as BacklogItemEntity);
  }

  async store(
    backlogItemEntity: BacklogItemEntity,
  ): Promise<ResultType<string, Error>> {
    this.backlogItems.push(backlogItemEntity);

    this.backlogItems.map((item) => {
      console.log(item.id);
    });

    return new ResultSucceeded('1');
  }

  async delete(id: string): Promise<ResultType<string, Error>> {
    return new ResultSucceeded('');
  }
}

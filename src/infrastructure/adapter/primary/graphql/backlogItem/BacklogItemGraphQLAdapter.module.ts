import { Module } from '@nestjs/common';
import { BacklogItemModule } from 'src/core/backlogItem/BacklogItem.module';
import { BacklogItemResolver } from './resolver/BacklogItem.resolver';

@Module({
  imports: [BacklogItemModule],
  providers: [BacklogItemResolver],
})
export class BacklogItemGraphQLAdapterModule {}

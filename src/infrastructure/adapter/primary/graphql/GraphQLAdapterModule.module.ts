import { Module } from '@nestjs/common';
import { BacklogItemModule } from 'src/core/backlogItem/BacklogItem.module';
import { ProductBacklogModule } from 'src/core/productBacklog/ProductBacklog.module';
import { UserModule } from 'src/core/user/User.module';
import { BacklogItemGraphQLAdapterModule } from './backlogItem/BacklogItemGraphQLAdapter.module';
import { ProductBacklogGraphQLAdapterModule } from './productBacklog/ProductBacklogGraphQLAdapter.module';
import { UserGraphQLAdapterModule } from './user/UserGraphQLAdapter.module';

@Module({
  imports: [
    BacklogItemModule,
    UserModule,
    ProductBacklogModule,
    BacklogItemGraphQLAdapterModule,
    ProductBacklogGraphQLAdapterModule,
    UserGraphQLAdapterModule,
  ],
})
export class GraphQLAdapterModule {}

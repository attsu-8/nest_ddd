import { Module } from '@nestjs/common';
import { BacklogItemModule } from 'src/core/backlogItem/BacklogItem.module';
import { ProductBacklogModule } from 'src/core/productBacklog/ProductBacklog.module';
import { UserModule } from 'src/core/user/User.module';
import { BacklogItemResolver } from './resolvers/BacklogItem.resolver';
import { ProductBacklogResolver } from './resolvers/ProductBacklog.resolver';
import { UserResolver } from './resolvers/User.resolver';
// import { TaskResolver } from './resolvers/Task.resolver';

@Module({
  imports: [BacklogItemModule, UserModule, ProductBacklogModule],
  providers: [BacklogItemResolver, UserResolver, ProductBacklogResolver],
})
export class GraphQLAdapterModule {}

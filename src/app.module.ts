import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BacklogItemModule } from './core/backlogItem/BacklogItem.module';
import { ProductBacklogModule } from './core/productBacklog/ProductBacklog.module';
import { UserModule } from './core/user/User.module';
import { BacklogItemGraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/backlogItem/BacklogItemGraphQLAdapter.module';
import { ProductBacklogGraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/productBacklog/ProductBacklogGraphQLAdapter.module';
import { UserGraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/user/UserGraphQLAdapter.module';
import { PrismaAdapterModule } from './infrastructure/adapter/secondary/database/prisma/PrismaAdapter.module';

@Module({
  imports: [
    /* Core */
    BacklogItemModule,
    ProductBacklogModule,
    UserModule,

    /* Primary Adapter */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(
        process.cwd(),
        'src/infrastructure/adapter/primary/graphql/schema.gql',
      ),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    BacklogItemGraphQLAdapterModule,
    ProductBacklogGraphQLAdapterModule,
    UserGraphQLAdapterModule,

    /* Secondary Adapter */
    PrismaAdapterModule,
  ],
})
export class AppModule {}

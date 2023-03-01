import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BacklogItemModule } from './core/backlogItem/BacklogItem.module';
import { ProductBacklogModule } from './core/productBacklog/ProductBacklog.module';
import { UserModule } from './core/user/User.module';
import { GraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/GraphQLAdapterModule.module';
import { PrismaAdapterModule } from './infrastructure/adapter/secondary/database/prisma/PrismaAdapter.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(
        process.cwd(),
        'src/infrastructure/adapter/primary/graphql/schema.gql',
      ),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    PrismaAdapterModule,
    BacklogItemModule,
    ProductBacklogModule,
    UserModule,
    GraphQLAdapterModule,
  ],
})
export class AppModule {}

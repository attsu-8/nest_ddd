import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BacklogItemDomainModule } from './core/backlogItem/BacklogItemDomain.module';
import { GraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/GraphQLAdapterModule.module';
import { RepositoryAdapterModule } from './infrastructure/adapter/secondary/repository/RepositoryAdapter.module';

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
    RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE),
    BacklogItemDomainModule,
    GraphQLAdapterModule,
  ],
  // controllers: [TaskController],
})
export class AppModule {}

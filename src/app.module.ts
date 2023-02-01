import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaskDomainModule } from './core/task/TaskDomain.module';
import { GraphQLAdapterModule } from './infrastructure/adapter/primary/graphql/GraphQLAdapterModule.module';
import { TaskController } from './infrastructure/adapter/primary/rest/controller/Task.controller';
import { FactoryAdapterModule } from './infrastructure/adapter/secondary/factory/FactoryAdapter.module';
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
    FactoryAdapterModule,
    TaskDomainModule,
    GraphQLAdapterModule,
  ],
  controllers: [TaskController],
})
export class AppModule {}

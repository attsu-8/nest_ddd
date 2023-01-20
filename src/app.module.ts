import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TaskUseCaseModule } from './core/application/task/useCase/TaskUseCase.module';
import { TaskDomainServiceModule } from './core/domain/task/service/TaskDomainService.module';
import { TaskModule } from './infrastructure/adapter/primary/graphql/TaskModule.module';
import { TaskController } from './infrastructure/adapter/primary/rest/controller/Task.controller';
import { FactoryModule } from './infrastructure/adapter/secondary/factory/Factory.module';
import { RepositoryModule } from './infrastructure/adapter/secondary/repository/Repository.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
    FactoryModule,
    TaskUseCaseModule,
    TaskDomainServiceModule,
    TaskModule,
  ],
  controllers: [TaskController],
})
export class AppModule {}

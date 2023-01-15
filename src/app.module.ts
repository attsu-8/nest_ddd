// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CreateTaskUseCase } from './core/application/useCase/CreateTaskUseCase';
import { GetAllTasksUseCase } from './core/application/useCase/GetAllTasksUseCase';
import { DuplicateTaskChecker } from './core/domain/task/service/DuplicateTaskChecker';
import { TaskController } from './infrastructure/adapter/primary/rest/controller/Task.controller';
import { NewTaskCreatorAdapter } from './infrastructure/adapter/secondary/factory/NewTaskCreatorAdapter';
import { RepositoryModule } from './infrastructure/adapter/secondary/repository/RepositoryModule';
// import { PrismaService } from './prisma.service';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
  ],
  controllers: [TaskController],
  // providers: [AppService, PrismaService, PostsResolver],
  providers: [
    NewTaskCreatorAdapter,
    DuplicateTaskChecker,
    CreateTaskUseCase,
    GetAllTasksUseCase,
  ],
})
export class AppModule {}

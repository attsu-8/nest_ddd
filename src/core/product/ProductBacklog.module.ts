import { Module, Provider } from '@nestjs/common';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateProductBacklogUseCase } from './application/CreateProductBacklogUseCase';
import { GetProductBacklogsUseCase } from './application/GetProductBacklogsUseCase';
import { CreateProductBacklogPort } from './port/primary/CreateProductBacklogPort';
import { GetProductBacklogsPort } from './port/primary/GetProductBacklogsUseCasePort';

const useCaseProviders: Provider<
  CreateProductBacklogPort | GetProductBacklogsPort
>[] = [
  {
    provide: CreateProductBacklogPort,
    useClass: CreateProductBacklogUseCase,
  },
  {
    provide: GetProductBacklogsPort,
    useClass: GetProductBacklogsUseCase,
  },
];

@Module({
  imports: [RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class ProductBacklogModule {}

import { Module, Provider } from '@nestjs/common';
import { RepositoryAdapterModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryAdapter.module';
import { CreateProductBacklogUseCase } from './application/CreateProductBacklogUseCase';
import { DeleteProductBacklogUseCase } from './application/DeleteProductBacklogUseCase';
import { GetProductBacklogsUseCase } from './application/GetProductBacklogsUseCase';
import { UpdateProductBacklogUseCase } from './application/UpdateProductBacklogUseCase';
import { CreateProductBacklogPort } from './port/primary/CreateProductBacklogPort';
import { DeleteProductBacklogPort } from './port/primary/DeleteProductBacklogPort';
import { GetProductBacklogsPort } from './port/primary/GetProductBacklogsPort';
import { UpdateProductBacklogPort } from './port/primary/UpdateProductBacklogPort';

const useCaseProviders: Provider<
  | CreateProductBacklogPort
  | GetProductBacklogsPort
  | UpdateProductBacklogPort
  | DeleteProductBacklogPort
>[] = [
  {
    provide: CreateProductBacklogPort,
    useClass: CreateProductBacklogUseCase,
  },
  {
    provide: GetProductBacklogsPort,
    useClass: GetProductBacklogsUseCase,
  },
  {
    provide: UpdateProductBacklogPort,
    useClass: UpdateProductBacklogUseCase,
  },
  {
    provide: DeleteProductBacklogPort,
    useClass: DeleteProductBacklogUseCase,
  },
];

@Module({
  imports: [RepositoryAdapterModule.register(process.env.REPOSITORY_TYPE)],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class ProductBacklogModule {}

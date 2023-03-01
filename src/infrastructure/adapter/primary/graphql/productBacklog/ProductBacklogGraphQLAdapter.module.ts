import { Module } from '@nestjs/common';
import { ProductBacklogModule } from 'src/core/productBacklog/ProductBacklog.module';
import { ProductBacklogResolver } from './resolver/ProductBacklog.resolver';

@Module({
  imports: [ProductBacklogModule],
  providers: [ProductBacklogResolver],
})
export class ProductBacklogGraphQLAdapterModule {}

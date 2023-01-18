import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/adapter/secondary/repository/Repository.module';
import { DuplicateTaskChecker } from './DuplicateTaskChecker';

@Module({
  imports: [RepositoryModule.register(process.env.REPOSITORY_TYPE)],
  providers: [DuplicateTaskChecker],
  exports: [DuplicateTaskChecker],
})
export class TaskDomainServiceModule {}

import { Module } from '@nestjs/common';
import { DuplicateTaskChecker } from 'src/core/domain/task/service/DuplicateTaskChecker';
import { FactoryModule } from 'src/infrastructure/adapter/secondary/factory/FactoryModule';
import { RepositoryModule } from 'src/infrastructure/adapter/secondary/repository/RepositoryModule';
// import { Repository } from 'typeorm';
import ControllerProviders from './ControllerProviders';

@Module({
  imports: [
    FactoryModule,
    RepositoryModule.register(process.env.REPOSITORY_TYPE),
  ],
  providers: [...ControllerProviders, DuplicateTaskChecker],
  exports: [...ControllerProviders],
})
export class ControllerModule {}

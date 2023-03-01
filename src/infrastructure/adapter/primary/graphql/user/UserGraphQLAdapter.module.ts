import { Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/User.module';
import { UserResolver } from './resolver/User.resolver';

@Module({
  imports: [UserModule],
  providers: [UserResolver],
})
export class UserGraphQLAdapterModule {}

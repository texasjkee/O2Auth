import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IS_DEV_ENV } from "./libs/common/utils/is-dev.util";
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !IS_DEV_ENV
    }),
    UserModule
  ],
  controllers: [UserController]
})

export class AppModule { }
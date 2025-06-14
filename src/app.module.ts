import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.utils';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally ],
    ignoreEnvFile:!IS_DEV_ENV, // Ignores .env file in production
    envFilePath: IS_DEV_ENV ? '.env' : '.env.production', // Loads different .env files based on the environment
  }),
  PrismaModule,
  UsersModule
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

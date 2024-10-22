import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forRoot(''),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI")
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ChattingModule } from './chatting/chatting.module';
import { MongoConfigService } from './config/mongo.config';
import { TypeOrmConfigService } from './config/postgresql.config';
import { EventModule } from './event/event.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserModule } from './user/user.module';
import { DynamicPriceModule } from './dynamic-price/dynamic-price.module';
import { TourTicketModule } from './tour-ticket/tour-ticket.module';
import { MongoClientProvider } from './config/mongo.client.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoConfigService,
    }),
    ReviewModule,
    ReservationModule,
    EventModule,
    ProductModule,
    ChattingModule,
    AuthModule,
    UserModule,
    DynamicPriceModule,
    TourTicketModule,
  ],
  controllers: [],
  providers: [MongoClientProvider],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

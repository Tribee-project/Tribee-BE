import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      timezone: 'Asia/Seoul'
    };
  }
}

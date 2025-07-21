import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('SUPABASE_HOST'),
      port: this.configService.get<number>('SUPABASE_PORT'),
      username: this.configService.get<string>('SUPABASE_USER'),
      password: this.configService.get<string>('SUPABASE_PASSWORD'),
      database: this.configService.get<string>('SUPABASE_DATABASE'),
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: false,
      autoLoadEntities: true,

      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}

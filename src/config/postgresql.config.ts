import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres', // ✅ 변경된 부분
      host: this.configService.get<string>('SUPABASE_HOST'),
      port: this.configService.get<number>('SUPABASE_PORT'),
      username: this.configService.get<string>('SUPABASE_USER'),
      password: this.configService.get<string>('SUPABASE_PASSWORD'),
      database: this.configService.get<string>('SUPABASE_DATABASE'),
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,

      // ✅ Supabase는 SSL 사용 필수
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}

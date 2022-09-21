// @ts-ignore

import '../providers/polyfill.provider';

import { SnakeNamingStrategy } from "utils/strategies";
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from "typeorm";

const configService = new ConfigService();

export const config : DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*{.entity,.index}{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
};

export const dataSource = new DataSource(config);

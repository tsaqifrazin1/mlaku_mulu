import 'providers/polyfill.provider';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'utils/strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { contextMiddleware } from 'middlewares';
import configuration from "../../config/configuration";
import { UserModule } from "modules/user";
import { AuthModule } from "modules/auth";
import { SharedModule } from "modules/shared";
import { UserSubscriber } from "modules/user/subscribers";
import { CustomerModule } from "modules/customer";
import { CustomerTripModule } from "modules/customers_trip";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    AuthModule,
    CustomerModule,
    CustomerTripModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        migrationsRun: configService.get('runMigrations'),
        synchronize: configService.get('synchronize'),
        subscribers: [UserSubscriber],
        logging: true,
        logger: 'file',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}

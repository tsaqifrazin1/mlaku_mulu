import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const providers = [];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypesModule } from './types/types.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { DescriptorsModule } from './descriptors/descriptors.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        dbName: configService.get<string>('MONGO_DB_NAME'),
      }),
    }),
    ProfileModule,
    DescriptorsModule,
    PackagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

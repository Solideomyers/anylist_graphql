import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ListsModule } from './lists/lists.module';
import { ListItemModule } from './list-item/list-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context({ req }) {
          // const token = req.headers.authorization?.replace('Bearer ', '');
          // if (!token) throw Error('Token needed');
          // const payload = jwtService.decode(token);
          // if (!payload) throw Error('Token not valid');
        },
      }),
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      ssl:
        process.env.STATE === 'prod'
          ? { rejectUnauthorized: false }
          : { rejectUnauthorized: true },
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),

    ItemsModule,

    UsersModule,

    AuthModule,

    SeedModule,

    CommonModule,

    ListsModule,

    ListItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

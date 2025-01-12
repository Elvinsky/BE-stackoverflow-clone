import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      password: 'password',
      username: 'user',
      database: 'mydb',
      migrations: [__dirname + '/migrations/*.ts'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesModule } from './entities/votes/votes.module';
import { UsersModule } from './entities/users/users.module';
import { TagsModule } from './entities/tags/tags.module';
import { QuestionsModule } from './entities/questions/questions.module';
import { AnswersModule } from './entities/answers/answers.module';

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
      synchronize: false,
      migrationsRun: true,
    }),
    VotesModule,
    UsersModule,
    TagsModule,
    QuestionsModule,
    AnswersModule,
  ],
})
export class AppModule {}

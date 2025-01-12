import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesAndSeedData1673542843940
  implements MigrationInterface
{
  name = 'CreateTablesAndSeedData1673542843940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(50) NOT NULL UNIQUE,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "role" ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "questions" (
        "id" SERIAL PRIMARY KEY,
        "author_id" INT NOT NULL,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT NOT NULL,
        "rating" INT DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "answers" (
        "id" SERIAL PRIMARY KEY,
        "question_id" INT NOT NULL,
        "author_id" INT NOT NULL,
        "text" TEXT NOT NULL,
        "rating" INT DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE,
        FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "tags" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL UNIQUE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "question_tags" (
        "question_id" INT NOT NULL,
        "tag_id" INT NOT NULL,
        PRIMARY KEY ("question_id", "tag_id"),
        FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE,
        FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "votes" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT NOT NULL,
        "type" ENUM('question', 'answer') NOT NULL,
        "vote_value" TINYINT NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CHECK ("vote_value" IN (1, -1))
      )
    `);

    const adminResult = await queryRunner.query(`
      INSERT INTO "users" ("username", "email", "role") 
      VALUES ('admin', 'admin@example.com', 'admin') 
      RETURNING "id"
    `);
    const adminId = adminResult[0].id;

    await queryRunner.query(`
      INSERT INTO "users" ("username", "email", "role") 
      VALUES 
        ('user1', 'user1@example.com', 'user'),
        ('user2', 'user2@example.com', 'user')
    `);

    const tagResult = await queryRunner.query(`
      INSERT INTO "tags" ("name") 
      VALUES 
        ('JavaScript'), 
        ('TypeScript'), 
        ('NestJS'), 
        ('PostgreSQL')
      RETURNING "id"
    `);
    const [jsTag, nestjsTag, postgresTag] = tagResult;

    const questionResult = await queryRunner.query(`
      INSERT INTO "questions" ("author_id", "title", "description") 
      VALUES 
        (${adminId}, 'How to use NestJS?', 'I am trying to use NestJS in my project and need some help with the setup'),
        (${adminId}, 'How to connect PostgreSQL with NestJS?', 'What are the steps to set up PostgreSQL in NestJS?')
      RETURNING "id"
    `);
    const [firstQuestion, secondQuestion] = questionResult;

    await queryRunner.query(`
      INSERT INTO "answers" ("question_id", "author_id", "text") 
      VALUES 
        (${firstQuestion.id}, ${adminId}, 'NestJS setup is simple, just follow the official documentation'),
        (${secondQuestion.id}, ${adminId}, 'You need to install TypeORM and configure your database connection')
    `);

    await queryRunner.query(`
      INSERT INTO "question_tags" ("question_id", "tag_id") 
      VALUES 
        (${firstQuestion.id}, ${jsTag.id}),
        (${firstQuestion.id}, ${nestjsTag.id}),
        (${secondQuestion.id}, ${postgresTag.id}),
        (${secondQuestion.id}, ${nestjsTag.id})
    `);

    await queryRunner.query(`
      INSERT INTO "votes" ("user_id", "type", "vote_value", "question_id") 
      VALUES 
        (${adminId}, 'question', 1, ${firstQuestion.id}),
        (${adminId}, 'question', -1, ${secondQuestion.id}),
        (${adminId}, 'answer', 1, ${firstQuestion.id})
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "votes"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "question_tags"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tags"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "answers"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "questions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
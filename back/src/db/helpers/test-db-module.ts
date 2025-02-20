import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { UserEntity } from '../entities/users.entity'
import { ClientEntity } from '../entities/client.entity'
dotenv.config({ path: '.env' })

export const TestDatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT!),
  database: String(process.env.DATABASE_TEST_NAME),
  username: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  synchronize: true,
  logging: false,
  entities: [ClientEntity, UserEntity]
})

import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { UserEntity } from '../entities/users.entity'
import { ClientEntity } from '../entities/client.entity'
dotenv.config({ path: '.env' })

export const TestDatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  database: 'teddy_test',
  port: parseInt(process.env.DATABASE_PORT!),
  username: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  synchronize: true,
  logging: false,
  entities: [ClientEntity, UserEntity]
})

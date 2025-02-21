import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { UserEntity } from '../entities/users.entity'
import { ClientEntity } from '../entities/client.entity'
dotenv.config({ path: '.env' })

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.DATABASE_PORT!),
  password: String(process.env.DATABASE_PASSWORD),
  username: String(process.env.DATABASE_USER),
  database: String(process.env.DATABASE_NAME),
  synchronize: true,
  logging: false,
  entities: [ClientEntity, UserEntity]
})

import { UserDTO } from '@/core/dtos'
import { UserEntity } from '@/db/entities/users.entity'
import {
  DataSource,
  DeepPartial,
  DeleteResult,
  Repository,
  UpdateResult
} from 'typeorm'

export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager())
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.findOneBy({ id })
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOneBy({ email: email.toLowerCase() })
  }

  async createUser(user?: DeepPartial<UserEntity>): Promise<UserEntity> {
    if (!user) {
      throw new Error('User is required')
    }
    return this.save(user)
  }

  async updateUser(
    id: number,
    user: Partial<UserEntity>
  ): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .execute()
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.delete(id)
  }

  async wipe(): Promise<void> {
    await this.clear()
    await this.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`)
  }
}

export interface IUserRepository extends Repository<UserEntity> {
  findById(id: number): Promise<UserEntity | null>
  createUser(user: Partial<UserEntity>): Promise<UserEntity>
  updateUser(id: number, user: Partial<UserEntity>): Promise<UpdateResult>
  delete(id: number): Promise<DeleteResult>
}

export type NullableUserDTO = UserDTO | null

export type UserRepositoryHelperInput = {
  id: number
  name: string
}

export const UserRepositoryProvider = {
  provide: UserRepository,
  useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
  inject: [DataSource]
}

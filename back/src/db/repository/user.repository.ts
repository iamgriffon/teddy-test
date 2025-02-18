import { UserDTO } from '@/core/dtos'
import { UserEntity } from '@/db/entities/users.entity'
import { DataSource, DeepPartial, Repository, UpdateResult } from 'typeorm'

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

  async createUser(user?: DeepPartial<UserEntity>): Promise<UserEntity> {
    if (!user) {
      throw new Error('User is required')
    }
    return this.save(user)
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UpdateResult> {
    return this.update(id, user)
  }
}

export interface IUserRepository {
  findById(id: number): Promise<UserEntity | null>
  createUser(user: Partial<UserEntity>): Promise<UserEntity>
  update(id: number, user: Partial<UserEntity>): Promise<UpdateResult>
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

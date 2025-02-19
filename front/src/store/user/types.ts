import { UserDTO } from 'dtos/userDTO'

export type UserStore = {
  user?: UserDTO
  setUser: (user: UserDTO) => void
  clearUser: () => void
}

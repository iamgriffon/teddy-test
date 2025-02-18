export type UserStore = {
  user?: string
  setUser: (user: string) => void
  clearUser: () => void
}

export type User = {
  id: number
  username: string
  email: string
  sex: boolean
  age: number
  desc: string
}

const _t = <T>(t: number, v?: T): Promise<T | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(v), t)
  })
}

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem('users') ?? '[]')
  } catch (error) {
    return []
  }
}

function setUsers(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users))
  return users
}

function addUser(user: User) {
  const users = JSON.parse(localStorage.getItem('users') ?? '[]') as User[]
  if (!users.some((i) => i.id === user.id)) {
    users.unshift(user)
    console.log('create user')
    setUsers(users)
  }
  return user
}

function deleteUser(id: number) {
  try {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]') as User[]
    const index = users.findIndex((i) => i.id === id)
    if (index > -1) {
      users.splice(index, 1)
      console.log('del user')
      setUsers(users)
      return true
    }
  } catch (error) {
    return false
  }
}

class DataSource {
  async add(user: Omit<User, 'id'>) {
    await _t(500)
    const id = Date.now()
    const users = getUsers()
    if (users.some((i) => i.username === user.username)) {
      throw new Error('用户名重复')
    }
    return addUser({ ...user, id })
  }
  async del(id: number) {
    await _t(500)
    return deleteUser(id)
  }
  async update(id: number, user: Partial<Omit<User, 'id'>>) {
    await _t(500)
    const users = getUsers()
    const index = users.findIndex((i) => i.id === id)
    if (index > -1) {
      users[index] = {
        ...users[index],
        ...user,
      }
      console.log('update user')
      setUsers(users)
    }
    return users[index]
  }
  async findOneId(id: number) {
    await _t(500)
    const users = getUsers()
    const user = users.find((i) => i.id === id)
    console.log('get user')
    if (user) {
      return user
    }
    throw new Error('用户不存在')
  }
  async finPagedList(data: { username?: string; page: number; pageSize: number }) {
    const { username, page, pageSize } = data
    await _t(500)
    const users = getUsers()
    console.log('get user list')
    if (username) {
      const lists = users.filter((i) => {
        const reg = new RegExp(username, 'i')
        return reg.test(i.username)
      })
      return {
        items: lists.slice((page - 1) * pageSize, page * pageSize),
        count: lists.length,
      }
    }
    return {
      items: users.slice((page - 1) * pageSize, page * pageSize),
      count: users.length,
    }
  }
}

export default new DataSource()

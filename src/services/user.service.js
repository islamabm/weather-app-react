import { storageService } from './storage.service.js'
export const userService = {
  signup,
  getLoggedinUser,
}

function signup(name) {
  const user = {
    name: name,
    url: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png',
  }
  storageService.store('user', user)
  return user
}

function getLoggedinUser() {
  return storageService.load('user')
}

const data = require('./data');

module.exports = {
  findAll(){
    return data.users
  },
  createUser(user){
    data.users.push(user)
  },
  destory(id){
    data.users.splice(
      data.users.findIndex(user => user.id === id)
    )
  },
  update(id, user){
    data.users[data.user.findIndex(user => user.id === id)] = user
  }
}
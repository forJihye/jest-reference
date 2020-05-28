import axi from 'axios';
import Axios from 'axios';

export const sum = (a, b) => a+b;

export const string = (endPoint, token) => `http://localhost:8000/${endPoint}?token=${token}`

export const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

export const getUser = id => {
  if(id <= 0) throw new Error('Invalid ID')
  return {
    id,
    email: `use${id}@test.com`
  }
};

export const fetchUser = (id, callback) => {
  setTimeout(() => {
    console.log('wait 5s');
    const user = {
      id: id,
      name: `User: ${id}`,
      email: `user${id}@test.com`
    }
    callback(user)
  }, 5000);
};

export const promise = id => new Promise(res => {
  setTimeout(() => {
    console.log('wait 2s');
    const user = {
      id: id,
      name: `User: ${id}`,
      email: `user${id}@test.com`
    }
    res(user)
  }, 2000)
})

export const userDatas = [];
export const foodDatas = [];

export const isUser = user => user
export const isFood = food => food

export const findJson = id => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data)

export const forEeach = (items, callback) => {
  for(let i=0; i<items.length; i++){
    callback(items[i])
  }
}
import { sum, string, shoppingList, getUser, fetchUser, promise, userDatas, foodDatas, isUser, isFood, findJson, forEeach } from "./main"
import RESTAPI from "./RESTAPI";
import axios from "axios";

/**
 * jest는 기본적으로 .test.js로 끝나는 파일을 테스트한다.
 * 특정 테스트 파일을 실행 하고자 할 때는 script: "npm test <파일명이나 경로>" 
 * 
 * Matcher 함수
 * toBe()는 숫자나 문자와 같은 객체가 아닌 기본형 값을 비교할 때 사용
 * toEqual() 객체의 값을 확인 할 때
 * toContainEqual() 해당 객체가 존재하는지 
 */


test('1+2는 3이다', () => {
  expect(sum(1, 2)).toBe(3);
});

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0); // .not = Matcher의 반대를 테스트
    }
  }
});


/**
 * Truthiness 진실성
 * 
 * toBeNull() = null 인 경우
 * toBeUndefined() = undefind 인 경우
 * toBeDefined() = undefind 아닌 경우
 * toBeTruthy() = true인 경우
 * toBeFalsy() = false인 경우
 */


test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero true?', () => {
  const z = 0; // false
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});


/**
 * String, Array
 * 
 * .toMatch() 정규식으로 문자열 비교 확인 (string)
 * .toContain() 배열에 item이 있는지 확인 (array)
 * .toHaveLength() 배열의 길이 체크 확인
 */


test('hashsnap event server get RefulAPI', () => {
  expect(string('event/EdoKCmsv', 'FIXME')).toMatch(/event/);
});

test('hashsnap event server get RefulAPI', () => {
  expect(string('event/EdoKCmsv', 'FIXME')).not.toMatch(/group/);
});

test('shopping list has beer ?', () => {
  // expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
  expect(shoppingList).not.toHaveLength(3);
});


/**
 * toThrow() 예외 발생 여부를 테스트해야할 때 (특정 함수가 호출될 때 오류가 발생하는지 테스트)
 */

test('throw when ID is non negative', () => {
  expect(() => getUser(-1)).toThrow();
});


 /**
  * Jest 비동기 코드 테스트
  * 
  */

// callback 함수 테스트
test('fetch a user', (doen) => {
  fetchUser('jihye', (user) => {
    expect(user).toEqual({
      id: 'jihye',
      name: `User: jihye`,
      email: `userjihye@test.com` 
    })
    doen();
  });
});


// Promise (반드시 Promise return)
test('promise then a user', () => {
  return promise('jihye').then(user => {
    expect(user).toEqual({
      id: 'jihye',
      name: `User: jihye`,
      email: `userjihye@test.com`       
    });
  });
});


// async/await 
test('fetch a user (async/await', async() => {
  const user = await promise('jihye');
  expect(user).toEqual({
    id: 'jihye',
    name: `User: jihye`,
    email: `userjihye@test.com`
  });
});


const userService = require('./userService');
const data = require('./data');

test('find all users', () => {
  data.users.push(
    { id: 1, email: 'user1@test.com' },
    { id: 2, email: 'user2@test.com' },
    { id: 3, email: 'user3@test.com' }
  );
  const users = userService.findAll();
  expect(users).toHaveLength(3);
  expect(users).toContainEqual({id:2, email: 'user2@test.com'});
  expect(users).not.toContainEqual({id:4, email: 'user4@test.com'});
});

/**
 * 첫번째 data 모듈의 users 데이터를 추가했던 것이 이번 테스트에도 영향을 주기 때문에 실패한다.
 * 이와 같은 상황을 피하기 위해서는 각 테스트를 실행 후에 data 모듈에 저장되어 있는 데이터를 정리해주는 작업이 필요하다.
 * 
 * Jest의 afterEach() 함수의 인자로 데이터를 정리해주면 된다.
 * findAll 테스트가 실행 된 후 호출되고, createUser 테스트가 실행 된 후 호출 되기 때문에 createUser 테스트는 통과가 된다.
 * 
 * data.users 초기 데이터를 적재하는 중복 코드를 Jest beforeEach() 함수의 인자로 넘겨서 중복 코드 제거하기
 * afterEach(), beforeEach() 는 각각의 테스트 함수가 실행 되기 전에 매번 실행된다.
 * beforeAll(), afterAll() 함수는 테스트 함수 전 후에 매번 호출되는 것이 아니라. 맨 처음, 맨 마지막에 딱 한 번씩만 호출된다.
 */


afterEach(() => {
  data.users.splice(0);
});

test('create a user', () => {
  const user = {id: 4, email: 'user4@test.com'};
  userService.createUser(user);

  expect(data.users).toHaveLength(1);
});

beforeEach(() => {
  data.users.push(
    { id: 1, email: 'user1@test.com' },
    { id: 2, email: 'user2@test.com' },
    { id: 3, email: 'user3@test.com' }
  );
});

test('find all users', () => {
  const users = userService.findAll();
  expect(users).toHaveLength(3);
  expect(users).toContainEqual({ id: 1, email: "user1@test.com" });
});

test('destory a user', () => {
  const id = 3;
  const user = data.users.find(user => user.id === id);

  userService.destory(id);
  
  expect(data.users).toHaveLength(2);
  expect(data.users).not.toContainEqual(user);
});


/**
 * describe() 연관된 테스트 함수들끼리 그룹화하기
 * it() = test() 함수 대신 사용 가능
 */

beforeAll(() => {
  userDatas.push(
    { id: 1, email: 'user1@test.com' },
    { id: 2, email: 'user2@test.com' },
    { id: 3, email: 'user3@test.com' }
  );  
  foodDatas.push(
    { id: 1, food: 'apple' },
    { id: 2, food: 'banana' },
    { id: 3, food: 'watermelon' }
  )
})
describe('check user data', () => {
  test('is user data', () => {
    const data = userDatas.find(user => user.id === 2)
    expect(isUser(data)).toBeTruthy();
  });
})

describe('check food data', () => {
  test('is food data', () => {
    const data = foodDatas.find(user => user.id === 3)
    expect(isFood(data)).toBeTruthy();
  });
})


/**
 * describe 블록 내부의 beforeEach() 말고 상위 레벨 beforeEach() 함수가 먼저 실행된다.
 * 
 * 1 - beforeAll
  1 - beforeEach
  1 - test
  1 - afterEach
  2 - beforeAll
  1 - beforeEach
  2 - beforeEach
  2 - test
  2 - afterEach
  1 - afterEach
  2 - afterAll
  1 - afterAll
 * 
 */

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});


/**
 * Jest Mock functions
 * 단위 테스트 작성할 때, 해당 코드가 의존하는 부분을 가짜 (mock)로 대체하는 방법
 * mocking은 실제 객체인 척하는 가짜 객체를 생성하는 매커니즘을 제공
 * 스트가 실행되는 동안 가짜 객체에 어떤 일들이 발생했는지를 기억하기 때문에 가짜 객체가 내부적으로 어떻게 사용되는지 검증할 수 있다.
 * 
 * mockReturnValue() 함수를 이용해서 어떤 값을 리턴해야할지 설정할 수 있다.
 * mockResolvedValue() 비동기 함수 (then으로 값 return)
 * 
 * 테스트 코드를 작성할 때 모듈이나 객체의 함수으 구현을 가짜로 대체하지 않고, 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내야할 때가 있다.
 * jest.spyOn(object, object methodName) 이용
 * 
 */

test('jest.spyOn', () => {
  const calculator = {
    add: (a, b) => a + b
  }
  const spyFn = jest.spyOn(calculator, 'add');
  const result = spyFn(4, 5);

  expect(result).toBe(9);
  expect(spyFn).toBeCalledTimes(1); // 호출 횟수
  expect(spyFn).toBeCalledWith(4, 5); // 어떤 인자가 들어왔는지 검증
})

test('findAll calls the callback function with 10 users', (done) => {
  const callback = jest.fn((error, users) => {
    expect(users).toHaveLength(10); //데이터 길이 측정
    expect(callback).toBeCalledTimes(1);
    done();
  })
  RESTAPI.findAll(callback)
});

// 아래 테스트는 API 서버가 다운되거나, Network 단절된 환경에서 실행시 오류가 발생된다.
test('findOne fetches data from the API endpoint', async() => {
  const spyGet = jest.spyOn(axios, 'get') // axios 모듈의 get 메서드 사용
  const result = await RESTAPI.findOne(1);

  expect(spyGet).toBeCalledTimes(1);
  expect(result).toHaveProperty("id", 1); // toHaveProperty(key, value) 해당 프로퍼티 데이터 검증
})

/**
 * 위 테스트를 해결하는 방법은 axios get함수가 항상 안정적으로 결과를 반환하도록 mocking을 해야한다.
 * 즉 axios.get 을 고정된 결과값을 리턴하는 가짜 함수로 대체해주며 된다. 
 * 테스트 입장에서 통제할 수 없는 부분을 mocking 사용하면 외부 환경에 의존하지 않고 언제든지 독립적으로 실행 가능한 테스트를 작성할 수 있다.
 */
test('findOne returns what axios get returns', async() => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      id: 1,
      name: "Leanne Graham"
    }
  })
  const result = await RESTAPI.findOne(1)
  expect(result).toHaveProperty("name", "Leanne Graham");
})


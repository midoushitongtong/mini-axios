import axios, { AxiosError, AxiosResponse } from './axios';

// params test
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     favoriteList: ['qqq', 'www', 'eee']
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     person: {
//       name: 'qqq'
//     }
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     date: new Date()
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     qqq: '@$),+'
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     name: 'Andy'
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1',
//   params: {
//     age: 23
//   }
// });
//
// axios({
//   url: 'http://127.0.0.1?qqq=2#qwe',
//   params: {
//     name: 'Andy'
//   }
// });

// data test
// axios({
//   method: 'post',
//   url: 'http://127.0.0.1',
//   data:{
//     q: [
//       '123',
//       '222',
//       '333'
//     ]
//   }
// });

// headers test
// axios({
//   method: 'post',
//   url: 'http://127.0.0.1',
//   data: {
//     q: 123,
//     w: 231,
//     e: 123
//   },
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json, text/plain, */*'
//   }
// });
//
// axios({
//   method: 'post',
//   url: 'http://127.0.0.1',
//   data: {
//     q: 123,
//     w: 231,
//     e: 123
//   }
// });

// axios({
//   method: 'post',
//   url: 'http://127.0.0.1',
//   data: new URLSearchParams('q=1&w=5')
// });

// axios({
//   method: 'post',
//   url: 'http://127.0.0.1',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then((res: AxiosResponse) => {
//   console.log(res);
// });

// response status code test
// axios({
//   method: 'get',
//   url: 'http://127.0.0.1'
// }).then((res: AxiosResponse) => {
//   console.log(res);
// }).catch(e => {
//   console.error(e);
// });

// timeout test
// axios({
//   method: 'get',
//   url: 'http://127.0.0.1',
//   params: {
//     q: 2
//   }
// }).then((res: AxiosResponse) => {
//   console.log(res);
// }).catch(e => {
//   console.error(e);
// });

// network test
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: 'http://127.0.0.1',
//     params: {
//       q: 2
//     }
//   }).then((res: AxiosResponse) => {
//     console.log(res);
//   }).catch((e: AxiosError) => {
//     console.error(e.message);
//     console.error(e.isError);
//     console.error(e.config);
//     console.error(e.code);
//     console.error(e.request);
//     console.error(e.response);
//   });
// }, 3000);

// extend tests
// axios.get('http://127.0.0.1', {w: 55});
// axios.options('http://127.0.0.1');
// axios.head('http://127.0.0.1');
// axios.delete('http://127.0.0.1');
// axios.post('http://127.0.0.1', {q: 11});
// axios.put('http://127.0.0.1', {q: 11});
// axios.patch('http://127.0.0.1', {q: 11});

// override test
// axios('http://127.0.0.1', {
//   method: 'get',
//   params: {
//     q: 1
//   }
// });
//
// axios('http://127.0.0.1', {
//   method: 'post',
//   data: {
//     q: 1
//   }
// });

// generic test
// interface ResponseData<T = any> {
//   code: number;
//   message: string;
//   result: T;
// }
//
// interface User {
//   name: string;
//   age: number;
// }
//
// const getUser = <T>() => {
//   return axios<ResponseData<T>>('http://127.0.0.1?q=1')
//     .then((res: any) => res.data)
//     .catch((err: any) => console.log(err));
// };
//
// const test = async () => {
//   const user: ResponseData = await getUser<User>();
//   if (user) {
//     console.log(user.result.nam);
//   }
// };

// test();

// interceptor test
axios.interceptors.request.use(config => {
  config.headers.test = '1';
  return config;
});

axios.interceptors.response.use(response => {
  return response;
});

axios({
  method: 'get',
  url: 'http://127.0.0.1',
  headers: {
    q: '1'
  }
})
  .then(res => console.log(res));


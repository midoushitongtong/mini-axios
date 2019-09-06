import axios from './axios';

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
axios({
  method: 'post',
  url: 'http://127.0.0.1',
  data: {
    q: 123,
    w: 231,
    e: 123
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  }
});

axios({
  method: 'post',
  url: 'http://127.0.0.1',
  data: {
    q: 123,
    w: 231,
    e: 123
  }
});

axios({
  method: 'post',
  url: 'http://127.0.0.1',
  data: new URLSearchParams('q=1&w=5')
});

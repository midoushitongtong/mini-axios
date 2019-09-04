import axios from './axios';

axios({
  url: 'http://127.0.0.1',
  params: {
    favoriteList: ['qqq', 'www', 'eee']
  }
});

axios({
  url: 'http://127.0.0.1',
  params: {
    person: {
      name: 'qqq'
    }
  }
});

axios({
  url: 'http://127.0.0.1',
  params: {
    date: new Date()
  }
});

axios({
  url: 'http://127.0.0.1',
  params: {
    qqq: '@$),+'
  }
});

axios({
  url: 'http://127.0.0.1',
  params: {
    name: 'Andy'
  }
});

axios({
  url: 'http://127.0.0.1',
  params: {
    age: 23
  }
});

axios({
  url: 'http://127.0.0.1?qqq=2#qwe',
  params: {
    name: 'Andy'
  }
});

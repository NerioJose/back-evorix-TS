import autocannon from 'autocannon';

const instance = autocannon({
  url: 'http://localhost:3000/register',
  connections: 100,
  duration: 30,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  setupRequest: () => {
    const body = JSON.stringify({
      nombre: 'Test',
      email: 'mail8@prueba.com',
      password: '3335656565b',
    });

    return {
      path: '/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
      body,
    };
  },
});

autocannon.track(instance, (err: Error, result: any) => {
  if (err) console.error(err);
  else console.log(result);
});

# Server Tests CryptoRSA

Tests with library CryptoRSA in a web server made with node.js, you can send string to server and view value encrypted/decrypted

## how to install

you need have nodejs package in bash to run app.js like this:

```bash
$ nodejs app.js
```

now you can access to localhost:3000/frontend/test.html and write text, after this click in send button to view server request:

```bash
$ nodejs app.js
Server running at http://127.0.0.1:3000/
================ ENCRYPTED STRING =====================
[ 373248,
  0,
  1030301,
  0,
  1259712,
  0,
  1259712,
  0,
  1367631,
  0,
  32768,
  0,
  658503,
  0,
  1367631,
  0,
  1481544,
  0,
  1259712,
  0,
  1000000,
  0,
  32768,
  0,
  35937,
  0 ]
=======================================================
================ DECRYPTED STRING =====================
Hello World !
=======================================================
```

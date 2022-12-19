const fs = require('fs');
const { request } = require('http');

const write = (value) => {
  process.stdout.write('prompt > ');
  process.stdout.write(value + '\n');
  process.stdout.write('prompt > ');
};

const pwd = () => write(process.cwd().split('\\').at(-1));

const date = () => write(Date());

const ls = () => fs.readdir('.', (err, files) => write(files.join(' - ')));

const echo = (text) => write(text);

const cat = (fileName) =>
  fs.readFile('./' + fileName, 'utf-8', (err, file) => write(file));

const head = (fileName) =>
  fs.readFile('./' + fileName, 'utf-8', (err, file) =>
    write(file.split('\n').slice(0, 5).join('\n'))
  );

const tail = (fileName) => {
  fs.readFile('./' + fileName, 'utf-8', (err, file) =>
    write(file.split('\n').slice(-5).join('\n'))
  );
};

const curl = (url) => request(url, (error, response, body) => write(body));

module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};

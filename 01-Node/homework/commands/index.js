const fs = require("fs");
const request = require("request");

const write = (value) => {
  process.stdout.write(value + "\n");
  process.stdout.write("prompt > ");
};

const readPartFile = (filename, part) => {
  // hago una sola lectura del archivio
  // retorno la porcipn que necesito
};

module.exports = {
  pwd: () => {
    write(process.cwd().split("\\").at(-1));
  },

  date: () => {
    write(Date());
  },

  ls: () => {
    fs.readdir(".", (err, files) => {
      const text = files.join("\n");
      write(text);
    });
  },
  echo: (text) => {
    write(text);
  },

  cat: (filename) => {
    fs.readFile("./" + filename, "utf8", (err, file) => {
      write(file);
    });
  },

  head: (filename) => {
    fs.readFile("./" + filename, "utf8", (err, file) => {
      write(file.split("\n").slice(0, 5).join("\n"));
    });
  },

  tail: (filename) => {
    fs.readFile("./" + filename, "utf8", (err, file) => {
      write(file.split("\n").slice(-5).join("\n"));
    });
  },

  curl: (url) => {
    request(url, (error, response, body) => {
      write(body);
    });
  },
};

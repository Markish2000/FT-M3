var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer((req, res) => {
    const { url } = req;
    const name = url.slice(1);
    try {
      const img = fs.readFileSync(__dirname + `/images/${name}_doge.jpg`);
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(img);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`No existe el doge ${name}`);
    }
  })
  .listen(3001, "127.0.0.1");

// switch (url) {
//   case "/arcoiris":
//     const img = fs.readFileSync(__dirname + "/images/arcoiris_doge.jpg");
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.end(img);
//     break;

//   default:
//     break;
// }

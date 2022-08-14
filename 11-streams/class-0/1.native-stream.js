// ls | grep package | xargs cat | jq .name

// process.stdin
//   .pipe(process.stdout)
//   .on("data", function (msg) {
//     console.log("data", msg);
//     this.end();
//   })
//   .on("error", (msg) => console.log("error", msg.toString()))
//   .on("end", () => console.log("end"))
//   .on("close", () => console.log("close"));

// -e = evaluate

// node -e "require('net').createServer((socket) => socket.pipe(process.stdout)).listen(1338);"

// node -e "process.stdin.pipe(require('net').connect(1338));"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from "http";
import { createReadStream } from "fs";

http
  .createServer((req, res) => {
    // const file = readFileSync("big.file");
    // res.write(file);
    // res.end();

    createReadStream("big.file").pipe(res);
  })
  .listen(3000, () => console.log("running at 3000"));

// curl localhost:3000 -o output.txt

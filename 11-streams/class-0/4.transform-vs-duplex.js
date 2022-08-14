import { Duplex, Transform } from "stream";

let count = 0;
const server = new Duplex({
  // Not work with Buffer, use more memory
  objectMode: true,
  encoding: "utf-8",

  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Vinicius${count}`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },

  // completely different
  write(chunk, encoding, onFinish) {
    console.log(`[writable] saving`, chunk);
    onFinish();
  },
});

// Activates write() of duplex
server.write("[duplex] writable\n");

// console.log, logs the data from .push() from read()
// server.on("data", (msg) => console.log(`[readable]  ${msg}`));

server.push(`[duplex] this is also a readable!`);

// Activates read() of duplex
// server.pipe(process.stdout);

const transformToUppercase = Transform({
  objectMode: true,
  transform(chunk, encoding, onFinish) {
    onFinish(null, chunk.toUpperCase());
  },
});

// Transform is also a duplex, add data to transform pipe
transformToUppercase.write("[transform] hello from write!");

// Ignores transform(), add data after the transform pipe
transformToUppercase.push(
  "[transform] hello from push, ignored from transform!\n"
);

// redirect all data from readable to writable of server duplex
server.pipe(transformToUppercase).pipe(server);

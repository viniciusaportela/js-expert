import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";

// Data Source
const readable = Readable({
  read() {
    for (let index = 0; index < 1e5; index += 1) {
      const person = { id: Date.now() + index, name: `Vinicius-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    // End of Data
    this.push(null);
  },
});

// Processing
const mapFields = Transform({
  transform(chunk, encoding, onFinish) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    onFinish(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, onFinish) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return onFinish(null, chunk);
    }

    this.counter += 1;
    onFinish(null, "id,name\n".concat(chunk));
  },
});

// Data Output
// const writable = Writable({
//   write(chunk, encoding, onFinish) {
//     console.log("msg", chunk.toString());

//     // The function finished, needs to call onFinish
//     onFinish();
//   },
// });

// readable.pipe(process.stdout);
const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream("my.csv"));

console.time("processing");
pipeline.on("end", () => console.timeEnd("processing"));

import { Readable, Writable } from "stream";

// Data Source
const readable = Readable({
  read() {
    this.push("Hello World 1");
    this.push("Hello World 2");
    this.push("Hello World 3");

    // End of Data
    this.push(null);
  },
});

// Data Output
const writable = Writable({
  write(chunk, encoding, callback) {
    console.log("msg", chunk.toString());

    // The function finished, needs to call callback
    callback();
  },
});

// readable.pipe(writable);
readable.pipe(process.stdout);

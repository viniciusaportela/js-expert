import timers from "timers/promises";

const timeoutAsync = timers.setTimeout;

setTimeout(async () => {
  console.log("starting process!!");
  await timeoutAsync(100);
  console.count("debug");
  console.log(await Promise.resolve("timeout order!"));
  await timeoutAsync(100);
  console.count("debug");

  await Promise.reject("promise rejected on timeout");
}, 1000);

const throwError = (msg) => {
  throw new Error(msg);
};

try {
  throwError("error inside try catch");
} catch (error) {
  console.log("error caught", error.message);
} finally {
  console.log("executed after all");
  // To repeating code
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message || error);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message || error);
});

setTimeout(async () => {
  await Promise.reject("promised rejection");
});

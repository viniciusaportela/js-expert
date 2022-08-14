import os from "os";
import cluster from "cluster";
import { initializeServer } from "./server.js";

(() => {
  // primary is responsible for orchestrating the cluster
  // any other instance that run this code will initialize a server
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpusCount = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${cpusCount} CPUs\n`);

  for (let index = 0; index < cpusCount; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();

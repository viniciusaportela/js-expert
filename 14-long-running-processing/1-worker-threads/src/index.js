import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { Worker } from "worker_threads";
import { dirname } from "path";
import "sharp";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );
      }

      console.log(`the thread ${worker.threadId} exited!`);
    });
  });
}

async function handler(request, response) {
  if (request.url.includes("joinImages")) {
    const { query } = parse(request.url, true);
    const { background, img } = query;

    const joinedImage = await joinImages({
      img: img,
      background,
    });

    response.writeHead(200, { "Content-Type": "text/html" });

    response.end(
      `<img style="width: 100%; height: 100%" src="data:image/jpeg;base64,${joinedImage}" />`
    );
    return;
  }

  return response.end("ok");
}

createServer(handler).listen(3000, () => console.log("running at 3000"));

// https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png
// https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png/revision/latest

// Backgrounds
// https://i.pinimg.com/originals/df/a7/21/dfa721c5db3faedec74a213fb333ed33.jpg
// https://c4.wallpaperflare.com/wallpaper/229/145/81/rick-and-morty-wallpaper-preview.jpg
// https://i.pinimg.com/originals/00/fe/2a/00fe2a47cbd1306f8ed46f1ae7b0f1a2.jpg

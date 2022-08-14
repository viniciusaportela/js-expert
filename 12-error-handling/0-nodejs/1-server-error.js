import Http from "http";

let count = 1;

async function handler(request, response) {
  count++;
  try {
    if (count % 2 === 0) {
      await Promise.reject("error in handler");
    }

    for await (const data of request) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject("error in for!");
        }
      } catch (error) {
        console.log("a request error has happened", error);
        response.writeHead(500);
        response.write(JSON.stringify({ message: "internal server error! " }));
      } finally {
        response.end();
      }
    }
  } catch (error) {
    console.log("a server error has happened", error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: "internal server error! " }));
    response.end();
  }
}

Http.createServer(handler).listen(3000, () => console.log("running at 3000"));

import http from "node:http";

const host = "0.0.0.0";
const port = 8080;

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
};

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    sendJson(response, 200, {
      service: "cat-health-tracker-backend",
      status: "ok",
    });
    return;
  }

  sendJson(response, 200, {
    service: "cat-health-tracker-backend",
    message: "Backend module placeholder.",
  });
});

server.listen(port, host, () => {
  console.log(`cat-health-tracker-backend listening on ${host}:${port}`);
});

const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

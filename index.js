const { Socket } = require("net");

function portScan(host, port, cb) {
  return new Promise((resolve) => {
    if (!host || typeof host !== "string") return;

    if (arguments.length <= 2) {
      if (typeof port === "function" || port === undefined) {
        cb = port;
        const tmp = host.split(":");
        host = tmp[0];
        port = parseInt(tmp[1]);
      }
    }

    if (port === undefined || port < 1 || port > 65535) {
      resolve(false);
      cb && cb(false, port);
      return;
    }

    const socket = new Socket();

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
      cb && cb(true, port);
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(false);
      cb && cb(false, port);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
      cb && cb(false, port);
    });

    socket.setTimeout(200);
    socket.connect(port, host);
  });
}

module.exports = portScan;

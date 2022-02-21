const { Socket } = require("net");

function portScan({ host, port, timeout = 200, callback }) {
  return new Promise((resolve) => {
    const regex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!regex.test(host)) {
      throw new Error("host address is invalid");
    }

    if (host === undefined) {
      throw new Error("host address is required");
    }

    if (typeof host !== "string") {
      throw new TypeError("host address type must be string");
    }

    if (port === undefined) {
      throw new Error("port number is required");
    }

    if (isNaN(port)) {
      throw new TypeError("port number type must be number");
    }

    if (isNaN(timeout)) {
      throw new TypeError("timeout number type must be number");
    }

    if (callback && typeof callback !== "function") {
      throw new TypeError("callback function type must be function");
    }

    const socket = new Socket();

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
      callback && callback(true, port);
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(false);
      callback && callback(false, port);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
      callback && callback(false, port);
    });
    socket.setTimeout(parseInt(timeout));
    socket.connect(parseInt(port), host);
  });
}

module.exports = portScan;

const { Socket } = require("net");

const regex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

function validation({ host, port, timeout, callback }) {
  if (regex.test(host) === false) {
    return { valid: false, error: "host format is invalid" };
  }

  if (
    typeof port !== "undefined" &&
    (port > 65536 || port < 0 || typeof port !== "number")
  ) {
    return {
      valid: false,
      error: "Port should be >= 0 and < 65536 and type of number",
    };
  }

  if (
    typeof timeout !== "undefined" &&
    (timeout < 0 || typeof timeout !== "number")
  ) {
    return {
      valid: false,
      error: "timeout should be larger than 0 and type of number",
    };
  }

  if (typeof callback !== "undefined" && typeof callback !== "function") {
    return { valid: false, error: "callback should be a function" };
  }

  return { valid: true, error: null };
}

function portScanner({ host, port, timeout = 200, callback }) {
  return new Promise((resolve, reject) => {
    const vResult = validation({ host, port, timeout, callback });
    if (vResult.valid === false) {
      reject(vResult.error);
      return;
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

    socket.setTimeout(timeout);
    socket.connect(port, host);
  });
}

module.exports = portScanner;

const { Socket } = require("net");

const portScanner = (port, host) => {
  return new Promise((resolve) => {
    const socket = new Socket();

    socket.setTimeout(500);

    socket.on("connect", () => {
      socket.destroy();
      resolve(port);
    });

    socket.on("error", () => socket.destroy());
    socket.on("timeout", () => socket.destroy());

    socket.connect(port, host);
  });
};

for (let i = 3; i < process.argv.length; i++) {
  portScanner(process.argv[i], process.argv[2]).then((p) =>
    console.log(`Open ${p}`)
  );
}

# port-scanner

### Installation

```
npm install pscanner
```

example:

```javascript
const portScan = require("pscanner");

const main = async () => {
  const isOpen = await portScan({ host: "8.8.8.8", port: 80 });
  console.log(isOpen); // true
};

main();
```

support CallBack function:

```javascript
const portScan = require("pscanner");

portScan({
  host: "8.8.8.8",
  port: 81,
  callback: (isOpen, port) => {
    console.log(isOpen, port);
    // false 81
  },
});
```

set timeout connection (default 200ms):

```javascript
const portScan = require("pscanner");

const main = async () => {
  const isOpen = await portScan({ host: "8.8.8.8", port: 80, timeout: 100 });
  console.log(isOpen); // true
};

main();
```

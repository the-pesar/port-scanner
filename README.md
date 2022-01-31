# port-scanner

### Installation

```
npm install pscanner
```

example:

```javascript
const portScan = require("pscanner");

const app = async () => {
  const isOpen = await portScan("8.8.8.8", 80);
  console.log(isOpen); // true
};

app();
```

support CallBack:

```javascript
const portScan = require("pscanner");

portScan("8.8.8.8", 80, (isOpen, port) => {
  console.log(isOpen, port);
  // true 80
});
```

other features:

```javascript
const portScan = require("pscanner");

portScan("8.8.8.8:80", (isOpen, port) => console.log(isOpen, port)); 
// true 80

await portScan("8.8.8.8:81"); // false
```

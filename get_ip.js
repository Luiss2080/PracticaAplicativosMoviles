const os = require("os");
const interfaces = os.networkInterfaces();
const results = {};

for (const name of Object.keys(interfaces)) {
  for (const interface of interfaces[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (interface.family === "IPv4" && !interface.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(interface.address);
    }
  }
}

console.log(JSON.stringify(results, null, 2));

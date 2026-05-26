const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const files = [
  "data/topics.json",
  "data/facts/number.json",
  "data/facts/money.json",
  "data/facts/measurement.json",
  "data/facts/data.json",
  "data/facts/relationships.json",
  "data/facts/time-work.json",
  "data/exam-bank.json"
];

const bundle = {};
for (const file of files) {
  const fullPath = path.join(root, file);
  bundle[file] = JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

const output = `window.LCAMathsData = ${JSON.stringify(bundle, null, 2)};\n`;
fs.writeFileSync(path.join(root, "js", "embedded-data.js"), output);
console.log("Updated js/embedded-data.js");

const fs = require('fs');

export function saveToFile(path: string, json: any) {
  fs.writeFileSync(path, JSON.stringify(json));
}

export function loadFromFile(path: string) {
  const json = JSON.parse(fs.readFileSync(path));
  return json;
}
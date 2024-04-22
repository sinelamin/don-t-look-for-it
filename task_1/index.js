import { encoded, translations } from './data.js'

function decoded(encoded, translations) {
  const exception = ['groupId', 'service', 'formatSize', 'ca'];
  const translationKeys = Object.keys(translations);

  encoded.forEach(obj => {
    for (let key in obj) {
      if (key.endsWith('Id') && !exception.includes(key)) {
        if (translationKeys.includes(obj[key])) {
          obj[key] = translations[obj[key]];
        }
      }
    }
  });
}

function getUniqueIds(encoded) {
  const uniqueIds = [];

  encoded.forEach(obj => {
    for (let key in obj) {
      if (key.endsWith('Id') && !uniqueIds.includes(key)) {
        uniqueIds.push(key);
      }
    }
  });

  return uniqueIds;
}


decoded(encoded, translations);

console.log("Let's rock");
console.log(encoded, translations);
console.log(getUniqueIds(encoded));
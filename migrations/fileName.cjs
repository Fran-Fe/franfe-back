const path = require('path');

module.exports =  function getRealQueryFileName(cjsFileName) {
  const fileName = path.basename(cjsFileName, path.extname(cjsFileName));

  return `./real_queries/${fileName}.sql`;
}
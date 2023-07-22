export function getRealQueryFileName(cjsFileName) {
  const fileName = cjsFileName.path.basename();

  return `./real_queries/${fileName}`;
}
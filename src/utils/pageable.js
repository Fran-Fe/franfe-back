export function page(req) {

  const doPage = req.pageNumber != null && req.pageSize != null;
  if (!doPage) {
    return {offset: 0, limit: null};
  }

  const offset = (req.pageNumber - 1) * req.pageSize;
  const limit = req.pageNumber * req.pageSize;

  return {offset, limit};
}

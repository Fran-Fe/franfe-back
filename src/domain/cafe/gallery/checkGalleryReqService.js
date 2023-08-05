export function checkGalleryRequest(req){
  return req.query.pageNum == null || req.query.category == null || req.query.pageSize == null;
}

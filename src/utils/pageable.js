export function page(req) {
    const doPage = req.pageNumber != null && req.pageSize != null;

    let firstId = 1;
    let lastId = 1;

    if (doPage) {
        firstId = (req.pageNumber - 1) * req.pageSize + 1;
        lastId = req.pageNumber * req.pageSize;
    }

    return { doPage, firstId, lastId};
}

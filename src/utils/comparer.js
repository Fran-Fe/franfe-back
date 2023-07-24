class CompareResult {
  constructor() {
    this.createRequests = [];
    this.ignoreRequests = [];
    this.deleteRequests = [];
  }

  execute(createFunction, deleteFunction) {
    const result = [];

    result.push(
      ...this.createRequests.map(createFunction)
        .filter((item) => item !== null)
    );

    result.push(...this.ignoreRequests);

    this.deleteRequests.forEach(deleteFunction);

    return result;
  }
}

function compare(entities, requests, comparable) {
  const result = new CompareResult();

  result.createRequests.push(...requests);
  result.deleteRequests.push(...entities);

  entities.forEach(entity => {
    requests.forEach(request => {
      if (comparable.equal(entity, request)) {
        result.createRequests.splice(result.createRequests.indexOf(request), 1);
        result.ignoreRequests.push(entity);
        result.deleteRequests.splice(result.deleteRequests.indexOf(entity), 1);
      }
    });
  });

  return result;
}

module.exports = {
  compare,
  CompareResult,
};

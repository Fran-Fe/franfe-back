export class CompareResult {
  constructor() {
    this.newRequests = [];
    this.ignoreRequests = [];
    this.oldEntities = [];
  }

  execute(createFunction, deleteFunction) {
    const result = [];

    result.push(
      ...this.newRequests.map(createFunction)
        .filter((item) => item !== null)
    );

    result.push(...this.ignoreRequests);

    this.oldEntities.forEach(deleteFunction);

    return result;
  }
}

export function compare(entities, requests, comparable) {
  const result = new CompareResult();

  result.newRequests.push(...requests);
  result.oldEntities.push(...entities);

  entities.forEach(entity => {
    requests.forEach(request => {
      if (comparable(entity, request)) {
        result.newRequests.splice(result.newRequests.indexOf(request), 1);
        result.ignoreRequests.push(entity);
        result.oldEntities.splice(result.oldEntities.indexOf(entity), 1);
      }
    });
  });

  return result;
}

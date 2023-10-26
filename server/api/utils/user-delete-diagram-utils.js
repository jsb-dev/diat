let bufferedDeleteRequests = [];
let aggregatedDeleteRequests = [];

const aggregateDeleteRequests = () => {
  bufferedDeleteRequests.forEach((request) => {
    const foundRequestIndex = aggregatedDeleteRequests.findIndex(
      (aggregated) => aggregated.id === request.id
    );
    if (foundRequestIndex === -1) {
      aggregatedDeleteRequests.push(request);
    } else {
      aggregatedDeleteRequests[foundRequestIndex] = request;
    }
  });
  bufferedDeleteRequests = [];
};

export {
  bufferedDeleteRequests,
  aggregatedDeleteRequests,
  aggregateDeleteRequests,
};

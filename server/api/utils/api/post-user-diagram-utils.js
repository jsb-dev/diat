let bufferedRequests = [];
let aggregatedRequests = [];

const aggregateRequests = () => {
  bufferedRequests.forEach((request) => {
    const foundRequestIndex = aggregatedRequests.findIndex(
      (aggregated) => aggregated.id === request.id
    );
    if (foundRequestIndex === -1) {
      aggregatedRequests.push(request);
    } else {
      aggregatedRequests[foundRequestIndex] = request;
    }
  });
  bufferedRequests = [];
};

export { bufferedRequests, aggregatedRequests, aggregateRequests };

let bufferedRequests = [];
let aggregatedSaveRequests = [];

const aggregateSaveRequests = () => {
  bufferedRequests.forEach((request) => {
    const foundRequestIndex = aggregatedSaveRequests.findIndex(
      (aggregated) => aggregated.id === request.id
    );
    if (foundRequestIndex === -1) {
      aggregatedSaveRequests.push(request);
    } else {
      aggregatedSaveRequests[foundRequestIndex] = request;
    }
  });
  bufferedRequests = [];
};

export { bufferedRequests, aggregatedSaveRequests, aggregateSaveRequests };

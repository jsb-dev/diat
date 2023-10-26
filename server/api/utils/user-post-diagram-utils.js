let bufferedSaveRequests = [];
let aggregatedSaveRequests = [];

const aggregateSaveRequests = () => {
  bufferedSaveRequests.forEach((request) => {
    const foundRequestIndex = aggregatedSaveRequests.findIndex(
      (aggregated) => aggregated.id === request.id
    );
    if (foundRequestIndex === -1) {
      aggregatedSaveRequests.push(request);
    } else {
      aggregatedSaveRequests[foundRequestIndex] = request;
    }
  });
  bufferedSaveRequests = [];
};

export { bufferedSaveRequests, aggregatedSaveRequests, aggregateSaveRequests };

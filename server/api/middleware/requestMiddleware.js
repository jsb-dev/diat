import { bufferedRequests } from '../utils/api/post-user-diagram-utils.js';

const requestMiddleware = (req, res, next) => {
  if (req.body) {
    bufferedRequests.push(req.body);
  }
  next();
};

export default requestMiddleware;

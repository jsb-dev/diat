import { bufferedRequests } from '../../../utils/post-user-diagram-utils.js';

const saveRequestMiddleware = (req, res, next) => {
  if (req.body) {
    bufferedRequests.push(req.body);
  }
  next();
};

export default saveRequestMiddleware;

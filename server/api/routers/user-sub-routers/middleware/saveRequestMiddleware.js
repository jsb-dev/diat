import { bufferedSaveRequests } from '../../../utils/user-post-diagram-utils.js';

const saveRequestMiddleware = (req, res, next) => {
  if (req.body) {
    bufferedSaveRequests.push(req.body);
    next();
  } else {
    return;
  }
};

export default saveRequestMiddleware;

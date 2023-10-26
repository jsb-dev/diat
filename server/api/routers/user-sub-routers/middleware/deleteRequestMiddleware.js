import { bufferedDeleteRequests } from '../../../utils/user-delete-diagram-utils.js';

const deleteRequestMiddleware = (req, res, next) => {
  if (req.query) {
    bufferedDeleteRequests.push(req.query);
    next();
  } else {
    return;
  }
};

export default deleteRequestMiddleware;

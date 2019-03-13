const isEmptyReqBody = req =>
  req.body.constructor === Object && Object.keys(req.body).length === 0;

export { isEmptyReqBody };

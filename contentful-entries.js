import getKeys from './auth/keys';
import { initializeContentfulClient } from './auth/auth';
import { isEmptyReqBody } from './common/common';

const api = function(req, res) {
  if (!isEmptyReqBody(req)) res.send('use GET method');
  const client = initializeContentfulClient();
  client
    .getEntries()
    .then(response => res.send(response.items))
    .catch(console.error);
};

export default api;

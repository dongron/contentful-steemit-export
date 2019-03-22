import getKeys from '../auth/keys';
import { initializeContentfulClient } from '../auth/auth';
import { isEmptyReqBody } from '../common/common';

const allPostsQuery = {
      'content_type': 'post'
    };
    
const api = function(req, res) {
  if (!isEmptyReqBody(req)) res.send('use GET method');
  const client = initializeContentfulClient();
  client
    .getEntries(allPostsQuery)
    .then(response => res.send(mapDataToFullPost(response.items)))
    .catch(console.error);
};

const mapDataToFullPost = (items) => {
  let postsBody = items.map((item) => ({
    // baseUrl: ite
    title: item.fields.title,
    body: item.fields.body
  }));
  return postsBody;
}

export default api;

const { Client, PrivateKey } = require('dsteem');
import {
  initializeSteemClient,
  initializeSteemTestnetClient
} from '../auth/auth';
import getKeys from '../auth/keys';

const api = function(req, res) {
  if (req.body.images) {
    console.warn();
    res.send(images);
    return;
  } else if (req.query.submit) {
    const articleData = createMockupArticleData();
    submitArticle({ res, articleData });
    return;
  } else {
    responseWithPostsForTag('steemblog', res);
  }
  res.send('');
};

const createMockupArticleData = () => ({
  title: 'test title',
  body: 'test body',
  taglist: ['test', 'first']
});

// posts and comments are the same structure defined by 'parent_author' parameter
const submitArticle = (
  res,
  articleData,
  userData = getKeys().steem.production[1]
) => {
  let { title, body, taglist } = articleData;
  let { privateKey, author } = userData;
  privateKey = PrivateKey.fromString(privateKey);
  const json_metadata = JSON.stringify({ tags: taglist });
  const permlink = Math.random()
    .toString(36)
    .substring(2);

  let client = initializeSteemClient();
  const commentPayload = {
    author: author,
    title: title,
    body: body,
    json_metadata: json_metadata,
    parent_author: '',
    parent_permlink: taglist[0],
    permlink: permlink
  };

  client.broadcast.comment(commentPayload, privateKey).then(
    function(result) {
      let blockId = result.block_num;
      let link = `http://condenser.steem.vc/${
        taglist[0]
      }/@${author}/${permlink}`;
      var response = JSON.stringify(result) + '<br />' + link;
      res.send(response);
    },
    function(error) {
      console.error(error);
      res.send(error);
    }
  );
};

const responseWithPostsForTag = (
  tag,
  res,
  client = initializeSteemClient()
) => {
  const query = {
    tag: 'steemitblog', // This tag is used to filter the results by a specific post tag
    limit: 5 // This limit allows us to limit the overall results returned to 5
  };

  client.database
    .getDiscussions('blog', query)
    .then(result => {
      var posts = [];
      result.forEach(post => {
        const json = JSON.parse(post.json_metadata);
        const image = json.image ? json.image[0] : '';
        const title = post.title;
        const author = post.author;
        const created = new Date(post.created).toDateString();
        posts.push(
          `<div class="list-group-item"><h4 class="list-group-item-heading">${title}</h4><p>by ${author}</p><center><img src="${image}" class="img-responsive center-block" style="max-width: 450px"/></center><p class="list-group-item-text text-right text-nowrap">${created}</p></div>`
        );
      });
      res.send(posts.join(''));
    })
    .catch(err => {
      console.error('Error occured' + err);
    });
};

export default api;

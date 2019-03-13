const contentful = require("contentful");
import getKeys from './keys';

const initializeContentfulClient = () => {
  let client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: getKeys().contentful.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: getKeys().contentful.contentDeliveryToken
  });
  return client;
};

export { initializeContentfulClient };

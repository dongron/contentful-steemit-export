const contentful = require('contentful');
const { Client } = require('dsteem');
import getKeys from './keys';

const initializeContentfulClient = () => {
  return contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: getKeys().contentful.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: getKeys().contentful.contentDeliveryToken
  });
};

const initializeSteemClient = () => {
  return new Client('https://api.steemit.com');
};

const initializeSteemTestnetClient = () => {
  const url = 'https://testnet.steem.vc';
  const options = {
    addressPrefix: 'STX',
    chainId: '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673'
  };
  const url1 = 'https://testnet.steemitdev.com';
  const options1 = {
    addressPrefix: 'TST',
    chainId: '46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32'
  };
  return new Client(url1, options1);
};

export {
  initializeContentfulClient,
  initializeSteemClient,
  initializeSteemTestnetClient
};

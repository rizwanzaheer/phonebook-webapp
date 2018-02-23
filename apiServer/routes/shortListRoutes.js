const { getShortList, addUserInShortList } = require('../controllers/shortList');

module.exports = app => {
  app.post('/api/shortlist', getShortList);
  app.post('/api/adduserinshortlist', addUserInShortList);
  
}
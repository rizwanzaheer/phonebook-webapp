const {
  getAllUsers,
  getUserById,
  getUserByName,
  getUsersBySearchCriteria
 } = require('../controllers/searchController');

module.exports = app => {
  app.post('/api/search/getallusers', getAllUsers);
  app.post('/api/search/getuserbyid', getUserById);
  app.post('/api/search/getuserbyname', getUserByName);
  app.post('/api/search/getusersbysearchcriteria', getUsersBySearchCriteria);
}
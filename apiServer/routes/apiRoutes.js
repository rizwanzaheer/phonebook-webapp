// Routes

module.exports = (app) => {
  app.post('/api/search/createnew', (req, res) => {
    console.log('working!!');
    console.log('req.body: ', req.body);
    res.send({ success: 'success complete req!' });
  });
  app.post('/api/search/searchrecords', (req, res) => {
    console.log('searchrecords working!!');
    console.log('req.body: ', req.body);
    res.send({ success: 'success complete req!' });
  });
};

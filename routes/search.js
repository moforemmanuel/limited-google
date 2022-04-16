const router = require('express').Router();
const askGoogle = require('../controllers/askGoogle');


router.post('/', (req, res) => {
  const query = req.body.searchQuery;
  askGoogle(query)
  
  .then(response => {
    res.render('answers', {
      results: response.data.results
    });
  })
  .catch(error => {
    res.render('answers', {
      error
    });
  });
  
});

module.exports = router;
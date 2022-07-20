const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the url is
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + res.locals.currentURL );
  next();
});


// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});

router.use('/v9', require('./views/v9/_routes'))
router.use('/v10', require('./views/v10/_routes'))
router.use('/v11', require('./views/v11/_routes'))
router.use('/v12', require('./views/v12/_routes'))
router.use('/v12_1', require('./views/v12_1/_routes'))
router.use('/v12_2', require('./views/v12_2/_routes'))
router.use('/v12_3', require('./views/v12_3/_routes'))
router.use('/v12_4', require('./views/v12_4/_routes'))


module.exports = router

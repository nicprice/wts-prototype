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
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});


// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});

router.use('/v9', require('./views/v9/_routes'))

// Set service name based on sub folders for different prototypes

router.get('/v9/*', function(req, res, next){
  res.locals['serviceName'] = 'Move and track waste'
  next()
});



module.exports = router

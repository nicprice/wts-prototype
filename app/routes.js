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
 // console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  //console.log('previous page is: ' + res.locals.prevURL + " and current page is " + res.locals.currentURL );
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
router.use('/v12_5', require('./views/v12_5/_routes'))
router.use('/v12_6', require('./views/v12_6/_routes'))
router.use('/v12_7', require('./views/v12_7/_routes'))
router.use('/v13', require('./views/v13/_routes'))
router.use('/v13_1', require('./views/v13_1/_routes'))
router.use('/v14', require('./views/v14/_routes'))
router.use('/v14_1', require('./views/v14_1/_routes'))
router.use('/v14_2', require('./views/v14_2/_routes'))
router.use('/v14_3', require('./views/v14_3/_routes'))
router.use('/v15', require('./views/v15/_routes'))
router.use('/v16_a', require('./views/v16_a/_routes'))
router.use('/v16_b', require('./views/v16_b/_routes'))
router.use('/v17', require('./views/v17/_routes'))
//router.use('/v18', require('./views/v18/_routes'))

// V18 routes
router.use('/v18/', (req, res, next) => {
  //req.session.data["entered-criteria"] = undefined;
  return require(`./views/v18/_routes`)(req, res, next);
})


module.exports = router

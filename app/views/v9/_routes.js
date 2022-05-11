const express = require('express')
const router = express.Router()





router.get('*', function(req, res, next){
  res.locals['serviceName'] = 'Move and track waste'
  next()
});




router.get('/index', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})





// Combining the options

router.get('/new-option-1', function (req, res) {

  req.session.data['win_type'] = 'option-1'
  res.redirect( 'reset-win' )

})


router.get('/new-option-2', function (req, res) {

  req.session.data['win_type'] = 'option-2'
  req.session.data['cover_note'] = 'true'
  res.redirect( 'reset-win' )

})


router.get('/reset-win', function (req, res) {

  req.session.data['total_sections'] = '10'
  req.session.data['completed_sections'] = '0'

  // Set up all the section statuses

    // Cannot start yet = 'govuk-tag--grey'
    // Not started = 'govuk-tag--grey'
    // In progress = 'govuk-tag--blue'
    // Completed = ''

  req.session.data['producer_info_status'] = 'Review'
  req.session.data['producer_info_status_class'] = 'govuk-tag--blue'

  req.session.data['sic_info'] = '41201 Construction of commercial buildings'

  req.session.data['pick_up_status'] = 'Not started'
  req.session.data['pick_up_status_class'] = 'govuk-tag--grey'

  req.session.data['carrier_contact_status'] = 'Not started'
  req.session.data['carrier_contact_status_class'] = 'govuk-tag--grey'

  req.session.data['receiver_contact_status'] = 'Not started'
  req.session.data['receiver_contact_status_class'] = 'govuk-tag--grey'

  req.session.data['transportation_info_status'] = 'Not started'
  req.session.data['transportation_info_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_status'] = 'Not started'
  req.session.data['waste_status_class'] = 'govuk-tag--grey'

  req.session.data['ewc_not_found'] = 'false'

  req.session.data['have_waste'] = 'false'

  req.session.data['hazard_status'] = 'Not started'
  req.session.data['hazard_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_stored_status'] = 'Not started'
  req.session.data['waste_stored_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_management_status'] = 'Not started'
  req.session.data['waste_management_status_class'] = 'govuk-tag--grey'

  req.session.data['payment_status'] = 'Cannot start yet'
  req.session.data['payment_status_class'] = 'govuk-tag--grey'

  res.redirect('new-win');

})



router.get('/new-win', function (req, res) {

    var count = 0;

    if(req.session.data['producer_info_status'] == "Completed"){
			count++;
		}

    if(req.session.data['pick_up_status'] == "Completed"){
			count++;
		}

    if(req.session.data['carrier_contact_status'] == "Completed"){
			count++;
		}

    if(req.session.data['receiver_contact_status'] == "Completed"){
			count++;
		}

    if(req.session.data['transportation_info_status'] == "Completed"){
			count++;
		}

    if(req.session.data['waste_status'] == "Completed"){
			count++;
		}

    if(req.session.data['hazard_status'] == "Completed"){
			count++;
		}

    if(req.session.data['waste_stored_status'] == "Completed"){
			count++;
		}

    if(req.session.data['waste_management_status'] == "Completed"){
			count++;
		}

    if(req.session.data['payment_status'] == "Completed"){
			count++;
		}

    res.render( './' + req.originalUrl, {

      'completed_sections' : count

  })
})



// Producer information

router.get('/producer', function (req, res) {

  sic_code = req.session.data['sic_info'].slice(0,5)

  sic_description = req.session.data['sic_info'].slice(5)

  res.render( './' + req.originalUrl, {

    'sic_code' : sic_code,
    'sic_description' : sic_description

  } )
})

router.post('/producer', function(req, res) {
  req.session.data['producer_info_status'] = "Completed";
  req.session.data['producer_info_status_class'] = "";
  res.redirect( 'new-win' );
})



// Pick up information

router.get('/pick-up', function (req, res) {
  // req.session.data['pick_up_status'] = "In progress";
  // req.session.data['pick_up_status_class'] = "govuk-tag--blue";
  res.render( './' + req.originalUrl, {} )
})

router.post('/pick-up', function(req, res) {
  req.session.data['pick_up_status'] = "Completed";
  req.session.data['pick_up_status_class'] = "";
  res.redirect( 'new-win' );
})



// Carrier contact information

router.get('/carrier-contact', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/carrier-contact', function(req, res) {
  req.session.data['carrier_contact_status'] = "Completed";
  req.session.data['carrier_contact_status_class'] = "";
  res.redirect( 'new-win' );
})



// Receiver contact information

router.get('/receiver-contact', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/receiver-contact', function(req, res) {
  req.session.data['receiver_contact_status'] = "Completed";
  req.session.data['receiver_contact_status_class'] = "";
  res.redirect( 'new-win' );
})



// Transportation information

router.get('/transportation', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/transportation', function(req, res) {
  req.session.data['transportation_info_status'] = "Completed";
  req.session.data['transportation_info_status_class'] = "";
  res.redirect( 'new-win' );
})



// Waste

router.get('/waste', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/waste', function(req, res) {
  if( req.session.data['have_waste'] == "true" ){
    res.redirect( 'new-win' )
  } else {
    res.redirect( 'confirm-ewc' );
  }
})





// Confirm EWC code

router.get('/confirm-ewc', function (req, res) {

  var wcn = req.session.data['ewc']
  var ewc_not_found

  console.log('EWC code entered: '+wcn)

  if( wcn != '' ){

    // Apply Postel's law
    // "be conservative in what you do, be liberal in what you accept from others"

    // Remove the asterisk
    wcn = wcn.replace('*','')

    // Remove any spaces - this is using a regex to catch all whitespace
    wcn = wcn.replace(/\s/g,'')

    console.log('Postel applied: '+wcn)

    var ewc_list = require('./ewc-codes.json')

    ewc_list = JSON.parse(JSON.stringify( ewc_list ))

    var ewc_description = "Not found"

        for (let i = 0; i < ewc_list.length; i++ ){

                if ( ewc_list[i].Waste_Code_Normalised.trim().replace('*','') == wcn ){
                  console.log('Found it');
                  ewc_description = ewc_list[i].EWC_Waste_Desc;
                  break;
                }

        }

        console.log('EWC description: '+ewc_description)

        if( ewc_description != "Not found" ){

                //remove the EWC code from the description string
                ewc_description = ewc_description.substring(ewc_description.indexOf(' ') +1)

                // capitalise first letter in description
                ewc_description = ewc_description.charAt(0).toUpperCase() + ewc_description.slice(1)

                req.session.data['ewc_description'] = ewc_description;

                console.log(ewc_description)

                res.render( './' + req.originalUrl, {
                  ewc_description: ewc_description
                })

        } else {

            // not a valid EWC code, need to think about error handling
            req.session.data['ewc_not_found'] = "true"
            console.log('ewc_not_found: '+ewc_not_found)
            res.redirect('waste');

        }


  } else {
    req.session.data['ewc_not_found'] = "true"
    // not a valid EWC code, need to think about error handling
    res.redirect('waste');
  }

})



router.post('/confirm-ewc', function(req, res) {
  req.session.data['waste_status'] = "In progress"
  req.session.data['waste_status_class'] = "govuk-tag--blue"
  req.session.data['have_waste'] = "true"
  res.redirect( 'new-win' );
})


// reset EWC code - quick hack for now

router.get('/reset-ewc', function (req, res){
  req.session.data['have_waste'] = "false"
  res.redirect('waste')
})

// hazard information

router.get('/hazard', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/hazard', function(req, res) {
  req.session.data['hazard_status'] = "Completed";
  req.session.data['hazard_status_class'] = "";
  res.redirect( 'new-win' );
})



// Waste stored information

router.get('/waste-storage', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/waste-storage', function(req, res) {
  req.session.data['waste_stored_status'] = "Completed";
  req.session.data['waste_stored_status_class'] = "";
  res.redirect( 'new-win' );
})



// Waste management information

router.get('/waste-management', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/waste-management', function(req, res) {
  req.session.data['waste_management_status'] = "Completed";
  req.session.data['waste_management_status_class'] = "";
  res.redirect( 'new-win' );
})



// SIC code

router.get('/sic-code', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/sic-code', function(req, res) {
  res.redirect( 'producer' );
})







module.exports = router;

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

  req.session.data['total_sections'] = '11'
  req.session.data['completed_sections'] = '0'

  // Set up all the section statuses

    // Cannot start yet = 'govuk-tag--grey'
    // Not started = 'govuk-tag--grey'
    // In progress = 'govuk-tag--blue'
    // Completed = ''

  req.session.data['producer_info_status'] = 'Review'
  req.session.data['producer_info_status_class'] = 'govuk-tag--blue'

  req.session.data['producer_business_name'] = 'Euromovement Limited'

  req.session.data['sic_info'] = '41201 Construction of commercial buildings'

  req.session.data['pick_up_status'] = 'Not started'
  req.session.data['pick_up_status_class'] = 'govuk-tag--grey'

  req.session.data['pick_up_location'] = ''

  req.session.data['carrier_details_status'] = 'Not started'
  req.session.data['carrier_details_status_class'] = 'govuk-tag--grey'

  req.session.data['carrier_confirmation_status'] = 'Locked'
  req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'

  req.session.data['producer_confirmation_status'] = 'Cannot start yet'
  req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'

  req.session.data['receiver_contact_status'] = 'Not started'
  req.session.data['receiver_contact_status_class'] = 'govuk-tag--grey'

  req.session.data['transportation_info_status'] = 'Not started'
  req.session.data['transportation_info_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_status'] = 'Not started'
  req.session.data['waste_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_produced_status'] = 'Not started'
  req.session.data['waste_produced_status_class'] = 'govuk-tag--grey'

  req.session.data['receiver_confirmation_status'] = 'Locked'
  req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_management_status'] = 'Locked'
  req.session.data['waste_management_status_class'] = 'govuk-tag--grey'

  req.session.data['payment_status'] = 'Cannot start yet'
  req.session.data['payment_status_class'] = 'govuk-tag--grey'


  req.session.data['ewc_not_found'] = 'false'

  req.session.data['have_waste'] = 'false'
  req.session.data['have_hazard'] = 'false'
  req.session.data['have_physical_form'] = 'false'
  req.session.data['have_weight'] = 'false'
  req.session.data['container_asked_for'] = 'false'

  req.session.data['waste_additional_info'] = ''
  req.session.data['component'] = ''
  req.session.data['concentration'] = ''
  req.session.data['hazard_codes'] = ''
  req.session.data['hazard_codes_cya'] = ''
  req.session.data['physical_form'] = ''
  req.session.data['physical_form_cya'] = ''
  req.session.data['weight_cya'] = ''
  req.session.data['container_cya'] = ''

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

    if(req.session.data['waste_produced_status'] == "Completed"){
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


// Producer business name

router.get('/producer-business-name', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/producer-business-name', function(req, res) {
  res.redirect( 'new-win' );
})



// Pick up information

router.get('/pick-up', function (req, res) {
  console.log('Pick up: '+req.session.data['pick_up_location'])
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

router.get('/carrier-details', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/carrier-details', function(req, res) {
  req.session.data['carrier_details_status'] = "Completed";
  req.session.data['carrier_details_status_class'] = "";
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

  if( req.session.data['is_hazardous_waste'] == "true" ){
  }

  res.render( './' + req.originalUrl, {} )

})


router.post('/waste', function(req, res) {
  if( req.session.data['have_waste'] == "true" ){
    res.redirect( 'new-win' )
  } else {
    res.redirect( 'confirm-ewc' );
  }
})



// Waste produced

router.get('/waste-produced', function (req, res) {

  res.render( './' + req.originalUrl, {
    back_link: 'new-win'
  } )

})


router.post('/waste-produced', function(req, res) {
  if( req.session.data['waste-produced'] != "" ){
    req.session.data['waste_produced_status'] = "Completed"
    req.session.data['waste_produced_status_class'] = ""
  }

  res.redirect( 'new-win' );

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
    var is_hazardous_waste = "false"

        for (let i = 0; i < ewc_list.length; i++ ){

                this_wcn = ewc_list[i].Waste_Code_Normalised.trim()

                if( this_wcn.replace('*','') == wcn ){
                  console.log('Found it');
                  ewc_description = ewc_list[i].EWC_Waste_Desc;
                  if( this_wcn.charAt(this_wcn.length-1) == "*" ){
                    req.session.data['is_hazardous_waste'] = "true"
                    console.log("Hazardous waste")
                  } else {
                    req.session.data['is_hazardous_waste'] = "false"
                    console.log("Non-hazardous waste")
                  }
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

  if( req.session.data['waste_additional_info'] == '' ){
    req.session.data['waste_additional_info'] = 'Not provided'
  }

  req.session.data['waste_status'] = "In progress"
  req.session.data['waste_status_class'] = "govuk-tag--blue"
  req.session.data['have_waste'] = "true"

  if( req.session.data['is_hazardous_waste'] == "true" ){
    res.redirect('hazard')
  } else {
    res.redirect( 'new-win' );
  }

})


// change additional details

router.get('/change-additional-details', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/change-additional-details', function(req, res) {

  if( req.session.data['waste_additional_info'] == '' ){
    req.session.data['waste_additional_info'] = 'Not provided'
  }

  res.redirect( 'waste' );
})


// change additional details

router.get('/change-ewc-code', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/change-ewc-code', function(req, res) {
  res.redirect( 'confirm-ewc' );
})





// reset EWC code - quick hack for now

router.get('/reset-ewc', function (req, res){
  req.session.data['have_waste'] = "false"
  res.redirect('waste')
})



// hazard information

router.get('/hazard', function (req, res) {

  if( req.session.data['have_hazard'] == "true" ){
    back_link = 'waste'
  } else {
    back_link = 'confirm-ewc'
  }

  res.render( './' + req.originalUrl, {
    back_link: back_link
  } )
})

router.post('/hazard', function(req, res) {

    req.session.data['have_hazard'] = "true"

    var concentration_component = "Not provided"

    if( req.session.data['component'] != "" ){
      concentration_component = req.session.data['component']
    }

    if( req.session.data['concentration'] != "" ){
      concentration_component = req.session.data['concentration'] + '% ' + concentration_component
    }

    req.session.data['concentration_component'] = concentration_component


    // get the hazard codes the user has entered and put them in an unordered list

      var hazard_codes_cya = 'Not provided'

      console.log( 'Hazard codes: '+req.session.data['hazard_codes'] )

      if( req.session.data['hazard_codes'] != undefined ){

        hazard_codes_cya = '<ul class="govuk-list">'

        for (let i = 0; i < req.session.data['hazard_codes'].length; i++ ){
          hazard_codes_cya = hazard_codes_cya + '<li>' + req.session.data['hazard_codes'][i] + '</li>'
        }

        hazard_codes_cya = hazard_codes_cya + '</ul>'

      }

      console.log( hazard_codes_cya )

      req.session.data['hazard_codes_cya'] = hazard_codes_cya

      if( req.session.data['have_physical_form'] == "true" ){

        res.redirect( 'waste' );

      } else {

        res.redirect( 'physical-form' )

      }

})




// physical-form

router.get('/physical-form', function (req, res) {

  if( req.session.data['have_physical_form'] == "true" ){
    back_link = 'waste'
  } else {
    back_link = 'hazard'
  }

  res.render( './' + req.originalUrl, {
    back_link: back_link
  } )
})


router.post('/physical-form', function(req, res) {
  req.session.data['physical_form_cya'] = "Not provided" // could be tidier!
  if( req.session.data['physical_form'] != "" ){
    req.session.data['physical_form_cya'] = req.session.data['physical_form']
    req.session.data['have_physical_form'] = "true";
  }
  if( req.session.data['have_weight'] == "true "){
    res.redirect( 'waste' )
  } else {
    res.redirect( 'weight' )
  }
})



// weight

router.get('/weight', function (req, res) {

  if( req.session.data['have_weight'] == "true" ){
    back_link = 'waste'
  } else {
    back_link = 'physical-form'
  }

  res.render( './' + req.originalUrl, {
    back_link: back_link
  } )
})


router.post('/weight', function(req, res) {
  req.session.data['weight_cya'] = "Not provided" // could be tidier!
  if( req.session.data['weight'] != "" ){
    req.session.data['weight_cya'] = req.session.data['weight'] + ' kg'
    req.session.data['have_weight'] = "true";
  }
  if( req.session.data['container_asked_for'] == "true "){
    res.redirect( 'waste' )
  } else {
    res.redirect( 'container' )
  }
})


// container

router.get('/container', function (req, res) {

  if( req.session.data['container_asked_for'] == "true" ){
    back_link = 'waste'
  } else {
    back_link = 'weight'
  }

  res.render( './' + req.originalUrl, {
    back_link: back_link
  } )
})


router.post('/container', function(req, res) {
  req.session.data['container_asked_for'] = "true"
  req.session.data['container_cya'] = "Not provided" // could be tidier!
  if( req.session.data['container-type'] != "" ){
    req.session.data['container_cya'] = req.session.data['container-type']
  } else {
    req.session.data['container_cya'] = 'Container type not provided'
  }
  if( req.session.data['container-capacity'] != "" ){
    req.session.data['container_cya'] = req.session.data['container-capacity'] + ' capacity ' + req.session.data['container_cya']
  }
  if( req.session.data['container-quantity'] != "" ){
    req.session.data['container_cya'] = req.session.data['container-quantity'] + ' X ' + req.session.data['container_cya']
  }
  res.redirect( 'waste' );
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

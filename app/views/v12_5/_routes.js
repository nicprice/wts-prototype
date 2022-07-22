const express = require('express')
const router = express.Router()


router.get('*', function(req, res, next){
  res.locals['serviceName'] = 'Move and track waste'
  next()
});



router.get('/index', function (req, res) {
 // res.render( './' + req.originalUrl, {} )
})



router.get('/setup-producer', function (req, res) {
// Clear all the data
 // req.session.data = {}

// Setup the data
  if (req.session.data['first_time'] != 'false') {
    req.session.data['have_waste'] = 'false'
    req.session.data['have_how_waste_produced'] = 'false'
    req.session.data['have_sic_code'] = 'false'
    req.session.data['have_hazard'] = 'false'
    req.session.data['have_physical_form'] = 'false'
    req.session.data['have_weight'] = 'false'
    req.session.data['container_asked_for'] = 'false'
    // so we don't re-set when producer continues a note, rather than start one
    req.session.data['first_time'] = 'false'
  }

// who is signed in
  req.session.data['producer_signed_in'] = 'true'
  req.session.data['carrier_signed_in'] = 'false'
  req.session.data['receiver_signed_in'] = 'false'

  res.redirect( 'setup-win' )
})

router.get('/setup-carrier', function (req, res) {
  req.session.data['producer_signed_in'] = 'false'
  req.session.data['carrier_signed_in'] = 'true'
  req.session.data['receiver_signed_in'] = 'false'

  res.redirect( 'setup-win' )
})

router.get('/setup-receiver', function (req, res) {
  req.session.data['producer_signed_in'] = 'false'
  req.session.data['carrier_signed_in'] = 'false'
  req.session.data['receiver_signed_in'] = 'true'

  res.redirect( 'setup-win' )
})

router.get('/setup-win', function (req, res) {
// Set up the status for each component of the waste information note

  // set the number of sections
  req.session.data['total_sections'] = '12'
  req.session.data['completed_sections'] = '0'

	// Cannot start yet = 'govuk-tag--grey'
	// Not started = 'govuk-tag--grey'
	// Locked = 'govuk-tag--grey'
	// In progress = 'govuk-tag--blue'
	// Completed = ''

  // for the producer
  if (req.session.data['producer_signed_in'] == 'true') {
    if (req.session.data['waste_details_status'] == 'Completed') {
      req.session.data['waste_details_status_class'] = ''
    } else {
      req.session.data['waste_details_status'] = 'Not started'
      req.session.data['waste_details_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['how_waste_produced_status'] == 'Completed') {
      req.session.data['how_waste_produced_status_class'] = ''
    } else {
      req.session.data['how_waste_produced_status'] = 'Not started'
      req.session.data['how_waste_produced_status_class'] = 'govuk-tag--grey'
    }

	  if (req.session.data['producer_details_status'] == 'Completed') {
	    req.session.data['producer_details_status_class'] = ''
	  } else {
      req.session.data['producer_details_status'] = 'Review'
      req.session.data['producer_details_status_class'] = 'govuk-tag--blue'
      req.session.data['producer_business_name'] = 'Zathunicon'
	  }

    if (req.session.data['pick_up_status'] == 'Completed') {
      req.session.data['pick_up_status_class'] = ''
    } else {
      req.session.data['pick_up_status'] = 'Not started'
      req.session.data['pick_up_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['receiver_details_status'] == 'Completed') {
      req.session.data['receiver_details_status_class'] = ''
    } else {
      req.session.data['receiver_details_status'] = 'Not started'
      req.session.data['receiver_details_status_class'] = 'govuk-tag--grey'
    }

    req.session.data['payment_status'] = 'Cannot start yet'
    req.session.data['payment_status_class'] = 'govuk-tag--grey'

    if (req.session.data['carrier_details_status'] == 'Completed') {
      req.session.data['carrier_details_status'] = 'Review'
      req.session.data['carrier_details_status_class'] = 'govuk-tag--blue'
    } else {
      req.session.data['carrier_details_status'] = 'Locked'
      req.session.data['carrier_details_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['transportation_info_status'] == 'Completed') {
      req.session.data['transportation_info_status'] = 'Review'
      req.session.data['transportation_info_status_class'] = 'govuk-tag--blue'
    } else {
      req.session.data['transportation_info_status'] = 'Locked'
      req.session.data['transportation_info_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['carrier_confirmation_status'] == 'Completed') {
      req.session.data['carrier_confirmation_status_class'] = ''
    } else {
      req.session.data['carrier_confirmation_status'] = 'Locked'
      req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['producer_confirmation_status'] == 'Completed') {
      req.session.data['producer_confirmation_status_class'] = ''
    } else if ((req.session.data['waste_details_status'] == "Completed") &&
          (req.session.data['how_waste_produced_status'] == "Completed") &&
          (req.session.data['producer_details_status'] == "Completed") &&
          (req.session.data['pick_up_status'] == "Completed") &&
          (req.session.data['receiver_details_status'] == "Completed") &&
          (req.session.data['carrier_details_status'] == "Completed") &&
          (req.session.data['transportation_info_status'] == "Completed")) {
      req.session.data['producer_confirmation_status'] = 'Not started'
      req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
    } else {
      req.session.data['producer_confirmation_status'] = 'Cannot start yet'
      req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['receiver_confirmation_status'] == 'Completed') {
      req.session.data['receiver_confirmation_status_class'] = ''
    } else {
      req.session.data['receiver_confirmation_status'] = 'Locked'
      req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['recovery_code_status'] == 'Completed') {
      req.session.data['recovery_code_status_class'] = ''
    } else {
      req.session.data['recovery_code_status'] = 'Locked'
      req.session.data['recovery_code_status_class'] = 'govuk-tag--grey'
    }
	}

	// for the carrier
	else if (req.session.data['carrier_signed_in'] == 'true') {
	  if (req.session.data['waste_details_status'] == 'Completed') {
	    req.session.data['waste_details_status'] = 'Review'
      req.session.data['waste_details_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['how_waste_produced_status'] == 'Completed') {
      req.session.data['how_waste_produced_status'] = 'Review'
      req.session.data['how_waste_produced_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['pick_up_status'] == 'Completed') {
      req.session.data['pick_up_status'] = 'Review'
      req.session.data['pick_up_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['receiver_details_status'] == 'Completed') {
      req.session.data['receiver_details_status'] = 'Review'
      req.session.data['receiver_details_status_class'] = 'govuk-tag--blue'
    }

	  if (req.session.data['carrier_details_status'] == 'Completed') {
	    req.session.data['carrier_details_status_class'] = ''
	  } else {
      req.session.data['carrier_details_status'] = 'Review'
      req.session.data['carrier_details_status_class'] = 'govuk-tag--blue'
      req.session.data['carrier_business_name'] = 'Boxes in a Flash'
	  }

    req.session.data['transportation_info_status'] = 'Not started'
    req.session.data['transportation_info_status_class'] = 'govuk-tag--grey'

    if (req.session.data['carrier_confirmation_status'] == 'Completed') {
      req.session.data['carrier_confirmation_status_class'] = ''
    } else if ((req.session.data['carrier_details_status'] == "Completed") &&
              (req.session.data['transportation_info_status'] == "Completed") &&
              (req.session.data['carrier_confirmation_status'] == 'Completed')) {
      req.session.data['carrier_confirmation_status'] = 'Not started'
      req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
    } else {
      req.session.data['carrier_confirmation_status'] = 'Cannot start yet'
      req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
    }

	  if (req.session.data['producer_confirmation_status'] == 'Completed') {
	    req.session.data['producer_details_status_class'] = ''
	  } else {
      req.session.data['producer_confirmation_status'] = 'Locked'
      req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['receiver_confirmation_status'] == 'Completed') {
      req.session.data['receiver_confirmation_status_class'] = ''
    } else {
      req.session.data['receiver_confirmation_status'] = 'Locked'
      req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['recovery_code_status'] == 'Completed') {
      req.session.data['recovery_code_status_class'] = ''
    } else {
      req.session.data['recovery_code_status'] = 'Locked'
      req.session.data['recovery_code_status_class'] = 'govuk-tag--grey'
    }
  }

	// for the receiver
  else if (req.session.data['receiver_signed_in'] == 'true') {
	  if (req.session.data['waste_details_status'] == 'Completed') {
	    req.session.data['waste_details_status'] = 'Review'
      req.session.data['waste_details_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['how_waste_produced_status'] == 'Completed') {
      req.session.data['how_waste_produced_status'] = 'Review'
      req.session.data['how_waste_produced_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['receiver_details_status'] == 'Completed') {
      req.session.data['receiver_details_status'] = 'Review'
      req.session.data['receiver_details_status_class'] = 'govuk-tag--blue'
    }

	  if (req.session.data['carrier_details_status'] == 'Completed') {
      req.session.data['carrier_details_status'] = 'Review'
      req.session.data['carrier_details_status_class'] = 'govuk-tag--blue'
	  }

    if (req.session.data['transportation_info_status'] == 'Completed') {
      req.session.data['transportation_info_status'] = 'Review'
      req.session.data['transportation_info_status_class'] = 'govuk-tag--blue'
    }

    if (req.session.data['carrier_confirmation_status'] == 'Completed') {
      req.session.data['carrier_confirmation_status_class'] = ''
    } else {
      req.session.data['carrier_confirmation_status'] = 'Locked'
      req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
    }

  	if (req.session.data['producer_confirmation_status'] == 'Completed') {
  	  req.session.data['producer_details_status_class'] = ''
  	}
  	else {
      req.session.data['producer_confirmation_status'] = 'Locked'
      req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['receiver_confirmation_status'] == 'Completed') {
      req.session.data['receiver_confirmation_status_class'] = ''
    } else if ((req.session.data['producer_confirmation_status'] == 'Completed') &&
              (req.session.data['recovery_code_status'] == 'Completed')) {
      req.session.data['receiver_confirmation_status'] = 'Not started'
      req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'
    } else {
      req.session.data['receiver_confirmation_status'] = 'Cannot start yet'
      req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'
    }

  	if (req.session.data['recovery_code_status'] == 'Completed') {
  	  req.session.data['recovery_code_status'] = ''
  	} else {
      req.session.data['recovery_code_status'] = 'Not started'
      req.session.data['recovery_code_status_class'] = 'govuk-tag--grey'
    }
  }

  res.redirect( 'waste-info-note' )
})


router.get('/waste-info-note', function (req, res) {
  // allow carrier to confirm and sign his part of the duty of care
  if (req.session.data['carrier_confirmation_status'] == 'Completed') {
    req.session.data['carrier_confirmation_status_class'] = ''
  } else if ((req.session.data['waste_details_status'] == "Completed") && (req.session.data['how_waste_produced_status']== "Completed")
        && (req.session.data['producer_details_status'] == "Completed") && (req.session.data['pick_up_status'] == "Completed")
        && (req.session.data['receiver_details_status'] == "Completed") && (req.session.data['carrier_details_status'] == "Completed")
        && (req.session.data['transportation_info_status'] == "Completed")) {
    req.session.data['carrier_confirmation_status'] = 'Not started'
    req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
  }

  // allow producer to confirm and sign his part of the duty of care
  if (req.session.data['producer_confirmation_status'] == 'Completed') {
    req.session.data['producer_confirmation_status_class'] = ''
  } else if ((req.session.data['carrier_details_status'] == "Completed") && (req.session.data['transportation_info_status'] == "Completed")
        && (req.session.data['carrier_confirmation_status'] == 'Completed')) {
    req.session.data['producer_confirmation_status'] = 'Not started'
    req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
  }

  // allow receiver to confirm and sign his part of the duty of care
  if (req.session.data['receiver_confirmation_status'] == 'Completed') {
    req.session.data['receiver_confirmation_status_class'] = ''
  } else if ((req.session.data['producer_confirmation_status'] == 'Completed') && (req.session.data['recovery_code_status'] == 'Completed')) {
    req.session.data['receiver_confirmation_status'] = 'Not started'
    req.session.data['receiver_confirmation_status_class'] = 'govuk-tag--grey'
  }

  // Count how many sections the user has completed in the task list
  var count = 0;

  if (req.session.data['waste_details_status'] == "Completed"){
		count++;
	}
	if (req.session.data['how_waste_produced_status'] == "Completed"){
		count++;
	}
  if (req.session.data['producer_details_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['pick_up_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['receiver_details_status'] == "Completed"){
	  count++;
  }
	if (req.session.data['payment_status'] == "Completed"){
		count++;
	}
  if (req.session.data['carrier_details_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['transportation_info_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['carrier_confirmation_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['producer_confirmation_status'] == "Completed"){
	  count++;
  }
  if (req.session.data['receiver_confirmation_status'] == "Completed"){
	  count++;
  }
	if (req.session.data['recovery_code_status'] == "Completed"){
		count++;
	}

	res.render( './' + req.originalUrl, {
	  'completed_sections' : count
  })
})




// Order in this version:
// About the waste
// - Waste details
// - How the waste was produced
// - Producer contact details
// - Pick up location
// - Receiver contact details

// Fees
// - Payment

// Waste collection
// - Carrier contact details
// - Transportation
// - Carrier confirmation
// - Producer confirmation

// Waste delivery
// - Receiver confirmation
// - Recovery or disposal



// ABOUT THE WASTE
// Waste details

// This page starts by asking for the EWC code
// Once we have a valid EWC code, the page becomes a 'Check answers' playing back what the user has provided
router.get('/waste', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/waste', function(req, res) {
  if (req.session.data['have_waste'] == "true" ){

    // if we have all aspects of the waste, then set status as complete
    if ((req.session.data['have_hazard'] == 'true') && (req.session.data['have_physical_form'] == 'true') &&
        (req.session.data['have_weight'] == 'true') && (req.session.data['container_asked_for'] == 'true')) {
      req.session.data['waste_details_status'] = "Completed"
      req.session.data['waste_details_status_class'] = ""
    } else { // else set status as in progress
      req.session.data['waste_details_status'] = "In progress"
      req.session.data['waste_details_status_class'] = "govuk-tag--blue"
    }

    req.session.data['have_waste'] = "true"
	  res.redirect( 'waste-info-note' )

  } else {
	  res.redirect( 'confirm-ewc' );
  }
})



// Confirm EWC code
router.get('/confirm-ewc', function (req, res) {
  var wcn = req.session.data['ewc']
  var ewc_provided

 // console.log('EWC code entered: '+wcn)

  // if an EWC code was entered...
  if (wcn != '' ){
    // Apply Postel's law: "be conservative in what you do, be liberal in what you accept from others"

    // Remove the asterisk
    wcn = wcn.replace('*','')

    // Remove any spaces - this is using a regex to catch all whitespace
    wcn = wcn.replace(/\s/g,'')

   // console.log('Postel applied: '+wcn)

    // This may not be the most elegant or efficient way of getting the JSON data, but it works for now
    var ewc_list = require('./ewc-codes.json')
    ewc_list = JSON.parse(JSON.stringify( ewc_list ))
    var ewc_description = "Not found"
    var is_hazardous_waste = "false"

    for (let i = 0; i < ewc_list.length; i++ ){
      this_wcn = ewc_list[i].Waste_Code_Normalised.trim()

      if (this_wcn.replace('*','') == wcn ){
    //    console.log('Found it');
        ewc_description = ewc_list[i].EWC_Waste_Desc;

        if (this_wcn.charAt(this_wcn.length-1) == "*" ){
          req.session.data['is_hazardous_waste'] = "true"
      //    console.log("Hazardous waste")
        } else {
          req.session.data['is_hazardous_waste'] = "false"
       //   console.log("Non-hazardous waste")
        }

        break;
      }
    } // end the for loop

   // console.log('EWC description: '+ewc_description)

    // If we found the EWC code and description, tidy the description to remove the code from the start and add a capital letter.
    if (ewc_description != "Not found" ){
      //remove the EWC code from the description string
      ewc_description = ewc_description.substring(ewc_description.indexOf(' ') +1)

      // capitalise first letter in description
      ewc_description = ewc_description.charAt(0).toUpperCase() + ewc_description.slice(1)
      req.session.data['ewc_description'] = ewc_description;

    //  console.log(ewc_description)

      res.render( './' + req.originalUrl, {
        ewc_description: ewc_description
      })

    } else {
      // not a valid EWC code, need to think about error handling
      req.session.data['ewc_provided'] = "false"
    //  console.log('ewc_provided: '+ewc_provided)
      res.redirect('waste');
    }

  // If there was no EWC code entered
  } else {
	  req.session.data['ewc_provided'] = "false"
	  // not a valid EWC code, need to think about error handling
	  res.redirect('waste');
  }
})

router.post('/confirm-ewc', function(req, res) {
  if (req.session.data['waste_additional_info'] == ''){
	  req.session.data['waste_additional_info_cya'] = 'Not provided'
  } else {
    req.session.data['waste_additional_info_cya'] = req.session.data['waste_additional_info']
  }

  req.session.data['waste_details_status'] = "In progress"
  req.session.data['waste_details_status_class'] = "govuk-tag--blue"
  req.session.data['have_waste'] = "true"

  if( req.session.data['is_hazardous_waste'] == "true" ){
    // This is hazardous waste so let's ask for the hazard information
    res.redirect('hazard')
  } else {
    // This is non-hazardous waste, so for now we'll return the user to the task list
    res.redirect( 'waste-info-note' );
  }
})

// change additional details
router.get('/change-additional-details', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/change-additional-details', function(req, res) {
  if( req.session.data['waste_additional_info'] == '' ){
	  req.session.data['waste_additional_info_cya'] = 'Not provided'
  } else {
    req.session.data['waste_additional_info_cya'] = req.session.data['waste_additional_info']
  }

  res.redirect( 'waste' );
})

// change EWC code
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
  // Set up the back link depending on whether we've come from the previous page or the 'Check answers'
  // Bit hacky, but it works for now
  // Have done the same with all the other parts of the 'Waste details' questions
  if  (req.session.data['have_hazard'] == "true" ){
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

	if (req.session.data['component'] != "" ){
	  concentration_component = req.session.data['component']
	}

	if (req.session.data['concentration'] != "" ){
	  concentration_component = req.session.data['concentration'] + '% ' + concentration_component
	}

	req.session.data['concentration_component'] = concentration_component

	// get the hazard codes the user has entered and put them in an unordered list
	var hazard_codes_cya = 'Not provided'

	//console.log( 'Hazard codes: '+req.session.data['hazard_codes'] )

	if (req.session.data['hazard_codes'] != undefined ){
		// We have at least one hazard code, so let's loop through the array and add them to an unordered list
		// We'll make the cya (Check your answers) variables available for the 'Check answers' version of the waste details page
		hazard_codes_cya = '<ul class="govuk-list">'

		for (let i = 0; i < req.session.data['hazard_codes'].length; i++ ){
		  hazard_codes_cya = hazard_codes_cya + '<li>' + req.session.data['hazard_codes'][i] + '</li>'
		}

		hazard_codes_cya = hazard_codes_cya + '</ul>'
	}

//	console.log( hazard_codes_cya )

	req.session.data['hazard_codes_cya'] = hazard_codes_cya

	if (req.session.data['have_physical_form'] == "true" ){
		res.redirect( 'waste' );
	} else {
		res.redirect( 'physical-form' )
	}
})


// physical-form
router.get('/physical-form', function (req, res) {
  if (req.session.data['have_physical_form'] == "true" ){
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

  if (req.session.data['physical_form'] != "" ){
	  req.session.data['physical_form_cya'] = req.session.data['physical_form']
	  req.session.data['have_physical_form'] = "true";
  }
  if (req.session.data['have_weight'] == "true "){
	  res.redirect( 'waste' )
  } else {
	  res.redirect( 'weight' )
  }
})


// weight
router.get('/weight', function (req, res) {
  if (req.session.data['have_weight'] == "true" ){
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

  if (req.session.data['weight'] != "" ){
	  req.session.data['weight_cya'] = req.session.data['weight'] + ' kg'
	  req.session.data['have_weight'] = "true";
  }
  if (req.session.data['container_asked_for'] == "true "){
	  res.redirect( 'waste' )
  } else {
	  res.redirect( 'container' )
  }
})


// container
router.get('/container', function (req, res) {
  if (req.session.data['container_asked_for'] == "true" ){
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

  if (req.session.data['container-type'] != "" ){
	  req.session.data['container_cya'] = req.session.data['container-type']
  } else {
	  req.session.data['container_cya'] = 'Container type not provided'
  }
  if (req.session.data['container-capacity'] != "" ){
	  req.session.data['container_cya'] = req.session.data['container-capacity'] + ' capacity ' + req.session.data['container_cya']
  }
  if (req.session.data['container-quantity'] != "" ){
	  req.session.data['container_cya'] = req.session.data['container-quantity'] + ' X ' + req.session.data['container_cya']
  }

  res.redirect( 'waste' );
})



// How the waste was produced
// Waste produced
router.get('/waste-produced', function (req, res) {
  res.render( './' + req.originalUrl, {
	  back_link: 'waste-info-note'
  } )
})

router.post('/waste-produced', function(req, res) {
  if (req.session.data['how_waste_produced'] != ""){
	  req.session.data['have_how_waste_produced'] = "true"
	}

  res.redirect( 'sic-code');
})

// SIC code
router.post('/sic-code', function(req, res) {
  if (req.session.data['sic_info'] != ""){
    req.session.data['sic_code'] = req.session.data['sic_info'].slice(0,5)
    req.session.data['sic_description'] = req.session.data['sic_info'].slice(5)
    req.session.data['have_sic_code'] = "true"

    if (req.session.data['have_how_waste_produced'] == "true"){
      req.session.data['how_waste_produced_status'] = "Completed"
      req.session.data['how_waste_produced_status_class'] = ""
    } else {
      req.session.data['how_waste_produced_status'] = "In progress"
      req.session.data['how_waste_produced_status_class'] = "govuk-tag--blue"
    }
  }

  res.redirect( 'waste-info-note' );
})



// Producer contact details
router.get('/producer', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/producer', function(req, res) {
  req.session.data['producer_details_status'] = "Completed";
  req.session.data['producer_details_status_class'] = "";

  res.redirect( 'waste-info-note' );
})



// Producer business name
// Right now this is the only bit of data the user can change in the 'Producer contact details' page
router.get('/producer-business-name', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/producer-business-name', function(req, res) {
  res.redirect( 'waste-info-note' );
})



// Pick up information
router.get('/pick-up', function (req, res) {
 // console.log('Pick up: '+req.session.data['pick_up_location'])
  // req.session.data['pick_up_status'] = "In progress";
  // req.session.data['pick_up_status_class'] = "govuk-tag--blue";
  res.render( './' + req.originalUrl, {} )
})

router.post('/pick-up', function(req, res) {
  if (req.session.data['pic_up_location'] != ""){
    req.session.data['pick_up_status'] = "Completed";
    req.session.data['pick_up_status_class'] = "";
  } else {
    req.session.data['how_waste_produced_status'] = "In progress"
    req.session.data['how_waste_produced_status_class'] = "govuk-tag--blue"
  }

  res.redirect( 'waste-info-note' );
})



// Carrier contact information
router.get('/carrier-details', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/carrier-details', function(req, res) {
  req.session.data['carrier_details_status'] = "Completed";
  req.session.data['carrier_details_status_class'] = "";

  res.redirect( 'waste-info-note' );
})



// Receiver contact information
router.get('/receiver-contact', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/receiver-contact', function(req, res) {
  req.session.data['receiver_details_status'] = "Completed";
  req.session.data['receiver_details_status_class'] = "";

  // go to page to select the address
  res.redirect( 'receiver-address' );
 // res.redirect( 'waste-info-note' );
})

router.post('/receiver-address', function(req, res) {
  req.session.data['receiver_details_status'] = "Completed";
  req.session.data['receiver_details_status_class'] = "";

  // go to the page to continue adding details
  res.redirect( 'receiver-details' );
})

router.post('/receiver-address-manual', function(req, res) {
  req.session.data['receiver_details_status'] = "Completed";
  req.session.data['receiver_details_status_class'] = "";

  // go to the page to continue adding details
  res.redirect( 'receiver-details' );
})

router.post('/receiver-details', function(req, res) {
  req.session.data['receiver_details_status'] = "Completed";
  req.session.data['receiver_details_status_class'] = "";

  // return to the win
  res.redirect( 'waste-info-note' );
})



// Transportation information
router.get('/transportation', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/transportation', function(req, res) {
  req.session.data['transportation_info_status'] = "Completed";
  req.session.data['transportation_info_status_class'] = "";

  res.redirect( 'waste-info-note' );
})

router.post('/transportation-check-answers', function(req, res) {
  req.session.data['transportation_info_status'] = "Completed";
  req.session.data['transportation_info_status_class'] = "";

  res.redirect( 'waste-info-note' );
})


// Carrier confirmation
router.get('/carrier-confirmation', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/carrier-confirmation', function(req, res) {
  req.session.data['carrier_confirmation_status'] = 'Completed';
  req.session.data['carrier_confirmation_status_class'] = "";

  res.redirect( 'waste-info-note' );
})



// producer confirmation
router.get('/producer-confirmation', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/producer-confirmation', function(req, res) {
  req.session.data['producer_confirmation_status'] = "Completed";
  req.session.data['producer_confirmation_status_class'] = "";

  res.redirect( 'waste-info-note' );
})



// Waste management information
router.get('/waste-management', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/waste-management', function(req, res) {
  if (req.session.data['recovery_code'] != ""){
    req.session.data['recovery_code_status'] = "Completed";
    req.session.data['recovery_code_status_class'] = "";

  } else {
    req.session.data['recovery_code_status'] = "In progress";
    req.session.data['recovery_code_status_class'] = "govuk-tag--blue";
  }

  res.redirect( 'waste-info-note' );
})

router.post('/waste-management-check-answers', function(req, res) {
  res.redirect( 'waste-info-note' );
})


// receiver confirmation
router.get('/receiver-confirmation', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/receiver-confirmation', function(req, res) {
  req.session.data['receiver_confirmation_status'] = "Completed";
  req.session.data['receiver_confirmation_status_class'] = "";

  res.redirect( 'waste-info-note' );
})




module.exports = router;

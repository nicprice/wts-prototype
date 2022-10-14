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
  // Setup the data
  if (req.session.data['first_time'] != 'false') {
    // Clear all data
    req.session.data = {}

    // initiate for first time/restart
    req.session.data['have_waste'] = 'false'
    req.session.data['have_how_waste_produced'] = 'false'
    req.session.data['have_sic_code'] = 'false'
    req.session.data['have_hazard'] = 'false'
    req.session.data['have_physical_form'] = 'false'
    req.session.data['have_weight'] = 'false'
    req.session.data['container_asked_for'] = 'false'

    req.session.data['producer_full_address'] = '';
    req.session.data['producer_address_line_1'] = 'Unit 15';
    req.session.data['producer_address_line_2'] = 'Berryedge Park';
    req.session.data['producer_address_town'] = 'Dunstable';
    req.session.data['producer_address_county'] = 'Bedfordshire';
    req.session.data['producer_postcode'] = 'LU5 4AX';
    req.session.data['producer_full_address_cya'] = '<ul class="govuk-list"><li>Unit 15</li><li>Dunstble</li><li>LU5 4AX</li></ul>'
    req.session.data['producer_contact_cya'] = '<ul class="govuk-list"><li>roger@Zathunicon.com</li><li>07123 456789</li>'

    req.session.data['receiver_full_address'] = '';
    req.session.data['receiver_address_line_1'] = '';
    req.session.data['receiver_address_line_2'] = '';
    req.session.data['receiver_address_town'] = '';
    req.session.data['receiver_address_county'] = '';

    req.session.data['waste_details_status'] = 'Not started'
    req.session.data['waste_details_status_class'] = 'govuk-tag--grey'
    req.session.data['how_waste_produced_status'] = 'Not started'
    req.session.data['how_waste_produced_status_class'] = 'govuk-tag--grey'
    req.session.data['producer_details_status'] = 'Not started'
    req.session.data['producer_details_status_class'] = 'govuk-tag--grey'
    req.session.data['pick_up_status'] = 'Not started'
    req.session.data['pick_up_status_class'] = 'govuk-tag--grey'
    req.session.data['receiver_details_status'] = 'Not started'
    req.session.data['receiver_details_status_class'] = 'govuk-tag--grey'
    req.session.data['payment_status'] = 'Cannot start yet'
    req.session.data['payment_status_class'] = 'govuk-tag--grey'

    // initiate variables that are used as conditions to display information in the WIN. If we don't do this we get a blank line
    req.session.data['producer_business_name'] = ''
    req.session.data['receiver_business_name'] = ''
    req.session.data['pick_up_location'] = ''
    req.session.data['carrier_business_name'] = ''
    req.session.data['transport_type'] = ''

    // so we know the who started the note
    req.session.data['who_started'] = 'producer'

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
  // Setup the data
  if (req.session.data['first_time'] != 'false') {
    // Clear all data
    req.session.data = {}

    // initiate for first time/restart
    req.session.data['have_waste'] = 'false'
    req.session.data['have_how_waste_produced'] = 'false'
    req.session.data['have_sic_code'] = 'false'
    req.session.data['have_hazard'] = 'false'
    req.session.data['have_physical_form'] = 'false'
    req.session.data['have_weight'] = 'false'
    req.session.data['container_asked_for'] = 'false'

    req.session.data['producer_full_address'] = '';
    req.session.data['producer_address_line_1'] = '';
    req.session.data['producer_address_line_2'] = '';
    req.session.data['producer_address_town'] = '';
    req.session.data['producer_address_county'] = '';
    req.session.data['receiver_full_address'] = '';
    req.session.data['receiver_address_line_1'] = '';
    req.session.data['receiver_address_line_2'] = '';
    req.session.data['receiver_address_town'] = '';
    req.session.data['receiver_address_county'] = '';

    req.session.data['waste_details_status'] = 'Not started'
    req.session.data['waste_details_status_class'] = 'govuk-tag--grey'
    req.session.data['how_waste_produced_status'] = 'Not started'
    req.session.data['how_waste_produced_status_class'] = 'govuk-tag--grey'
    req.session.data['producer_details_status'] = 'Not started'
    req.session.data['producer_details_status_class'] = 'govuk-tag--grey'
    req.session.data['pick_up_status'] = 'Not started'
    req.session.data['pick_up_status_class'] = 'govuk-tag--grey'
    req.session.data['receiver_details_status'] = 'Not started'
    req.session.data['receiver_details_status_class'] = 'govuk-tag--grey'
    req.session.data['payment_status'] = 'Cannot start yet'
    req.session.data['payment_status_class'] = 'govuk-tag--grey'

    // initiate variables that are used as conditions to display information in the WIN. If we don't do this we get a blank line
    req.session.data['producer_business_name'] = ''
    req.session.data['receiver_business_name'] = ''
    req.session.data['pick_up_location'] = ''
    req.session.data['carrier_business_name'] = ''
    req.session.data['transport_type'] = ''

    // so we know the who started the note
    req.session.data['who_started'] = 'carrier'

    // so we don't re-set when carrier continues a note, rather than start one
    req.session.data['first_time'] = 'false'
  }

  // set-up user
  req.session.data['producer_signed_in'] = 'false'
  req.session.data['carrier_signed_in'] = 'true'
  req.session.data['receiver_signed_in'] = 'false'

  res.redirect( 'setup-win' )
})

router.get('/setup-receiver', function (req, res) {
  // Setup the data
  if (req.session.data['first_time'] != 'false') {
    // Clear all data
    req.session.data = {}

    // initiate for first time/restart
    req.session.data['have_waste'] = 'false'
    req.session.data['have_how_waste_produced'] = 'false'
    req.session.data['have_sic_code'] = 'false'
    req.session.data['have_hazard'] = 'false'
    req.session.data['have_physical_form'] = 'false'
    req.session.data['have_weight'] = 'false'
    req.session.data['container_asked_for'] = 'false'

    req.session.data['producer_full_address'] = '';
    req.session.data['producer_address_line_1'] = '';
    req.session.data['producer_address_line_2'] = '';
    req.session.data['producer_address_town'] = '';
    req.session.data['producer_address_county'] = '';
    req.session.data['receiver_full_address'] = '';
    req.session.data['receiver_address_line_1'] = '';
    req.session.data['receiver_address_line_2'] = '';
    req.session.data['receiver_address_town'] = '';
    req.session.data['receiver_address_county'] = '';

    req.session.data['waste_details_status'] = 'Not started'
    req.session.data['waste_details_status_class'] = 'govuk-tag--grey'
    req.session.data['how_waste_produced_status'] = 'Not started'
    req.session.data['how_waste_produced_status_class'] = 'govuk-tag--grey'
    req.session.data['producer_details_status'] = 'Not started'
    req.session.data['producer_details_status_class'] = 'govuk-tag--grey'
    req.session.data['pick_up_status'] = 'Not started'
    req.session.data['pick_up_status_class'] = 'govuk-tag--grey'
    req.session.data['receiver_details_status'] = 'Not started'
    req.session.data['receiver_details_status_class'] = 'govuk-tag--grey'
    req.session.data['payment_status'] = 'Cannot start yet'
    req.session.data['payment_status_class'] = 'govuk-tag--grey'

    // initiate variables that are used as conditions to display information in the WIN. If we don't do this we get a blank line
    req.session.data['producer_business_name'] = ''
    req.session.data['receiver_business_name'] = ''
    req.session.data['pick_up_location'] = ''
    req.session.data['carrier_business_name'] = ''
    req.session.data['transport_type'] = ''

    // so we know the who started the note
    req.session.data['who_started'] = 'receiver'

    // so we don't re-set when carrier continues a note, rather than start one
    req.session.data['first_time'] = 'false'
  }

  // set-up user
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
      if (req.session.data['who_started'] == 'producer') {
        req.session.data['waste_details_status_class'] = ''
      } else {
        req.session.data['waste_details_status'] = 'Review'
        req.session.data['waste_details_status_class'] = 'govuk-tag--blue'
      }
    } else if (req.session.data['waste_details_status'] == 'In progress') {
      req.session.data['waste_details_status_class'] = 'govuk-tag--blue'
    } else {
      req.session.data['waste_details_status'] = 'Not started'
      req.session.data['waste_details_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['how_waste_produced_status'] == 'Completed') {
      if (req.session.data['who_started'] == 'producer') {
        req.session.data['how_waste_produced_status_class'] = ''
      } else {
        req.session.data['how_waste_produced_status'] = 'Review'
        req.session.data['how_waste_produced_status_class'] = 'govuk-tag--blue'
      }
    } else {
      req.session.data['how_waste_produced_status'] = 'Not started'
      req.session.data['how_waste_produced_status_class'] = 'govuk-tag--grey'
    }

	  if (req.session.data['producer_details_status'] == 'Completed') {
      if (req.session.data['who_started'] == 'producer') {
        req.session.data['producer_details_status_class'] = ''
      } else {
        req.session.data['producer_details_status'] = 'Review'
        req.session.data['producer_details_status_class'] = 'govuk-tag--blue'
      }
	  } else {
      req.session.data['producer_details_status'] = 'Review'
      req.session.data['producer_details_status_class'] = 'govuk-tag--blue'
      req.session.data['producer_business_name'] = 'Zathunicon'
	  }

    if (req.session.data['pick_up_status'] == 'Completed') {
      if (req.session.data['who_started'] == 'producer') {
        req.session.data['pick_up_status_class'] = ''
      } else {
        req.session.data['pick_up_status'] = 'Review'
        req.session.data['pick_up_status_class'] = 'govuk-tag--blue'
      }
    } else {
      req.session.data['pick_up_status'] = 'Not started'
      req.session.data['pick_up_status_class'] = 'govuk-tag--grey'
    }

    if (req.session.data['receiver_details_status'] == 'Completed') {
      if (req.session.data['who_started'] == 'producer') {
        req.session.data['receiver_details_status_class'] = ''
      } else {
        req.session.data['receiver_details_status'] = 'Review'
        req.session.data['receiver_details_status_class'] = 'govuk-tag--blue'
      }
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
        ewc_description = ewc_list[i].EWC_Waste_Desc;

        if (this_wcn.charAt(this_wcn.length-1) == "*" ){
          req.session.data['is_hazardous_waste'] = "true"
        } else {
          req.session.data['is_hazardous_waste'] = "false"
        }

        break;
      }// end the for loop
    }

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
	  res.redirect('confirm-ewc')
  } else {
    req.session.data['waste_details_status'] = "In progress"
    req.session.data['waste_details_status_class'] = "govuk-tag--blue"
    req.session.data['have_waste'] = "true"

    if( req.session.data['is_hazardous_waste'] == "true" ){
      // This is hazardous waste so let's ask for the hazard information
      res.redirect('hazard-component')
    } else {
      // This is non-hazardous waste, so for now we'll return the user to the task list
      res.redirect( 'waste-info-note' );
    }
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
router.get('/hazard-component', function (req, res) {
  // Set up the back link depending on whether we've come from the previous page or the 'Check answers'
  if  (req.session.data['have_hazard'] == "true" ){
	  back_link = 'waste'
  } else {
	  back_link = 'confirm-ewc'
  }

  res.render( './' + req.originalUrl, {
	  back_link: back_link
  } )
})

router.post('/hazard-component', function(req, res) {
	req.session.data['have_hazard'] = "true"

  res.redirect('hazard-code');
})

router.post('/hazard-code', function(req, res) {
	// get the hazard codes the user has entered and put them in an unordered list
	var hazard_codes_cya = 'Not provided'
	var concentration_cya = 'Not provided'

	if (req.session.data['hazard_codes'] != undefined ){
		// We have at least one hazard code, so let's loop through the array and add them to an unordered list
		// We'll make the cya (Check your answers) variables available for the 'Check answers' version of the waste details page
		hazard_codes_cya = ''
		concentration_cya = ''

		for (let i = 0; i < req.session.data['hazard_codes'].length; i++ ){
		  hazard_codes_cya = hazard_codes_cya + req.session.data['hazard_codes'][i] + '<br>'

		  if (req.session.data['hazard_codes'][i].includes("HP1:")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP2")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP3")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP4")) {
		    concentration_cya = concentration_cya + req.session.data['hp4_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP5")) {
		    concentration_cya = concentration_cya + req.session.data['hp5_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP6")) {
		    concentration_cya = concentration_cya + req.session.data['hp6_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP7")) {
		    concentration_cya = concentration_cya + req.session.data['hp7_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP8")) {
		    concentration_cya = concentration_cya + req.session.data['hp8_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP9")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP10")) {
		    concentration_cya = concentration_cya + req.session.data['hp10_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP11")) {
		    concentration_cya = concentration_cya + req.session.data['hp11_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP12")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP13")) {
		    concentration_cya = concentration_cya + req.session.data['hp13_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP14")) {
		    concentration_cya = concentration_cya + req.session.data['hp14_concentration'] +'%' + '<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("HP15")) {
		    concentration_cya = concentration_cya + 'Present<br>'
		  }
		  if (req.session.data['hazard_codes'][i].includes("POP")) {
		    concentration_cya = concentration_cya + req.session.data['pop_concentration'] +'%' + '<br>'
		  }
		}

		hazard_codes_cya = hazard_codes_cya.slice(0, -4)
		concentration_cya = concentration_cya.slice(0, -4)
	}

	req.session.data['hazard_codes_cya'] = hazard_codes_cya
	req.session.data['concentration_cya'] = concentration_cya

  if (req.session.data['first_component'] != 'false') {
  // create a list for the component to go in, if we don't already have one.
    req.session.data['component_list'] = []
    req.session.data['first_component'] = 'false'
  }

  // add the new component and details to the list
  req.session.data['component_list'].push({component: req.session.data['component'], concentration: req.session.data['concentration_cya'], hazard: req.session.data['hazard_codes_cya']})

  // reset the variables for next time through
  req.session.data['component'] = ''
  req.session.data['concentration_cya'] = ''
  req.session.data['hazard_codes_cya'] = ''
  req.session.data['hazard_codes'] = ''
  req.session.data['hp1_concentration'] = ''
  req.session.data['hp2_concentration'] = ''
  req.session.data['hp3_concentration'] = ''
  req.session.data['hp4_concentration'] = ''
  req.session.data['hp5_concentration'] = ''
  req.session.data['hp6_concentration'] = ''
  req.session.data['hp7_concentration'] = ''
  req.session.data['hp8_concentration'] = ''
  req.session.data['hp9_concentration'] = ''
  req.session.data['hp10_concentration'] = ''
  req.session.data['hp11_concentration'] = ''
  req.session.data['hp12_concentration'] = ''
  req.session.data['hp13_concentration'] = ''
  req.session.data['hp14_concentration'] = ''
  req.session.data['hp15_concentration'] = ''
  req.session.data['pop_concentration'] = ''

// build some table html to show all the components
  var table_html = ''
  table_html = '<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row">'
  table_html = table_html + '<th scope="col" class="govuk-table__header app-custom-class">Component</th>'
  table_html = table_html + '<th scope="col" class="govuk-table__header app-custom-class">Concentration</th>'
  table_html = table_html + '<th scope="col" class="govuk-table__header app-custom-class">Hazard code</th>'
  table_html = table_html + '<th scope="col" class="govuk-table__header app-custom-class"></th>'
  table_html = table_html + '</tr></thead>'
  table_html = table_html + '<tbody class="govuk-table__body">'
  // add a row for each item in the list
  for (let i = 0; i < req.session.data['component_list'].length; i++ ){
    table_html = table_html + '<tr class="govuk-table__row">'
    table_html = table_html + '<th scope="row" class="govuk-table__header">' + req.session.data['component_list'][i].component + '</th>'
    table_html = table_html + '<td class="govuk-table__cell">' + req.session.data['component_list'][i].concentration + '</th>'
    table_html = table_html + '<td class="govuk-table__cell">' + req.session.data['component_list'][i].hazard + '</th>'
    table_html = table_html + '<td class="govuk-table__cell"><a href=' + '' + '>Change</a></th>'
    table_html = table_html + '</tr>'
  }
  table_html = table_html + '</tbody></table>'

  req.session.data['table_html'] = table_html

  res.redirect('add-hazard');
})

router.post('/add-hazard', function(req, res) {
// direct to add another, or move to physical form
  if (req.session.data['add_hazard'] == "yes") {
		res.redirect('hazard-component');
	} else {
    res.redirect('physical-form')
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
//router.get('/sic-code', function(req, res) {
  // get the details from the .json file into a list
 // var sic_codes_list = require('./sic-codes.json')
  //sic_codes_list = JSON.parse(JSON.stringify(sic_codes_list))

//console.log = sic_codes_list

  //var sic_info_list = ''

  //for (var i = 0; i < sic_codes_list.length; i++) {
    //this_sic_code = sic_codes_list[i].SIC_code
    //this_sic_desc = sic_codes_list[i].Description
    //this_sic_info = this_sic_code + ' ' + this_sic_desc
    //sic_info_list = sic_info_list + this_sic_info
 // }

    // build some text to show all the SIC codes and descriptions
   // var select_text = ''
    //select_text = '{{ govukSelect({id: "sic-info",name: "sic_info",value: data["sic_info"],items: [{value: "",text: ""},'

//console.log = sic_codes_list

    // add the option for each SIC code in the list
  //  for (let i = 0; i < sic_codes_list.length; i++) {
      //select_text = select_text + '{value: ' + sic_codes_list[i].SIC_code + ',text: ' + sic_codes_list[i].Description +'},'
    //}
    //select_text = select_text.slice(0, select_text.length-1) + ']}) }}'

    //req.session.data['select_text'] = select_text

//console.log = select_text
  // build some select html to show all the SIC codes and descriptions
  //var select_html = ''
 // select_html = '<select class="govuk-select">'
 // select_html = select_html + '<option>'

  // add the option for each SIC code in the list
 // for (let i = 0; i < sic_codes_list.length; i++) {
  //  select_html = select_html + sic_codes_list[i].SIC_code + ' ' + sic_codes_list[i].Description
   // select_html = select_html + '</option>'
 // }
 // select_html = select_html + '</select>'

 // req.session.data['select_html'] = select_html
//})


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
  if (req.session.data['producer_details_status'] == 'Review') {
    req.session.data['producer_details_status'] = 'Completed'
    req.session.data['producer_details_status_class'] = "";
  }

  if (req.session.data['producer_details_status'] != 'Completed') {
    req.session.data['producer_details_status'] = "In progress";
    req.session.data['producer_details_status_class'] = "govuk-tag--blue";

    // go to page to select the address
    res.redirect( 'producer-address' );
  } else {
    res.redirect( 'waste-info-note' );
  }
})

router.post('/producer-address', function(req, res) {
  if (req.session.data['producer_details_status'] != 'Completed') {
    req.session.data['producer_details_status'] = "In progress";
    req.session.data['producer_details_status_class'] = "govuk-tag--blue";
  }

  if (req.session.data['producer_full_address'] != '') {
    full_address = req.session.data['producer_full_address'];
    // add each comma separated string into an array
    const address_items = full_address.split(",");
    // As we hard coded the addresses shown, we know the format is line 1, town, postcode.
    req.session.data['producer_address_line_1'] = address_items[0];
    req.session.data['producer_address_town'] = address_items[1];
    req.session.data['producer_postcode'] = address_items[2];

  	// make the 'Check answers' version of the producers address
    producer_full_address_cya = '<ul class="govuk-list"><li>' + req.session.data['producer_address_line_1'] + '</li>'

    if (req.session.data['producer_address_line_2'] != '') {
      producer_full_address_cya = producer_full_address_cya + '<li>' + req.session.data['producer_address_line_2'] + '</li>'
    }
    if (req.session.data['producer_address_town'] != '') {
      producer_full_address_cya = producer_full_address_cya + '<li>' + req.session.data['producer_address_town'] + '</li>'
    }
    if (req.session.data['receiver_address_county'] != '') {
      producer_full_address_cya = producer_full_address_cya + '<li>' + req.session.data['producer_address_county'] + '</li>'
    }
    if (req.session.data['producer_postcode'] != '') {
      producer_full_address_cya = producer_full_address_cya + '<li>' + req.session.data['producer_postcode'] + '</li>'
    }
    producer_full_address_cya = producer_full_address_cya + '</ul>'

    req.session.data['producer_full_address_cya'] = producer_full_address_cya
  }

  // go to the page to continue adding details
  res.redirect( 'producer-details' );
})

router.post('/producer-address-manual', function(req, res) {
  if (req.session.data['producer_details_status'] != 'Completed') {
    req.session.data['producer_details_status'] = "Completed";
    req.session.data['producer_details_status_class'] = "";
  }

  // go to the page to continue adding details
  res.redirect( 'producer-details' );
})

router.post('/producer-details', function(req, res) {
  // make the contact details check your answers (cya) version
  producer_contact_cya = '<ul class="govuk-list"><li>' + req.session.data['producer_contact_name'] + '</li>' +
          '<li>' + req.session.data['producer_contact_email'] + '</li>' +
          '<li>' + req.session.data['producer_contact_phone'] + '</li></ul>'
  req.session.data['producer_contact_cya'] = producer_contact_cya

  if ((req.session.data['producer_contact_name'] == '') || (req.session.data['producer_contact_email'] == '')
        || (req.session.data['producer_contact_phone'] == '') || (req.session.data['producer_business_name'] == '')) {
    req.session.data['producer_details_status'] = "In progress";
    req.session.data['producer_details_status_class'] = "govuk-tag--blue";
  } else {
    req.session.data['producer_details_status'] = "Completed";
    req.session.data['producer_details_status_class'] = "";
  }

  // go back to the win
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
  if (req.session.data['receiver_details_status'] == 'Review') {
    req.session.data['receiver_details_status'] = 'Completed'
    req.session.data['receiver_details_status_class'] = "";
  }

  if (req.session.data['receiver_details_status'] != 'Completed') {
    req.session.data['receiver_details_status'] = "In progress";
    req.session.data['receiver_details_status_class'] = "govuk-tag--blue";

    // go to page to select the address
    res.redirect( 'receiver-address' );
  } else {
    res.redirect( 'waste-info-note' );
  }
})

router.post('/receiver-address', function(req, res) {
  if (req.session.data['receiver_details_status'] != 'Completed') {
    req.session.data['receiver_details_status'] = "In progress";
    req.session.data['receiver_details_status_class'] = "govuk-tag--blue";
  }

  if (req.session.data['receiver_full_address'] != '') {
    full_address = req.session.data['receiver_full_address'];
    // add each comma separated string into an array
    const address_items = full_address.split(",");
    // As we hard coded the addresses shown, we know the format is line 1, town, postcode.
    req.session.data['receiver_address_line_1'] = address_items[0];
    req.session.data['receiver_address_town'] = address_items[1];
    req.session.data['receiver_postcode'] = address_items[2];

  	// make the 'Check answers' version of the receivers address
    receiver_full_address_cya = '<ul class="govuk-list"><li>' + req.session.data['receiver_address_line_1'] + '</li>'

    if (req.session.data['receiver_address_line_2'] != '') {
      receiver_full_address_cya = receiver_full_address_cya + '<li>' + req.session.data['receiver_address_line_2'] + '</li>'
    }
    if (req.session.data['receiver_address_town'] != '') {
      receiver_full_address_cya = receiver_full_address_cya + '<li>' + req.session.data['receiver_address_town'] + '</li>'
    }
    if (req.session.data['receiver_address_county'] != '') {
      receiver_full_address_cya = receiver_full_address_cya + '<li>' + req.session.data['receiver_address_county'] + '</li>'
    }
    if (req.session.data['receiver_postcode'] != '') {
      receiver_full_address_cya = receiver_full_address_cya + '<li>' + req.session.data['receiver_postcode'] + '</li>'
    }
    receiver_full_address_cya = receiver_full_address_cya + '</ul>'

    req.session.data['receiver_full_address_cya'] = receiver_full_address_cya
  }

  // go to the page to continue adding details
  res.redirect( 'receiver-details' );
})

router.post('/receiver-address-manual', function(req, res) {
  if (req.session.data['receiver_details_status'] != 'Completed') {
    req.session.data['receiver_details_status'] = "Completed";
    req.session.data['receiver_details_status_class'] = "";
  }

  // go to the page to continue adding details
  res.redirect( 'receiver-details' );
})

router.post('/receiver-details', function(req, res) {
  // make the contact details check your answers (cya) version
//  if (req.session.data['receiver_contact_name'] != '') {
//    receiver_contact_cya = '<ul class="govuk-list"><li>' + req.session.data['receiver_contact_name'] + '</li>'
//  }
//  if (req.session.data['receiver_contact_email'] != '') {
//
//  }
    receiver_contact_cya = '<ul class="govuk-list"><li>' + req.session.data['receiver_contact_name'] + '</li>' +
          '<li>' + req.session.data['receiver_contact_email'] + '</li>' +
          '<li>' + req.session.data['receiver_contact_phone'] + '</li></ul>'
    req.session.data['receiver_contact_cya'] = receiver_contact_cya

  if ((req.session.data['receiver_contact_name'] == '') || (req.session.data['receiver_contact_email'] == '')
        || (req.session.data['receiver_contact_phone'] == '') || (req.session.data['receiver_business_name'] == '')) {
    req.session.data['receiver_details_status'] = "In progress";
    req.session.data['receiver_details_status_class'] = "govuk-tag--blue";
  } else {
    req.session.data['receiver_details_status'] = "Completed";
    req.session.data['receiver_details_status_class'] = "";
  }

  // move to ask for the permit number
  res.redirect( 'receiver-permit' );
})

router.post('/receiver-permit', function(req, res) {
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

// BODGE FOR NOW TO GET LINK FOR CONFIRMATION TO SHOW
  if (req.session.data['carrier_confirmation_status'] == 'Completed') {
    req.session.data['carrier_confirmation_status_class'] = ''
  } else if ((req.session.data['waste_details_status'] == "Completed") && (req.session.data['how_waste_produced_status']== "Completed")
        && (req.session.data['producer_details_status'] == "Completed") && (req.session.data['pick_up_status'] == "Completed")
        && (req.session.data['receiver_details_status'] == "Completed") && (req.session.data['carrier_details_status'] == "Completed")
        && (req.session.data['transportation_info_status'] == "Completed")) {
    req.session.data['carrier_confirmation_status'] = 'Not started'
    req.session.data['carrier_confirmation_status_class'] = 'govuk-tag--grey'
  }

  res.redirect( 'waste-info-note' );
})

router.post('/transportation-check-answers', function(req, res) {
  req.session.data['transportation_info_status'] = "Completed";
  req.session.data['transportation_info_status_class'] = "";

  // BODGE FOR NOW TO GET LINK FOR CONFIRMATION TO SHOW
    // allow producer to confirm and sign his part of the duty of care
    if (req.session.data['producer_confirmation_status'] == 'Completed') {
      req.session.data['producer_confirmation_status_class'] = ''
    } else if ((req.session.data['carrier_details_status'] == "Completed") && (req.session.data['transportation_info_status'] == "Completed")
          && (req.session.data['carrier_confirmation_status'] == 'Completed')) {
      req.session.data['producer_confirmation_status'] = 'Not started'
      req.session.data['producer_confirmation_status_class'] = 'govuk-tag--grey'
    }

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
  var recovery_code = req.session.data['recovery_code']
  var recovery_code_provided = 'false'

  // if an R or D code was entered...
  if (recovery_code != '' ){
    // Apply Postel's law: "be conservative in what you do, be liberal in what you accept from others"
    // Remove any spaces - this is using a regex to catch all whitespace
    recovery_code = recovery_code.replace(/\s/g,'')
    // uppercase any letters entered
    recovery_code = recovery_code.toUpperCase()

    // get the data from the JSON file
    var recovery_code_list = require('./r&d-codes.json')
    recovery_code_list = JSON.parse(JSON.stringify(recovery_code_list))
    var recovery_code_relates = ''

    for (let i = 0; i < recovery_code_list.length; i++ ){
      this_recovery_code = recovery_code_list[i].Code.trim()

      if (this_recovery_code == recovery_code) { // the code provided is in the list of valid codes
        recovery_code_provided = 'true'
        // recovery_code_relates = recovery_code_list[i].Relates_To; // don't currently use this, but added code whilst here!
        break;
      }
    } // end the for loop

    // if the R or D code entered was in the list, it's valid, go back to the WIN
    if (recovery_code_provided == 'true') {
      req.session.data['recovery_code'] = recovery_code
      req.session.data['recovery_code_provided'] = "true"
      req.session.data['recovery_code_status'] = "Completed";
      req.session.data['recovery_code_status_class'] = "";

      res.redirect( 'waste-info-note' );
    } else { // the code provided wasn't valid, reshow the page with an error message
      req.session.data['recovery_code_provided'] = "false"
      res.redirect('waste-management');
    }

  } else {  // no R or D code entered, reshow the page with an error message
	  req.session.data['recovery_code_provided'] = 'false'
	  res.redirect('waste-management');
  }
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

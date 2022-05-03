const express = require('express')
const router = express.Router()



router.get('/index', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})




// Option 1 - As per V8 in Figma, but only using task list__tag


router.get('/new-new', function (req, res) {

  req.session.data['win_type'] = 'new'

  // Set up all the section statuses

    // Cannot start yet = 'govuk-tag--grey'
    // Not started = 'govuk-tag--grey'
    // In progress = 'govuk-tag--blue'
    // Completed = ''

  req.session.data['total_sections'] = '10'
  req.session.data['completed_sections'] = '0'

  req.session.data['producer_info_status'] = 'In progress'
  req.session.data['producer_info_status_class'] = 'govuk-tag--blue'

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

  req.session.data['hazard_status'] = 'Not started'
  req.session.data['hazard_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_stored_status'] = 'Not started'
  req.session.data['waste_stored_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_management_status'] = 'Not started'
  req.session.data['waste_management_status_class'] = 'govuk-tag--grey'

  req.session.data['payment_status'] = 'Cannot start yet'
  req.session.data['payment_status_class'] = 'govuk-tag--grey'

  res.redirect('new');

});


router.get('/new', function (req, res) {

  res.render( './' + req.originalUrl, {

    cover_note: req.session.data['cover_note'],
    total_sections: req.session.data['total_sections'],
    completed_sections: req.session.data['completed_sections'],
    producer_info_status: req.session.data['producer_info_status'],
    producer_info_status_class: req.session.data['producer_info_status_class'],
    pick_up_status: req.session.data['pick_up_status'],
    pick_up_status_class: req.session.data['pick_up_status_class'],
    carrier_contact_status: req.session.data['carrier_contact_status'],
    carrier_contact_status_class: req.session.data['carrier_contact_status_class'],
    receiver_contact_status: req.session.data['receiver_contact_status'],
    receiver_contact_status_class: req.session.data['receiver_contact_status_class'],
    transportation_info_status: req.session.data['transportation_info_status'],
    transportation_info_status_class: req.session.data['transportation_info_status_class'],
    waste_status: req.session.data['waste_status'],
    waste_status_class: req.session.data['waste_status_class'],
    hazard_status: req.session.data['hazard_status'],
    hazard_status_class: req.session.data['hazard_status_class'],
    waste_stored_status: req.session.data['waste_stored_status'],
    waste_stored_status_class: req.session.data['waste_stored_status_class'],
    waste_management_status: req.session.data['waste_management_status'],
    waste_management_status_class: req.session.data['waste_management_status_class'],
    payment_status: req.session.data['payment_status'],
    payment_status_class: req.session.data['payment_status_class']

  })
})





// Option 2 - Grouping tasks into total_sections


router.get('/new-win', function (req, res) {

  req.session.data['win_type'] = 'win'

  req.session.data['cover_note'] = 'true'

  req.session.data['total_sections'] = '10'
  req.session.data['completed_sections'] = '0'

  // Set up all the section statuses

    // Cannot start yet = 'govuk-tag--grey'
    // Not started = 'govuk-tag--grey'
    // In progress = 'govuk-tag--blue'
    // Completed = ''

  req.session.data['producer_info_status'] = 'In progress'
  req.session.data['producer_info_status_class'] = 'govuk-tag--blue'

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

  req.session.data['hazard_status'] = 'Not started'
  req.session.data['hazard_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_stored_status'] = 'Not started'
  req.session.data['waste_stored_status_class'] = 'govuk-tag--grey'

  req.session.data['waste_management_status'] = 'Not started'
  req.session.data['waste_management_status_class'] = 'govuk-tag--grey'

  req.session.data['payment_status'] = 'Cannot start yet'
  req.session.data['payment_status_class'] = 'govuk-tag--grey'


  res.redirect('win');

})

router.get('/win', function (req, res) {

  res.render( './' + req.originalUrl, {

    cover_note: req.session.data['cover_note'],
    total_sections: req.session.data['total_sections'],
    completed_sections: req.session.data['completed_sections'],
    producer_info_status: req.session.data['producer_info_status'],
    producer_info_status_class: req.session.data['producer_info_status_class'],
    pick_up_status: req.session.data['pick_up_status'],
    pick_up_status_class: req.session.data['pick_up_status_class'],
    carrier_contact_status: req.session.data['carrier_contact_status'],
    carrier_contact_status_class: req.session.data['carrier_contact_status_class'],
    receiver_contact_status: req.session.data['receiver_contact_status'],
    receiver_contact_status_class: req.session.data['receiver_contact_status_class'],
    transportation_info_status: req.session.data['transportation_info_status'],
    transportation_info_status_class: req.session.data['transportation_info_status_class'],
    waste_status: req.session.data['waste_status'],
    waste_status_class: req.session.data['waste_status_class'],
    hazard_status: req.session.data['hazard_status'],
    hazard_status_class: req.session.data['hazard_status_class'],
    waste_stored_status: req.session.data['waste_stored_status'],
    waste_stored_status_class: req.session.data['waste_stored_status_class'],
    waste_management_status: req.session.data['waste_management_status'],
    waste_management_status_class: req.session.data['waste_management_status_class'],
    payment_status: req.session.data['payment_status'],
    payment_status_class: req.session.data['payment_status_class']

  })
})




// Producer information

router.get('/producer', function (req, res) {
  res.render( './' + req.originalUrl, {} )
})

router.post('/producer', function(req, res) {
  req.session.data['producer_info_status'] = "Completed";
  req.session.data['producer_info_status_class'] = "";
  req.session.data['completed_sections'] = '1'
  res.redirect( req.session.data['win_type'] );
})




module.exports = router;

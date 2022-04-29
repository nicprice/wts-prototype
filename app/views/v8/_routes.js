const express = require('express')
const router = express.Router()



router.get('*/new', function (req, res) {

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

  res.render( './' + req.originalUrl, {

    // total_sections: req.session.data['total_sections'],
    // completed_sections: req.session.data['completed_sections']

  })
});





module.exports = router;

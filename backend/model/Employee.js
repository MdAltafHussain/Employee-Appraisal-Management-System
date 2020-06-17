const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Employee = new Schema({
  Employee_name: {
    type: String
  },
  Employee_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
}, {
  collection: 'Employees'
})

module.exports = mongoose.model('Employee', Employee)
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Account'},
    name: String,
    value: String
    //date : Date
})




module.exports = mongoose.model('Country', countrySchema);
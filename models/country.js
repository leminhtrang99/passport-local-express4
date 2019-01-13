var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Account'},
    name: {type: String}
    
    //value: boolean
    //date : Date
})




module.exports = mongoose.model('Country', countrySchema);
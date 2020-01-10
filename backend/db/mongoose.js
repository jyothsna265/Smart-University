var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password1@ds147746.mlab.com:47746/smart-university');
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true );

module.exports = {
  mongoose: mongoose
};
var bcrypt = require('bcrypt');

exports.cryptPassword = function(password) {
    var phash = bcrypt.hashSync(password,4);
    return phash;
};

exports.comparePassword = function(plainPass, hashword) {
   var result = bcrypt.compareSync(plainPass,hashword)
        return result;    
};

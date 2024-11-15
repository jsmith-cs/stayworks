const {pool} = require('../config/database');

class RentalProperties {
    static getAllRentalProperties(callback) {
        pool.query('SELECT * FROM RentalProperty', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

static getRentalPropertyById(id, callback) {
    pool.query('SELECT * FROM RentalProperty WHERE landlordId = ?', [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
}


};


module.exports = RentalProperties;
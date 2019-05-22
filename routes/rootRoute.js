var getDetailById = require('../controllers/getDetailById');

module.exports = function(app) {
    app.route('/_api/v1/video/:id')
        .get(getDetailById.getP1);
}
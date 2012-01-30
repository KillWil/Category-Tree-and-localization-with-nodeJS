(function() {

  require('../service/response');

  exports.ErrorManagement = function(req, res, err, doc) {
    if (err) {
      switch (err.type) {
        case "ENOTFOUND":
          return res.respond(err.message, 404);
        case "ENOTIMPLEMENTED":
          return res.respond(err.message, 501);
        case "EVALIDATION":
          return res.respond(err.message, 409);
        default:
          return res.respond(err.message, 500);
      }
    } else {
      return res.respond(doc, 200);
    }
  };

}).call(this);

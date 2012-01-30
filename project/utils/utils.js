(function() {

  require('../service/response');

  exports.ErrorManagement = function(req, res, err, doc) {
    if (err) {
      switch (err.Type) {
        case "ENOTFOUND":
          return res.respond(err.Message, 404);
        case "ENOTIMPLEMENTED":
          return res.respond(err.Message, 501);
        case "EVALIDATION":
          return res.respond(err.Message, 409);
        default:
          return res.respond(err.Message, 500);
      }
    } else {
      return res.respond(doc, 200);
    }
  };

}).call(this);

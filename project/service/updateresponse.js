
/*
      Format the result: Response sent to the client when an update occured
*/

(function() {
  var UpdateResponse;

  module.exports = UpdateResponse = (function() {

    function UpdateResponse(Message, ErrorType, Success) {
      this.Success = Success;
      this.Type = ErrorType;
      this.Message = Message;
    }

    return UpdateResponse;

  })();

}).call(this);

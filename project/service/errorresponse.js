
/*
    Format the result: Response sent to the client when a trappable error occured
*/

(function() {
  var ErrorResponse;

  module.exports = ErrorResponse = (function() {

    function ErrorResponse(Message, ErrorType) {
      this.Success = false;
      this.Type = ErrorType;
      this.Message = Message;
    }

    return ErrorResponse;

  })();

}).call(this);

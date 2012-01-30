###
    Format the result: Response sent to the client when a trappable error occured
###


module.exports =
  class ErrorResponse
    constructor: (Message, ErrorType) ->
      @Success = false
      @Type = ErrorType
      @Message = Message

###
      Format the result: Response sent to the client when an update occured
###

module.exports =
class UpdateResponse
  constructor: (Message, ErrorType, Success) ->
    @Success = Success
    @Type = ErrorType
    @Message = Message


###
    Format the result: Response sent to the client when the result is a single item object
###

module.exports =
class ItemResponse
  constructor: (Success, Lang, Item) ->
    @Success = Success
    @Lang = Lang
    @Result = Item


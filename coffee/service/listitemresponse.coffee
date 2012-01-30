###
    Format the result: Response sent to the client when the result is an array of objects
###

module.exports =
  class ListItemResponse
    constructor: (Success, Lang, Page, Records, TotalRecords, ListItem) ->
      @Success = Success
      @Lang = Lang
      @Page = Page
      @Records = Records
      @TotalRecords = TotalRecords
      @Result = ListItem


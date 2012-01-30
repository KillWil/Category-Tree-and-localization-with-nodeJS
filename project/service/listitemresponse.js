
/*
    Format the result: Response sent to the client when the result is an array of objects
*/

(function() {
  var ListItemResponse;

  module.exports = ListItemResponse = (function() {

    function ListItemResponse(Success, Lang, Page, Records, TotalRecords, ListItem) {
      this.Success = Success;
      this.Lang = Lang;
      this.Page = Page;
      this.Records = Records;
      this.TotalRecords = TotalRecords;
      this.Result = ListItem;
    }

    return ListItemResponse;

  })();

}).call(this);


/*
    Format the result: Response sent to the client when the result is a single item object
*/

(function() {
  var ItemResponse;

  module.exports = ItemResponse = (function() {

    function ItemResponse(Success, Lang, Item) {
      this.Success = Success;
      this.Lang = Lang;
      this.Result = Item;
    }

    return ItemResponse;

  })();

}).call(this);

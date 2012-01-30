(function() {
  var CategoriesItem, CategoriesListItem, DtoUtils, GetLocalTitle;

  CategoriesItem = (function() {

    CategoriesItem._id;

    CategoriesItem.Title;

    function CategoriesItem(document, Lang) {
      if (Lang && document.Locale) {
        this.Title = GetLocalTitle(document.Locale, Lang);
      }
      if (!this.Title) this.Title = document.Title;
      this._id = document._id;
    }

    return CategoriesItem;

  })();

  CategoriesListItem = (function() {

    CategoriesListItem._id;

    CategoriesListItem.Title;

    function CategoriesListItem(document, Lang) {
      if (Lang && document.Locale) {
        this.Title = GetLocalTitle(document.Locale, Lang);
      }
      if (!this.Title) this.Title = document.Title;
      this._id = document._id;
    }

    return CategoriesListItem;

  })();

  module.exports = DtoUtils = (function() {

    function DtoUtils() {}

    DtoUtils.prototype.CategoriesToItem = function(document, Lang) {
      var Item;
      Item = new CategoriesItem(document, Lang);
      return Item;
    };

    DtoUtils.prototype.CategoriesToListItem = function(documents, Lang) {
      var ListItem, document;
      return ListItem = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = documents.length; _i < _len; _i++) {
          document = documents[_i];
          _results.push(new CategoriesItem(document, Lang));
        }
        return _results;
      })();
    };

    return DtoUtils;

  })();

  GetLocalTitle = function(documents, Lang) {
    var i;
    i = 0;
    while (documents.length > i) {
      if (documents[i].CountryCode === Lang) return documents[i].Title;
      i += 1;
    }
  };

  "";

}).call(this);

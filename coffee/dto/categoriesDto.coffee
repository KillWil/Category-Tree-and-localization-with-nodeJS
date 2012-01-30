class CategoriesItem
  @_id
  @Title

  constructor: (document, Lang) ->
    @Title = GetLocalTitle(document.Locale, Lang)  if Lang and document.Locale
    @Title = document.Title  unless @Title
    @_id = document._id

class CategoriesListItem
  @_id
  @Title

  constructor: (document, Lang) ->
    @Title = GetLocalTitle(document.Locale, Lang)  if Lang and document.Locale
    @Title = document.Title  unless @Title
    @_id = document._id

module.exports =
  class DtoUtils

    CategoriesToItem: (document, Lang) ->
      Item = new CategoriesItem(document, Lang)
      return Item

    CategoriesToListItem: (documents, Lang) ->
      ListItem = for document in documents
        new CategoriesItem(document,Lang)

GetLocalTitle = (documents, Lang) ->
  i = 0
  while documents.length > i
    return documents[i].Title  if documents[i].CountryCode is Lang
    i += 1
""
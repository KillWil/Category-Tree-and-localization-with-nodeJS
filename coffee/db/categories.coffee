Categories = require("../schema/categoriesSchema.js")
CategoriesDto = exports.CategoriesDto = require("../dto/categoriesDto.js")
ItemResponse = exports.ItemResponse = require("../service/itemresponse.js")
ListItemResponse = exports.ListItemResponse = require("../service/listitemresponse.js")
ErrorResponse = exports.ErrorResponse = require("../service/errorresponse.js")
UpdateResponse = exports.UpdateResponse = require("../service/updateresponse.js")

module.exports =
class CategoryDb

  GetCategory: (CategoryId, Lang, callback) ->
    Categories.findOne  _id: CategoryId , (err, document) ->
      return callback(new ErrorResponse(err, "EOTHER"))  if err
      return callback(new ErrorResponse("Category " + CategoryId + " not found", "ENOTFOUND"))  unless document
      dto = new CategoriesDto().CategoriesToItem(document, Lang)
      rep = new ItemResponse(true, Lang, dto)
      callback `undefined`, rep

  GetAscendants: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB:{$lt: bgi},RB:{$gt: bdi}})
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB:{$lt: bgi},RB:{$gt: bdi}})
            query.asc "LB"
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetCategoryAndAscendants: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    console.log Page
    console.log Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB:{$lte: bgi},RB:{$gte: bdi}})
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB:{$lte: bgi},RB:{$gte: bdi}})
            query.asc "LB"
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetDescendants: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "ENOTFOUND"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB:{$gt: bgi},RB:{$lt: bdi}})
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB:{$gt: bgi},RB:{$lt: bdi}})
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetCategoryAndDescendants: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "ENOTFOUND"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB : {$gte : bgi}, RB : {$lte : bdi}})
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB : {$gte : bgi}, RB : {$lte : bdi}})
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetChildren: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    console.log Page
    console.log Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB : {$gt : bgi}, RB : {$lt : bdi}, Level : (nivi + 1)} )
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB : {$gt : bgi}, RB : {$lt : bdi}, Level : (nivi + 1)} )
            query.asc "LB"
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetCategoryAndChildren: (CategoryId, Lang, Page, Limit, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    Page = 0  unless Page
    Limit = 10  unless Limit
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        query = Categories.find({})
        query.find({LB : {$gte : bgi}, RB : {$lte : bdi}, Level : {$lte: (nivi + 1)}} )
        query.count()
        query.run (err, count) ->
          if count > 0
            query = Categories.find({})
            query.find({LB : {$gte : bgi}, RB : {$lte : bdi}, Level : {$lte: (nivi + 1)}} )
            query.asc "LB"
            query.limit Limit
            query.skip Limit * Page
            query.run (err, documents) ->
              return callback(new ErrorResponse(err, "EOTHER"))  if err
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang)
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto)
              callback `undefined`, rep
          else
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {})
            callback `undefined`, rep

  GetParent: (CategoryId, Lang, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    Categories.findOne
        _id: CategoryId
      , (err, document) ->
        return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgi = document.LB
        bdi = document.RB
        nivi = document.Level
        Categories.findOne {LB:{$lt : bgi}, RB: {$gt : bdi}, Level: (nivi-1) }
          , (err, document) ->
            return callback(new ErrorResponse(err, "EOTHER"))  if err
            dto = new CategoriesDto().CategoriesToItem(document, Lang)
            rep = new ItemResponse(true, Lang, dto)
            callback `undefined`, rep

  GetRootElement: (Lang, callback) ->
    Categories.findOne
        LB: 1
      , (err, document) ->
        return callback(new ErrorResponse(err, "EOTHER"))  if err
        return callback(new ErrorResponse("Root category not found", "ENOTFOUND"))  unless document
        dto = new CategoriesDto().CategoriesToItem(document, Lang)
        rep = new ItemResponse(true, Lang, dto)
        callback `undefined`, rep

  Insert: (Titre, IdParent, Mode, callback) ->
    console.log IdParent
    console.log Mode
    console.log Titre
    return callback(new ErrorResponse("Le titre et le Mode d'insertion sont obligatoires", "EVALIDATION"))  if not Mode or not Titre
    return callback(new ErrorResponse("Mode d'insertion inconnu", "EVALIDATION"))  if [ "fc", "lc", "fs", "ls", "p" ].indexOf(Mode) is -1
    unless IdParent
      Categories.count {}, (err, count) ->
        if count is 0
          return callback(new ErrorResponse("Insertion impossible dans un arbre pour un fils sans père !", "ENOTFOUND"))  if [ "fc", "lc" ].indexOf(Mode) >= 0
          R = new Categories()
          R.Title = Titre
          R.Level = 0
          R.LB = 1
          R.RB = 2
          R.save (err, document) ->
            return callback(new ErrorResponse(err, "EOTHER"))  if err
            callback `undefined`,
              _id: document._id
        else
          callback new ErrorResponse("Insertion impossible dans un arbre pour un collatéral sans précision du parent !", "ENOTFOUND")
    else
      Categories.findOne
          _id: IdParent
        , (err, document) ->
          return callback(new ErrorResponse("Impossible, le parent n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
          bgp = document.LB
          bdp = document.RB
          nivp = document.Level
          switch Mode
            when "p"
              Categories.update { RB: { $gt: bdp } }, { $inc: { RB: 2 }}, { multi: true }
                , (err) ->
                  return callback(new ErrorResponse(err, "EOTHER"))  if err
                  Categories.update { LB: { $gt: bgp } }, { $inc: { LB: 2 }}, { multi: true }
                    , (err) ->
                      return callback(new ErrorResponse(err, "EOTHER"))  if err
                      Categories.update { LB: { $gte: bgp }, RB: { $lte: bdp } }, { $inc: { LB: 1 , RB: 1 , Level: 1 }}, { multi: true }
                        , (err) ->
                          return callback(new ErrorResponse(err, "EOTHER"))  if err
                          R = new Categories()
                          R.Title = Titre
                          R.Level = nivp
                          R.LB = bgp
                          R.RB = bdp + 2
                          R.save (err, document) ->
                            return callback(new ErrorResponse(err, "EOTHER"))  if err
                            callback `undefined`,
                              _id: document._id
            when "fs"
              Categories.update { RB: { $gt: bgp } }, { $inc: { RB: 2 }}, { multi: true }
                , (err) ->
                  return callback(new ErrorResponse(err, "EOTHER"))  if err
                  Categories.update { LB: { $gte: bgp } }, { $inc: { LB: 2 }}, { multi: true }
                    , (err) ->
                      return callback(new ErrorResponse(err, "EOTHER"))  if err
                      bgi = bgp
                      bdi = bgp + 1
                      nivi = nivp
                      R = new Categories()
                      R.Title = Titre
                      R.Level = nivi
                      R.LB = bgi
                      R.RB = bdi
                      R.save (err, document) ->
                        return callback(new ErrorResponse(err, "EOTHER"))  if err
                        callback `undefined`,
                          _id: document._id
            when "ls"
              Categories.update { RB: { $gt: bdp } }, { $inc: { RB: 2 }}, { multi: true }
                , (err) ->
                  return callback(new ErrorResponse(err, "EOTHER"))  if err
                  Categories.update { LB: { $gte: bdp } }, { $inc: { LB: 2 }}, { multi: true }
                    , (err) ->
                      return callback(new ErrorResponse(err, "EOTHER"))  if err
                      bgi = bdp + 1
                      bdi = bdp + 2
                      nivi = nivp
                      R = new Categories()
                      R.Title = Titre
                      R.Level = nivi
                      R.LB = bgi
                      R.RB = bdi
                      R.save (err, document) ->
                        return callback(new ErrorResponse(err, "EOTHER"))  if err
                        callback `undefined`,
                          _id: document._id
            when "fc"
              Categories.update { RB: { $gt: bgp } }, { $inc: { RB: 2 }}, { multi: true }
                , (err) ->
                  return callback(new ErrorResponse(err, "EOTHER"))  if err
                  Categories.update { LB: { $gt: bgp } }, { $inc: { LB: 2 }}, { multi: true }
                    , (err) ->
                      return callback(new ErrorResponse(err, "EOTHER"))  if err
                      bgi = bgp + 1
                      bdi = bgp + 2
                      nivi = nivp + 1
                      R = new Categories()
                      R.Title = Titre
                      R.Level = nivi
                      R.LB = bgi
                      R.RB = bdi
                      R.save (err, document) ->
                        return callback(new ErrorResponse(err, "EOTHER"))  if err
                        callback `undefined`,
                          _id: document._id
            when "lc"
              Categories.update { RB: { $gte: bdp } }, { $inc: { RB: 2 }}, { multi: true }
                , (err) ->
                  return callback(new ErrorResponse(err, "EOTHER"))  if err
                  Categories.update { LB: { $gt: bdp } }, { $inc: { LB: 2 }}, { multi: true }
                    , (err) ->
                      return callback(new ErrorResponse(err, "EOTHER"))  if err
                      bgi = bdp
                      bdi = bdp + 1
                      nivi = nivp + 1
                      R = new Categories()
                      R.Title = Titre
                      R.Level = nivi
                      R.LB = bgi
                      R.RB = bdi
                      R.save (err, document) ->
                        return callback(new ErrorResponse(err, "EOTHER"))  if err
                        callback `undefined`,
                          _id: document._id

  InsertLocale: (CategoryId, Lang, Title, callback) ->
    return callback(new ErrorResponse("La catégorie est obligatoire", "EVALIDATION"))  unless CategoryId
    return callback(new ErrorResponse("Le code language est obligatoire", "EVALIDATION"))  unless Lang
    return callback(new ErrorResponse("Le titre est obligatoire", "EVALIDATION"))  unless Title
    try
      Categories.update {_id:CategoryId, "Locale.Lang": {"$ne": Lang}}, {"$push": { Locale : {Lang : Lang, Title : Title} } }
        , (err, count) ->
          return callback(new ErrorResponse(err, "EOTHER"))  if err
          if count is 0
            rep =
            success: false
            AffectedRecords: count

            callback `undefined`, rep
          else
            rep =
            success: true
            AffectedRecords: count

            callback `undefined`, rep
    catch err
      rep =
      success: true
      message: err

      return callback(`undefined`, rep)

  Delete: (CategoryId, RecursiveMode, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    return callback(new ErrorResponse("Le mode recursif est obligatoire", "EVALIDATION"))  if RecursiveMode is `undefined`
    Categories.findOne {"_id":CategoryId}
      , (err, document) ->
        return callback(new ErrorResponse("Supression impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"))  if not document or not document? or document.length is 0
        bgb = document.LB
        bdb = document.RB
        nivb = document.Level
        if RecursiveMode is true
          delta = bdb - bgb + 1
          Categories.remove {LB:{$gte : bgb}, RB:{$lte : bdb}}
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          Categories.update {LB:{$gt : bdb}}, {$inc:{LB :(-delta)}}, { multi: true }
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          Categories.update {RB:{$gt : bdb}}, {$inc:{RB :(-delta)}}, { multi: true }
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          callback `undefined`,
            success: true
        else
          Categories.remove {_id:CategoryId}
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          Categories.update {LB:{$gt : bgb}, RB:{$lt: bdb}}, {$inc:{ LB:(-1), RB:(-1), Level:(-1)}}, { multi: true }
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          Categories.update {LB:{$gt : bdb}}, {$inc:{LB :(-2)}}, { multi: true }
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          Categories.update {RB:{$gt : bdb}}, {$inc:{RB :(-2)}}, { multi: true }
            , (err) ->
              callback new ErrorResponse(err, "EOTHER")  if err

          callback `undefined`,
            success: true

  DeleteLocale: (CategoryId, Lang, callback) ->
    return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"))  unless CategoryId
    return callback(new ErrorResponse("Le code language est obligatoire", "EVALIDATION"))  unless Lang
    Categories.update {_id:CategoryId, "Locale.Lang": Lang}, {"$pull": { Locale : {Lang : Lang} } }
      , (err, count) ->
        return callback(new ErrorResponse(err, "EOTHER"))  if err
        if count is 0
          rep =
          success: false
          AffectedRecords: count

          callback `undefined`, rep
        else
          rep =
          success: true
          AffectedRecords: count

          callback `undefined`, rep

  Move: (CategoryId, ParentCategoryId, Mode, callback) ->
    return callback(new ErrorResponse("Déplacement impossible", "EVALIDATION"))  if not Mode or not CategoryId or not ParentCategoryId
    return callback(new ErrorResponse("Mode inconnu", "EVALIDATION"))  if [ "fc", "lc" ].indexOf(Mode) is -1
    return callback(new ErrorResponse("Déplacement impossible, le parent et le noeud sont identiques", "EVALIDATION"))  if CategoryId is ParentCategoryId
    Categories.findOne {"_id" : CategoryId}
      , (err, CategoryDocument) ->
        return callback(new ErrorResponse("Déplacement impossible, la catégorie n'existe plus !", "ENOTFOUND"))  if not CategoryDocument or not CategoryDocument? or CategoryDocument.length is 0
        Categories.findOne {"_id" : ParentCategoryId}
          , (err, ParentCategoryDocument) ->
            return callback(new ErrorResponse("Déplacement impossible, la catégorie parente n'existe plus !", "ENOTFOUND"))  if not ParentCategoryDocument or not ParentCategoryDocument? or ParentCategoryDocument.length is 0
            bgi = CategoryDocument.LB
            bdi = CategoryDocument.RB
            nivi = CategoryDocument.Level
            Delta = bdi - bgi
            bgp = ParentCategoryDocument.LB
            bdp = ParentCategoryDocument.RB
            nivp = ParentCategoryDocument.Level
            DeltaParent = bdp - bgp
            return callback(new ErrorResponse("Déplacement impossible, la destination est un descendant du noeux à déplacer", "EVALIDATION"))  if bgp > bgi and bdp < bdi
            Decalage = bgi - bgp
            DecalageDroit = bdi - bdp
            if (Decalage > 0 and DecalageDroit > 0) or (Decalage > 0 and DecalageDroit < 0 and Mode is "fc")
              if Mode is "fc"
                Categories.update { LB: { $gt: bgp  } }, { $inc: { LB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: bgp  } }, { $inc: { RB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gte: bgi + Delta + 1  }, RB: { $lte: bdi + Delta + 1  } }, { $inc: { LB: (- Delta - Decalage), RB: (- Delta - Decalage), Level: (nivp - nivi + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gt: bgi + Delta  } }, { $inc: { LB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: bgi + Delta  } }, { $inc: { RB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                callback `undefined`,
                  _id: CategoryDocument._id
              else
                Categories.update { RB: { $gte: bdp  } }, { $inc: { RB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gt: bdp  } }, { $inc: { LB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gte: (bgi + Delta + 1)}, RB: { $lte: (bdi + Delta + 1) }}, { $inc: { LB: (- Delta - Decalage + DeltaParent - 1), RB: (- Delta - Decalage + DeltaParent - 1), Level: (nivp - nivi + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gt: (bgi + Delta)  } }, { $inc: { LB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: (bgi + Delta)  } }, { $inc: { RB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                callback `undefined`,
                  _id: CategoryDocument._id
            else
              if Mode is "fc"
                Categories.update { LB: { $gt: bgp  } }, { $inc: { LB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: bgp  } }, { $inc: { RB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gte: bgi }, LB: { $lte: bdi } }, { $inc: { LB: (- Decalage + 1), RB: (- Decalage + 1), Level: (nivp - nivi + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gt: bgi } }, { $inc: { LB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: bgi } }, { $inc: { RB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                callback `undefined`,
                  _id: CategoryDocument._id
              else
                Categories.update { LB: { $gt: bdp  } }, { $inc: { LB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gte: bdp  } }, { $inc: { RB: (Delta + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gte: bgi, $lte: bdi } }, { $inc: { LB: (- Decalage + DeltaParent), RB: (- Decalage + DeltaParent), Level: (nivp - nivi + 1) }}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { LB: { $gt: bgi } }, { $inc: { LB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                Categories.update { RB: { $gt: bgi } }, { $inc: { RB: (- Delta - 1)}}, { multi: true }
                  , (err) ->
                    callback new ErrorResponse(err, "EOTHER")  if err

                callback `undefined`,
                  _id: CategoryDocument._id
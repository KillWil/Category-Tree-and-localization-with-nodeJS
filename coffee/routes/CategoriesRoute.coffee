###
      Routes for calling the webservice
###

CategoryDb = exports.CategoryDb = require("../db/categories.js")
Utils = require("../utils/utils.js")
module.exports = (app) ->

  Categories = new CategoryDb

  ###
      POST ROUTES
    ###

  app.post "/category", (req, res) ->
    Categories.Insert req.param("title"), req.param("parentcategoryid"), req.param("position"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.post "/category/:categoryid/locale/:lang", (req, res) ->
    Categories.InsertLocale req.param("categoryid"), req.param("lang"), req.param("title"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  ###
    GET ROUTES
   ###

  app.get "/category/ascendants/:categoryid", (req, res) ->
    Categories.GetAscendants req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/categoryandascendants/:categoryid", (req, res) ->
    Categories.GetCategoryAndAscendants req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/descendants/:categoryid", (req, res) ->
    Categories.GetDescendants req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/categoryanddescendants/:categoryid", (req, res) ->
    Categories.GetCategoryAndDescendants req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/:categoryid/children", (req, res) ->
    Categories.GetChildren req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/categoryandchildren/:categoryid", (req, res) ->
    Categories.GetCategoryAndChildren req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/parent/:categoryid", (req, res) ->
    Categories.GetParent req.param("categoryid"), req.param("lang"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/root", (req, res) ->
    Categories.GetRootElement req.param("lang"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.get "/category/:categoryid", (req, res) ->
    Categories.GetCategory req.param("categoryid"), req.param("lang"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  ###
    DELETE ROUTES
   ###

  app.del "/category/:categoryid", (req, res) ->
    Categories.Delete req.param("categoryid"), req.param("recursive"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  app.del "/category/:categoryid/locale/:lang", (req, res) ->
    Categories.DeleteLocale req.param("categoryid"), req.param("lang"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

  ###
     PUT ROUTES
    ###

  app.put "/category/:categoryid/move/:parentcategoryid", (req, res) ->
    Categories.Move req.param("categoryid"), req.param("parentcategoryid"), req.param("mode"), (err, doc) ->
      Utils.ErrorManagement req, res, err, doc

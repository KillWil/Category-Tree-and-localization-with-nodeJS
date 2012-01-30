
/*
      Routes for calling the webservice
*/

(function() {
  var CategoryDb, Utils;

  CategoryDb = exports.CategoryDb = require("../db/categories.js");

  Utils = require("../utils/utils.js");

  module.exports = function(app) {
    var Categories;
    Categories = new CategoryDb;
    /*
          POST ROUTES
    */
    app.post("/category", function(req, res) {
      return Categories.Insert(req.param("title"), req.param("parentcategoryid"), req.param("position"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.post("/category/:categoryid/locale/:lang", function(req, res) {
      return Categories.InsertLocale(req.param("categoryid"), req.param("lang"), req.param("title"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    /*
        GET ROUTES
    */
    app.get("/category/ascendants/:categoryid", function(req, res) {
      return Categories.GetAscendants(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/categoryandascendants/:categoryid", function(req, res) {
      return Categories.GetCategoryAndAscendants(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/descendants/:categoryid", function(req, res) {
      return Categories.GetDescendants(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/categoryanddescendants/:categoryid", function(req, res) {
      return Categories.GetCategoryAndDescendants(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/:categoryid/children", function(req, res) {
      return Categories.GetChildren(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/categoryandchildren/:categoryid", function(req, res) {
      return Categories.GetCategoryAndChildren(req.param("categoryid"), req.param("lang"), req.param("page"), req.param("limit"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/parent/:categoryid", function(req, res) {
      return Categories.GetParent(req.param("categoryid"), req.param("lang"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/root", function(req, res) {
      return Categories.GetRootElement(req.param("lang"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.get("/category/:categoryid", function(req, res) {
      return Categories.GetCategory(req.param("categoryid"), req.param("lang"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    /*
        DELETE ROUTES
    */
    app.del("/category/:categoryid", function(req, res) {
      return Categories.Delete(req.param("categoryid"), req.param("recursive"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    app.del("/category/:categoryid/locale/:lang", function(req, res) {
      return Categories.DeleteLocale(req.param("categoryid"), req.param("lang"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
    /*
         PUT ROUTES
    */
    return app.put("/category/:categoryid/move/:parentcategoryid", function(req, res) {
      return Categories.Move(req.param("categoryid"), req.param("parentcategoryid"), req.param("mode"), function(err, doc) {
        return Utils.ErrorManagement(req, res, err, doc);
      });
    });
  };

}).call(this);

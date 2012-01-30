(function() {
  var Categories, CategoriesDto, CategoryDb, ErrorResponse, ItemResponse, ListItemResponse, UpdateResponse;

  Categories = require("../schema/categoriesSchema.js");

  CategoriesDto = exports.CategoriesDto = require("../dto/categoriesDto.js");

  ItemResponse = exports.ItemResponse = require("../service/itemresponse.js");

  ListItemResponse = exports.ListItemResponse = require("../service/listitemresponse.js");

  ErrorResponse = exports.ErrorResponse = require("../service/errorresponse.js");

  UpdateResponse = exports.UpdateResponse = require("../service/updateresponse.js");

  module.exports = CategoryDb = (function() {

    function CategoryDb() {}

    CategoryDb.prototype.GetCategory = function(CategoryId, Lang, callback) {
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var dto, rep;
        if (err) return callback(new ErrorResponse(err, "EOTHER"));
        if (!document) {
          return callback(new ErrorResponse("Category " + CategoryId + " not found", "ENOTFOUND"));
        }
        dto = new CategoriesDto().CategoriesToItem(document, Lang);
        rep = new ItemResponse(true, Lang, dto);
        return callback(undefined, rep);
      });
    };

    CategoryDb.prototype.GetAscendants = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $lt: bgi
          },
          RB: {
            $gt: bdi
          }
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $lt: bgi
              },
              RB: {
                $gt: bdi
              }
            });
            query.asc("LB");
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetCategoryAndAscendants = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      console.log(Page);
      console.log(Limit);
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $lte: bgi
          },
          RB: {
            $gte: bdi
          }
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $lte: bgi
              },
              RB: {
                $gte: bdi
              }
            });
            query.asc("LB");
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetDescendants = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "ENOTFOUND"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $gt: bgi
          },
          RB: {
            $lt: bdi
          }
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $gt: bgi
              },
              RB: {
                $lt: bdi
              }
            });
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetCategoryAndDescendants = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "ENOTFOUND"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $gte: bgi
          },
          RB: {
            $lte: bdi
          }
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $gte: bgi
              },
              RB: {
                $lte: bdi
              }
            });
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetChildren = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      console.log(Page);
      console.log(Limit);
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $gt: bgi
          },
          RB: {
            $lt: bdi
          },
          Level: nivi + 1
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $gt: bgi
              },
              RB: {
                $lt: bdi
              },
              Level: nivi + 1
            });
            query.asc("LB");
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetCategoryAndChildren = function(CategoryId, Lang, Page, Limit, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (!Page) Page = 0;
      if (!Limit) Limit = 10;
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi, query;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        query = Categories.find({});
        query.find({
          LB: {
            $gte: bgi
          },
          RB: {
            $lte: bdi
          },
          Level: {
            $lte: nivi + 1
          }
        });
        query.count();
        return query.run(function(err, count) {
          var rep;
          if (count > 0) {
            query = Categories.find({});
            query.find({
              LB: {
                $gte: bgi
              },
              RB: {
                $lte: bdi
              },
              Level: {
                $lte: nivi + 1
              }
            });
            query.asc("LB");
            query.limit(Limit);
            query.skip(Limit * Page);
            return query.run(function(err, documents) {
              var dto, rep;
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              dto = new CategoriesDto().CategoriesToListItem(documents, Lang);
              rep = new ListItemResponse(true, Lang, Page, dto.length, count, dto);
              return callback(undefined, rep);
            });
          } else {
            rep = new ListItemResponse(true, Lang, Page, 0, 0, {});
            return callback(undefined, rep);
          }
        });
      });
    };

    CategoryDb.prototype.GetParent = function(CategoryId, Lang, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      return Categories.findOne({
        _id: CategoryId
      }, function(err, document) {
        var bdi, bgi, nivi;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgi = document.LB;
        bdi = document.RB;
        nivi = document.Level;
        return Categories.findOne({
          LB: {
            $lt: bgi
          },
          RB: {
            $gt: bdi
          },
          Level: nivi - 1
        }, function(err, document) {
          var dto, rep;
          if (err) return callback(new ErrorResponse(err, "EOTHER"));
          dto = new CategoriesDto().CategoriesToItem(document, Lang);
          rep = new ItemResponse(true, Lang, dto);
          return callback(undefined, rep);
        });
      });
    };

    CategoryDb.prototype.GetRootElement = function(Lang, callback) {
      return Categories.findOne({
        LB: 1
      }, function(err, document) {
        var dto, rep;
        if (err) return callback(new ErrorResponse(err, "EOTHER"));
        if (!document) {
          return callback(new ErrorResponse("Root category not found", "ENOTFOUND"));
        }
        dto = new CategoriesDto().CategoriesToItem(document, Lang);
        rep = new ItemResponse(true, Lang, dto);
        return callback(undefined, rep);
      });
    };

    CategoryDb.prototype.Insert = function(Titre, IdParent, Mode, callback) {
      console.log(IdParent);
      console.log(Mode);
      console.log(Titre);
      if (!Mode || !Titre) {
        return callback(new ErrorResponse("Le titre et le Mode d'insertion sont obligatoires", "EVALIDATION"));
      }
      if (["fc", "lc", "fs", "ls", "p"].indexOf(Mode) === -1) {
        return callback(new ErrorResponse("Mode d'insertion inconnu", "EVALIDATION"));
      }
      if (!IdParent) {
        return Categories.count({}, function(err, count) {
          var R;
          if (count === 0) {
            if (["fc", "lc"].indexOf(Mode) >= 0) {
              return callback(new ErrorResponse("Insertion impossible dans un arbre pour un fils sans père !", "ENOTFOUND"));
            }
            R = new Categories();
            R.Title = Titre;
            R.Level = 0;
            R.LB = 1;
            R.RB = 2;
            return R.save(function(err, document) {
              if (err) return callback(new ErrorResponse(err, "EOTHER"));
              return callback(undefined, {
                _id: document._id
              });
            });
          } else {
            return callback(new ErrorResponse("Insertion impossible dans un arbre pour un collatéral sans précision du parent !", "ENOTFOUND"));
          }
        });
      } else {
        return Categories.findOne({
          _id: IdParent
        }, function(err, document) {
          var bdp, bgp, nivp;
          if (!document || !(document != null) || document.length === 0) {
            return callback(new ErrorResponse("Impossible, le parent n'existe plus !", "ENOTFOUND"));
          }
          bgp = document.LB;
          bdp = document.RB;
          nivp = document.Level;
          switch (Mode) {
            case "p":
              return Categories.update({
                RB: {
                  $gt: bdp
                }
              }, {
                $inc: {
                  RB: 2
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
                return Categories.update({
                  LB: {
                    $gt: bgp
                  }
                }, {
                  $inc: {
                    LB: 2
                  }
                }, {
                  multi: true
                }, function(err) {
                  if (err) return callback(new ErrorResponse(err, "EOTHER"));
                  return Categories.update({
                    LB: {
                      $gte: bgp
                    },
                    RB: {
                      $lte: bdp
                    }
                  }, {
                    $inc: {
                      LB: 1,
                      RB: 1,
                      Level: 1
                    }
                  }, {
                    multi: true
                  }, function(err) {
                    var R;
                    if (err) return callback(new ErrorResponse(err, "EOTHER"));
                    R = new Categories();
                    R.Title = Titre;
                    R.Level = nivp;
                    R.LB = bgp;
                    R.RB = bdp + 2;
                    return R.save(function(err, document) {
                      if (err) return callback(new ErrorResponse(err, "EOTHER"));
                      return callback(undefined, {
                        _id: document._id
                      });
                    });
                  });
                });
              });
            case "fs":
              return Categories.update({
                RB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  RB: 2
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
                return Categories.update({
                  LB: {
                    $gte: bgp
                  }
                }, {
                  $inc: {
                    LB: 2
                  }
                }, {
                  multi: true
                }, function(err) {
                  var R, bdi, bgi, nivi;
                  if (err) return callback(new ErrorResponse(err, "EOTHER"));
                  bgi = bgp;
                  bdi = bgp + 1;
                  nivi = nivp;
                  R = new Categories();
                  R.Title = Titre;
                  R.Level = nivi;
                  R.LB = bgi;
                  R.RB = bdi;
                  return R.save(function(err, document) {
                    if (err) return callback(new ErrorResponse(err, "EOTHER"));
                    return callback(undefined, {
                      _id: document._id
                    });
                  });
                });
              });
            case "ls":
              return Categories.update({
                RB: {
                  $gt: bdp
                }
              }, {
                $inc: {
                  RB: 2
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
                return Categories.update({
                  LB: {
                    $gte: bdp
                  }
                }, {
                  $inc: {
                    LB: 2
                  }
                }, {
                  multi: true
                }, function(err) {
                  var R, bdi, bgi, nivi;
                  if (err) return callback(new ErrorResponse(err, "EOTHER"));
                  bgi = bdp + 1;
                  bdi = bdp + 2;
                  nivi = nivp;
                  R = new Categories();
                  R.Title = Titre;
                  R.Level = nivi;
                  R.LB = bgi;
                  R.RB = bdi;
                  return R.save(function(err, document) {
                    if (err) return callback(new ErrorResponse(err, "EOTHER"));
                    return callback(undefined, {
                      _id: document._id
                    });
                  });
                });
              });
            case "fc":
              return Categories.update({
                RB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  RB: 2
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
                return Categories.update({
                  LB: {
                    $gt: bgp
                  }
                }, {
                  $inc: {
                    LB: 2
                  }
                }, {
                  multi: true
                }, function(err) {
                  var R, bdi, bgi, nivi;
                  if (err) return callback(new ErrorResponse(err, "EOTHER"));
                  bgi = bgp + 1;
                  bdi = bgp + 2;
                  nivi = nivp + 1;
                  R = new Categories();
                  R.Title = Titre;
                  R.Level = nivi;
                  R.LB = bgi;
                  R.RB = bdi;
                  return R.save(function(err, document) {
                    if (err) return callback(new ErrorResponse(err, "EOTHER"));
                    return callback(undefined, {
                      _id: document._id
                    });
                  });
                });
              });
            case "lc":
              return Categories.update({
                RB: {
                  $gte: bdp
                }
              }, {
                $inc: {
                  RB: 2
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
                return Categories.update({
                  LB: {
                    $gt: bdp
                  }
                }, {
                  $inc: {
                    LB: 2
                  }
                }, {
                  multi: true
                }, function(err) {
                  var R, bdi, bgi, nivi;
                  if (err) return callback(new ErrorResponse(err, "EOTHER"));
                  bgi = bdp;
                  bdi = bdp + 1;
                  nivi = nivp + 1;
                  R = new Categories();
                  R.Title = Titre;
                  R.Level = nivi;
                  R.LB = bgi;
                  R.RB = bdi;
                  return R.save(function(err, document) {
                    if (err) return callback(new ErrorResponse(err, "EOTHER"));
                    return callback(undefined, {
                      _id: document._id
                    });
                  });
                });
              });
          }
        });
      }
    };

    CategoryDb.prototype.InsertLocale = function(CategoryId, Lang, Title, callback) {
      var rep;
      if (!CategoryId) {
        return callback(new ErrorResponse("La catégorie est obligatoire", "EVALIDATION"));
      }
      if (!Lang) {
        return callback(new ErrorResponse("Le code language est obligatoire", "EVALIDATION"));
      }
      if (!Title) {
        return callback(new ErrorResponse("Le titre est obligatoire", "EVALIDATION"));
      }
      try {
        return Categories.update({
          _id: CategoryId,
          "Locale.Lang": {
            "$ne": Lang
          }
        }, {
          "$push": {
            Locale: {
              Lang: Lang,
              Title: Title
            }
          }
        }, function(err, count) {
          var rep;
          if (err) return callback(new ErrorResponse(err, "EOTHER"));
          if (count === 0) {
            rep = {
              success: false,
              AffectedRecords: count
            };
            return callback(undefined, rep);
          } else {
            rep = {
              success: true,
              AffectedRecords: count
            };
            return callback(undefined, rep);
          }
        });
      } catch (err) {
        rep = {
          success: true,
          message: err
        };
        return callback(undefined, rep);
      }
    };

    CategoryDb.prototype.Delete = function(CategoryId, RecursiveMode, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (RecursiveMode === undefined) {
        return callback(new ErrorResponse("Le mode recursif est obligatoire", "EVALIDATION"));
      }
      return Categories.findOne({
        "_id": CategoryId
      }, function(err, document) {
        var bdb, bgb, delta, nivb;
        if (!document || !(document != null) || document.length === 0) {
          return callback(new ErrorResponse("Supression impossible, la catégorie " + CategoryId + " n'existe plus !", "ENOTFOUND"));
        }
        bgb = document.LB;
        bdb = document.RB;
        nivb = document.Level;
        if (RecursiveMode === true) {
          delta = bdb - bgb + 1;
          Categories.remove({
            LB: {
              $gte: bgb
            },
            RB: {
              $lte: bdb
            }
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          Categories.update({
            LB: {
              $gt: bdb
            }
          }, {
            $inc: {
              LB: -delta
            }
          }, {
            multi: true
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          Categories.update({
            RB: {
              $gt: bdb
            }
          }, {
            $inc: {
              RB: -delta
            }
          }, {
            multi: true
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          return callback(undefined, {
            success: true
          });
        } else {
          Categories.remove({
            _id: CategoryId
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          Categories.update({
            LB: {
              $gt: bgb
            },
            RB: {
              $lt: bdb
            }
          }, {
            $inc: {
              LB: -1.,
              RB: -1.,
              Level: -1.
            }
          }, {
            multi: true
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          Categories.update({
            LB: {
              $gt: bdb
            }
          }, {
            $inc: {
              LB: -2.
            }
          }, {
            multi: true
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          Categories.update({
            RB: {
              $gt: bdb
            }
          }, {
            $inc: {
              RB: -2.
            }
          }, {
            multi: true
          }, function(err) {
            if (err) return callback(new ErrorResponse(err, "EOTHER"));
          });
          return callback(undefined, {
            success: true
          });
        }
      });
    };

    CategoryDb.prototype.DeleteLocale = function(CategoryId, Lang, callback) {
      if (!CategoryId) {
        return callback(new ErrorResponse("Le CategoryId est obligatoire", "EVALIDATION"));
      }
      if (!Lang) {
        return callback(new ErrorResponse("Le code language est obligatoire", "EVALIDATION"));
      }
      return Categories.update({
        _id: CategoryId,
        "Locale.Lang": Lang
      }, {
        "$pull": {
          Locale: {
            Lang: Lang
          }
        }
      }, function(err, count) {
        var rep;
        if (err) return callback(new ErrorResponse(err, "EOTHER"));
        if (count === 0) {
          rep = {
            success: false,
            AffectedRecords: count
          };
          return callback(undefined, rep);
        } else {
          rep = {
            success: true,
            AffectedRecords: count
          };
          return callback(undefined, rep);
        }
      });
    };

    CategoryDb.prototype.Move = function(CategoryId, ParentCategoryId, Mode, callback) {
      if (!Mode || !CategoryId || !ParentCategoryId) {
        return callback(new ErrorResponse("Déplacement impossible", "EVALIDATION"));
      }
      if (["fc", "lc"].indexOf(Mode) === -1) {
        return callback(new ErrorResponse("Mode inconnu", "EVALIDATION"));
      }
      if (CategoryId === ParentCategoryId) {
        return callback(new ErrorResponse("Déplacement impossible, le parent et le noeud sont identiques", "EVALIDATION"));
      }
      return Categories.findOne({
        "_id": CategoryId
      }, function(err, CategoryDocument) {
        if (!CategoryDocument || !(CategoryDocument != null) || CategoryDocument.length === 0) {
          return callback(new ErrorResponse("Déplacement impossible, la catégorie n'existe plus !", "ENOTFOUND"));
        }
        return Categories.findOne({
          "_id": ParentCategoryId
        }, function(err, ParentCategoryDocument) {
          var Decalage, DecalageDroit, Delta, DeltaParent, bdi, bdp, bgi, bgp, nivi, nivp;
          if (!ParentCategoryDocument || !(ParentCategoryDocument != null) || ParentCategoryDocument.length === 0) {
            return callback(new ErrorResponse("Déplacement impossible, la catégorie parente n'existe plus !", "ENOTFOUND"));
          }
          bgi = CategoryDocument.LB;
          bdi = CategoryDocument.RB;
          nivi = CategoryDocument.Level;
          Delta = bdi - bgi;
          bgp = ParentCategoryDocument.LB;
          bdp = ParentCategoryDocument.RB;
          nivp = ParentCategoryDocument.Level;
          DeltaParent = bdp - bgp;
          if (bgp > bgi && bdp < bdi) {
            return callback(new ErrorResponse("Déplacement impossible, la destination est un descendant du noeux à déplacer", "EVALIDATION"));
          }
          Decalage = bgi - bgp;
          DecalageDroit = bdi - bdp;
          if ((Decalage > 0 && DecalageDroit > 0) || (Decalage > 0 && DecalageDroit < 0 && Mode === "fc")) {
            if (Mode === "fc") {
              Categories.update({
                LB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  LB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  RB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gte: bgi + Delta + 1
                },
                RB: {
                  $lte: bdi + Delta + 1
                }
              }, {
                $inc: {
                  LB: -Delta - Decalage,
                  RB: -Delta - Decalage,
                  Level: nivp - nivi + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gt: bgi + Delta
                }
              }, {
                $inc: {
                  LB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgi + Delta
                }
              }, {
                $inc: {
                  RB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              return callback(undefined, {
                _id: CategoryDocument._id
              });
            } else {
              Categories.update({
                RB: {
                  $gte: bdp
                }
              }, {
                $inc: {
                  RB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gt: bdp
                }
              }, {
                $inc: {
                  LB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gte: bgi + Delta + 1
                },
                RB: {
                  $lte: bdi + Delta + 1
                }
              }, {
                $inc: {
                  LB: -Delta - Decalage + DeltaParent - 1,
                  RB: -Delta - Decalage + DeltaParent - 1,
                  Level: nivp - nivi + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gt: bgi + Delta
                }
              }, {
                $inc: {
                  LB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgi + Delta
                }
              }, {
                $inc: {
                  RB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              return callback(undefined, {
                _id: CategoryDocument._id
              });
            }
          } else {
            if (Mode === "fc") {
              Categories.update({
                LB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  LB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgp
                }
              }, {
                $inc: {
                  RB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gte: bgi
                },
                LB: {
                  $lte: bdi
                }
              }, {
                $inc: {
                  LB: -Decalage + 1,
                  RB: -Decalage + 1,
                  Level: nivp - nivi + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gt: bgi
                }
              }, {
                $inc: {
                  LB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgi
                }
              }, {
                $inc: {
                  RB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              return callback(undefined, {
                _id: CategoryDocument._id
              });
            } else {
              Categories.update({
                LB: {
                  $gt: bdp
                }
              }, {
                $inc: {
                  LB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gte: bdp
                }
              }, {
                $inc: {
                  RB: Delta + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gte: bgi,
                  $lte: bdi
                }
              }, {
                $inc: {
                  LB: -Decalage + DeltaParent,
                  RB: -Decalage + DeltaParent,
                  Level: nivp - nivi + 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                LB: {
                  $gt: bgi
                }
              }, {
                $inc: {
                  LB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              Categories.update({
                RB: {
                  $gt: bgi
                }
              }, {
                $inc: {
                  RB: -Delta - 1
                }
              }, {
                multi: true
              }, function(err) {
                if (err) return callback(new ErrorResponse(err, "EOTHER"));
              });
              return callback(undefined, {
                _id: CategoryDocument._id
              });
            }
          }
        });
      });
    };

    return CategoryDb;

  })();

}).call(this);

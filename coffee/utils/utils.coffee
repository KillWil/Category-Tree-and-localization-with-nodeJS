require('../service/response')
exports.ErrorManagement = (req, res, err, doc) ->
  if err
    switch err.type
      when "ENOTFOUND"
        res.respond err.message, 404
      when "ENOTIMPLEMENTED"
        res.respond err.message, 501
      when "EVALIDATION"
        res.respond err.message, 409
      else
        res.respond err.message, 500
  else
    res.respond doc, 200
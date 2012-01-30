###
    Response sent to the client with correct http status depending on the content sent
###

http = require("http")
http.ServerResponse::respond = (content, status) ->
  if "undefined" is typeof status
    if "number" is typeof content or not isNaN(parseInt(content))
      status = parseInt(content)
      content = `undefined`
    else
      status = 200
  unless status is 200
    content =
    Code: status
    Status: http.STATUS_CODES[status]
    Message: content and content.toString() or null
  content = result: content  unless "object" is typeof content
  @send JSON.stringify(content) + "\n", status
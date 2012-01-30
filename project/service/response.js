
/*
    Response sent to the client with correct http status depending on the content sent
*/

(function() {
  var http;

  http = require("http");

  http.ServerResponse.prototype.respond = function(content, status) {
    if ("undefined" === typeof status) {
      if ("number" === typeof content || !isNaN(parseInt(content))) {
        status = parseInt(content);
        content = undefined;
      } else {
        status = 200;
      }
    }
    if (status !== 200) {
      content = {
        code: status,
        status: http.STATUS_CODES[status],
        message: content && content.toString() || null
      };
    }
    if ("object" !== typeof content) {
      content = {
        result: content
      };
    }
    return this.send(JSON.stringify(content) + "\n", status);
  };

}).call(this);

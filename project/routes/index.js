
/*
 * GET home page.
 */

exports.index = function(req, res){
/*
    var markdown = require("markdown-js");
    var fs = require("fs");
    var str = fs.readFileSync(global.PublicDirectory + "/documents/readme.md", "utf8");
    var result = markdown.makeHtml(str);
*/
    res.render('index', { title: 'Express'});
};
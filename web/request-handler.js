var path = require('path');
var url = require("url");
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.pathname;
  console.log("*******************")

  if (req.url === '/' && req.method === 'GET') {
    var html = '<form method=\'POST\'><input type=\'text\' name=\'url\' /><button type=\'submit\'>Submit</button></form>';
    exports.sendRequest(res, html, 200);
  } else if (query.length > 1 && req.method === 'GET') {

    var html = query.substring(1);

    //check if url has been archived
    if (archive.isURLArchived(html)) {
      exports.sendRequest(res, html, 200);
    } else {
      exports.sendRequest(res, '', 404);

    }
  } else if (req.method === 'POST') {




    var data = "";

    req.on('data', function(chunk) {
      data += chunk;
    } );
    req.on('end', function() {

      var url = data.substring(4);
      var result2;
      archive.isUrlInList(url, function(result){
        if (result === true) {

        } else {
          archive.addUrlToList(url + '\n');
          res.statusCode = 302;
          res.setHeader("Location", "/loading.html");
          res.end();
        }
      });

    });

  }

  //res.end(archive.paths.list);
};



exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data+=chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.sendRequest = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  var headers = httpHelpers.headers;
  response.writeHead(statusCode, headers);
  response.end(data);
}

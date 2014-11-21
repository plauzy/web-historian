var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callBack){

  fs.readFile(exports.paths.list, 'utf-8', function(err, sites) {
    sites =sites.toString().split("\n");
    if (callBack) {
      callBack(sites);
    }
  });


  // var results = [];
  // var contents = fs.readFile(exports.paths.list, 'utf8', function(err, data){

  //   if (err) {

  //   } else {
  //     results = data.split("\n");
  //     callBack(results);
  //   }
  // });
};

exports.isUrlInList = function(url, callBack){
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url);
    });
    callBack(found);
  });



  // var result = false;
  // this.readListOfUrls(function(urls){
  //   // var urls = data.split("\n");
  //   if (urls.indexOf(url) !== -1){
  //     result = true;
  //   }

  //   callBack(result);
  // });

  // var result = false;
  // var contents = fs.readFile(exports.paths.list, 'utf8', function(err, data){

  //   var result = false;

  //   if (err) {

  //   } else {
  //     var urls = data.split("\n");
  //     if (urls.indexOf(url) !== -1){
  //       result = true;
  //     }
  //   }
  //   console.log(result);
  //   callBack(result);

  // });

};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url+'\n', function(err, file){
    callback();
  });
  // fs.appendFileSync(exports.paths.list, siteName);
};

exports.isURLArchived = function(siteName){
  if (fs.existsSync(exports.paths.archivedSites + '/' + siteName)) {
    return true;
  };

  return false;
};

exports.downloadUrls = function(){

};

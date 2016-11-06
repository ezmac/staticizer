// Globals
var fs=require('fs');
var http=require('http');
var _=require('lodash');
var jsdom=require('jsdom').jsdom;
var doc=jsdom();
var window=doc.defaultView;

// customizable functions *should later pull from options
function getRequestOptionsForPath(path){
  //
  return {
    host: 'www.cornell.edu',
    port: 80,
    path: path
  };
}

function writeFile(filePath, contents){
  fs.writeFile(filePath, contents, function(error){
    return console.log(err);
  });
}
function fetchPage(url, callback){
  options = getRequestOptionsForPath(url);
  var body='';
  http.get(options, function(res){
    console.log(res.statusCode);
    res.on('data',function(data){
      body+=data;
    }).on('end',function(){
      callback(body);
    });
  }).on('error',function(err){
    console.log(err);
  });
}
function chunkToFile(chunk, filePath){

}
b='';
// parsers return a chunk or empty string if no chunk is found.
//   value of the chunk should be the html that you want.
function selectorParser(selector,body){
    var $=require('jquery')(window);
    console.log('here');
    console.log($('*').html());
    return $(selector);


}
var parsers=[];
parsers[0]=function(body){return selectorParser('body', body);};
fetchPage('/',function(body){
  // here, we have the contents of the fetched page as an html document.  we want to create a new jsdom object and  use it with jquery.
  jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window){
    if (err) {
      console.error(err);
      return;
    }
    // the page is ok and we can load jquery.
    var $= window.$;

    console.log($('body').html());

  });
});

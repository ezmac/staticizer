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
  fs.writeFile('./output/'+filePath, contents, function(err){
    console.log('./output/'+filePath);
    console.log("error");
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
function selectorParser(selector,$){
    console.log('here');
    console.log(selector);
    console.log($(selector).html());
    return $(selector).html();


}
// Parsers
// a parser is a function that will get only a jquery object containing the page.  you will return what will be written to the key's .html file (key index => index.html, test/index => test/index.html)


// curry returns a function that takes one argument, the first argument.  if there are further arguments, the function returned from the first takes the next argument.
// it's weird, but powerful..  so these bind the selector in the selectorParser function and leave the second argument to be filled.
//
var curriedSelectorParser = _.curry(selectorParser);
var parsers={
  'header': curriedSelectorParser('header'),
  'panos': curriedSelectorParser('.marquee-mask'),
  'secondaryMenu':curriedSelectorParser('.secondary-menu'),
  'footer': curriedSelectorParser('.cu-ftr-inner')
};
fetchPage('/',function(body){
  // here, we have the contents of the fetched page as an html document.  we want to create a new jsdom object and  use it with jquery.
  jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window){
    if (err) {
      console.error(err);
      return;
    }
    // the page is ok and we can load jquery.
    var $= window.$;
    boundParsers=[];

    _.each(parsers, function(parser, key){
      chunk = parser($);
      writeFile(key+".html", chunk);
      //$(document).replace(
    });
    console.log($('body').html());
    // this is the context.  $ is defined.  you need $(selector) and a place to store it.

  });
});

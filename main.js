// Globals
var fs=require('fs');
var http=require('http');
var _=require('lodash');
const EventEmitter = require('events');


// page loads a page based on a url and emits a done event when it can return $ bound to that page's context.

class Page extends EventEmitter {

  constructor(options){
    super();
    this.url=options.url;
    this.requestOptions=this.getRequestOptionsForPath(options.url);
    this.jsdom=require('jsdom').jsdom;
    this.doc=this.jsdom();
    this.window=this.doc.defaultView;
    this.on('load',function(body){
        this.parsePage();
    });
    this.on('parse',function(body){
      console.log("parse!");
    });
  }
}
// customizable functions *should later pull from options
Page.prototype.getRequestOptionsForPath = function (path){
  //
  //TODO:
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
Page.prototype.fetchPage = function(url, callback){

  returnHtml = _.bind(function(body){
    this.html=body;
    this.emit('load');
  }, this);
  callback = _.bind(function(res){
    console.log(res.statusCode);
    res.on('data',function(data){
      body+=data;
    }).on('end',function(){
      debugger;
      //at here, this is the http get request.
      returnHtml(body);
      //callback(body);
    });
  });
  options = this.getRequestOptionsForPath(this.url);
  var body='';
  http.get(options, callback).on('error',function(err){
    console.log(err);
  });
}
Page.prototype.parsePage = function(){

  var doneCallback = _.bind(function(error, window){
    debugger;
    this.$= window.$;
    this.emit('parse');
    return window.$},
  this);
  this.jsdom.env(this.html, ["http://code.jquery.com/jquery.js"], doneCallback);
}




function selectorParser(selector,$){
    console.log('here');
    console.log(selector);
    console.log($(selector).html());
    return $(selector).html();
}




// this is where we create a new page
var page=new Page( { url:'/'});
page.on('done', function($){
  //this is what to do once we have jquery
  console.log(selectorParser('header', $));
});



// TODO: this needs to be changed
page.fetchPage('',function(){});


// Parsers


/*

function chunkToFile(chunk, filePath){

}

// parsers return a chunk or empty string if no chunk is found.
//   value of the chunk should be the html that you want.
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
*/
/*fetchPage('/',function(body){
  // here, we have the contents of the fetched page as an html document.  we want to create a new jsdom object and  use it with jquery.
});*/
//fetch page should take a callback. when the body is done, it should run the callback.

var _=require('lodash');
var fs=require('fs');

Page = require('./page.js').Page;
// this is where we create a new page


function selectorParser(selector,$){
    console.log('here');
    console.log(selector);
    console.log($(selector).html());
    return $(selector).html();
}


function writeFile(filePath, contents){
  fs.writeFile('./output/'+filePath, contents, function(err){
    console.log('./output/'+filePath);
    if (err)
      return console.log(err);
  });
}

var page=new Page( { url:'/'});
console.log("page created yo");

page.on('done', function($){
console.log("done fetching page");

  //this is what to do once we have jquery
  debugger;
  var chunk = selectorParser('header', $)
  var selectorToFile = _.bind(function (selector, file){
    writeFile(file, selectorParser(selector,this.$));
  },{$:$});
  selectorToFile('header','header.html');
});

page.fetchPage();

#!/usr/bin/env node

/**
 * Module dependencies.
 */

String.prototype.replaceAll = function(substring, replacement) {
  var result = '';
  var lastIndex = 0;

  while(true) {
    var index = this.indexOf(substring, lastIndex);
    if(index === -1) break;
    result += this.substring(lastIndex, index) + replacement;
    lastIndex = index + substring.length;
  }

  return result + this.substring(lastIndex);
};

var program = require('commander'),
    pkginfo = require('pkginfo')(module, 'version'),
    colors  = require("colors"),
    fs      = require('fs');

var legend = require('./legend'); // ./ means current directory, and don't need .js b/c all require files are js

program
  .version(module.exports.version, '-v, --version')
  .description('eJobs eJobs eJobs')
  .parse(process.argv);

var eJobs = program.args[0];

if( typeof(eJobs) === 'undefined') {
  console.log('EJOBS:'.bold.red + ' eJobs eJobs eJobs!'.red);
} else {
  if (eJobs.search(".hd") > 0) { // user entered a .hd file
    console.log('EJOBS: '.bold.cyan + '\\-> '.white + eJobs.white);
    var text = fs.readFileSync(eJobs).toString(); // the contents of the file
    convertCode(text);
  } else { // user entered something apart from a hd file
    console.log('EJOBS:'.bold.red + ' eJobs eJobs!'.red);
  }
}

function convertCode (text) {
  var eJobsText = text;
  
  for (i = (legend.length - 1); i >= 0; i--){
    var query = legend[i];

    eJobsText = eJobsText.replaceAll(query.replace, query.search);
  }

  eJobsText = eJobsText.replace(/hello,? world!?/ig, 'EJOBS');

  eval(eJobsText);
}

#!/usr/bin/env node

/**
 * Module dependencies.
 */

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
  if (eJobs.search(".js") > 0) { // user entered a .js file
    console.log('EJOBS: '.bold.cyan + eJobs.bold.white + ' => '.yellow + eJobs.replace('.js', '.hd').bold.white);
    var text = fs.readFileSync(eJobs).toString(); // the contents of the file
    convertCode(text);
  } else { // user entered something apart from a js file
    console.log('EJOBS:'.bold.red + ' eJobs eJobs!'.red);
  }
}

function convertCode (text) {
  var outputFileName = eJobs.replace(".js", ".hd");
  var eJobsText = text;
  
  for (i = 0; i < legend.length; i++){
    var query = legend[i];
    var re    = new RegExp(query.search, 'g');

    eJobsText = eJobsText.replace(re, query.replace);
  }
  
  fs.writeFileSync(outputFileName, eJobsText);  
}

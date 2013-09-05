
window.jshintOptions = window.module.exports; // defined in jshint-options.js
window.jshintGlobals = window.jshintOptions.globals;
delete window.jshintOptions.globals; // jsHint live plugin wants globals to be separate, and we need to delete them from the options
delete window.module; // don't leave node.js-like things sitting around

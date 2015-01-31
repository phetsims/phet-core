window.phet = window.phet || {};
window.phet.phetCore = window.phet.phetCore || {};
window.phet.phetCore.jshintOptions = window.module.exports; // defined in jshintOptions.js
window.phet.phetCore.jshintGlobals = window.phet.phetCore.jshintOptions.globals;
delete window.phet.phetCore.jshintOptions.globals; // jsHint live plugin wants globals to be separate, and we need to delete them from the options
delete window.module; // don't leave node.js-like things sitting around

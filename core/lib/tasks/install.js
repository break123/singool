// Generated by CoffeeScript 1.6.1
(function() {
  var Install, exec, fs,
    _this = this;

  fs = require('fs');

  exec = require('child_process').exec;

  Install = (function() {

    function Install(singool) {
      var _this = this;
      this.singool = singool;
      this.run = function() {
        return Install.prototype.run.apply(_this, arguments);
      };
      this.dependencies = function() {
        return Install.prototype.dependencies.apply(_this, arguments);
      };
    }

    Install.prototype.description = 'Download dependencies';

    Install.prototype.dependencies = function() {
      var component, dependencies, rootPath;
      rootPath = this.singool.rootPath();
      component = fs.readFileSync(rootPath + '/component.json');
      dependencies = JSON.parse(component).dependencies;
      return dependencies;
    };

    Install.prototype.run = function() {
      var cmd, pkg, ver, _ref,
        _this = this;
      cmd = 'cd ' + this.singool.rootPath() + ' && ./node_modules/.bin/bower install';
      _ref = this.dependencies();
      for (pkg in _ref) {
        ver = _ref[pkg];
        cmd += ' ' + pkg + '#' + ver;
      }
      console.log('Running command: ' + cmd);
      return exec(cmd, function(error, stdout, stderr) {
        if (error) {
          throw error;
        }
        if (stdout) {
          return console.log(stdout);
        } else {
          return console.log(stderr);
        }
      });
    };

    return Install;

  })();

  module.exports = Install;

}).call(this);

var request = require('request').defaults({json: true});

function Gist(token) {
  this.api = "https://api.github.com/";
  this.token = token;
}

Gist.prototype._request = function(options, cb) {
  if (this.token) {
    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = "token " + this.token;
  }
  if (!cb) cb = function() {};
  return request(options, cb);
};

Gist.prototype.gists = function(user, cb) {
  if (typeof user === 'function') {
    cb = user;
    user = false;
  }
  var url = this.api + (user ? 'users/' + user + '/gists' : 'gists');
  return this._request({url: url}, cb);
};

Gist.prototype.gist = function(id, cb) {
  if (!id) return cb("must specify id");
  var url = this.api + 'gists/' + id;
  return this._request({url: url}, cb);
};

Gist.prototype.create = function(content, cb) {
  if (!content) return cb("must specify content");
  var url = this.api + 'gists';
  return this._request({url: url, json: content, method: "POST"}, cb);
};

Gist.prototype.edit = function(id, content, cb) {
  if (!id) return cb("must specify id");
  if (!content) return cb("must specify content");
  var url = this.api + 'gists/' + id;
  return this._request({url: url, json: content, method: "PATCH"}, cb);
};

Gist.prototype.delete = function(id, cb) {
  if (!id) return cb("must specify id");
  var url = this.api + 'gists/' + id;
  return this._request({url: url, method: "DELETE"}, cb);
};

module.exports = function(options) {
  return new Gist(options);
};
request = require("request").defaults(json: true)

Gist = (token) ->
  @api = "https://api.github.com/"
  @token = token

Gist::_request = (options, cb) ->
  if @token
    options.headers = {} unless options.headers
    options.headers["Authorization"] = "token " + @token
  cb = -> unless cb
  request(options, cb)

Gist::gists = (user, cb) ->
  if typeof user is "function"
    cb = user
    user = false
  url = @api + ((if user then "users/" + user + "/gists" else "gists"))
  @_request
    url: url
  , cb

Gist::gist = (id, cb) ->
  return cb("must specify id") unless id
  url = @api + "gists/" + id
  @_request
    url: url
  , cb

Gist::create = (content, cb) ->
  return cb("must specify content") unless content
  url = @api + "gists"
  @_request
    url: url
    json: content
    method: "POST"
  , cb

Gist::edit = (id, content, cb) ->
  return cb("must specify id") unless content
  url = @api + "gists/" + id
  @_request
    url: url
    json: content
    method: "PATCH"
  , cb

Gist::delete = (id, cb) ->
  return cb("must specify id") unless id
  url = @api + "gists/" + id
  @_request
    url: url
    method: "DELETE"
  , cb

module.exports = (options) ->
  new Gist(options)

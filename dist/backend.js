require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(2);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _cors = __webpack_require__(3);
	
	var _cors2 = _interopRequireDefault(_cors);
	
	var _bodyParser = __webpack_require__(4);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _mssql = __webpack_require__(5);
	
	var _mssql2 = _interopRequireDefault(_mssql);
	
	var _authorRoutes = __webpack_require__(6);
	
	var _authorRoutes2 = _interopRequireDefault(_authorRoutes);
	
	var _bookRoutes = __webpack_require__(8);
	
	var _bookRoutes2 = _interopRequireDefault(_bookRoutes);
	
	var _courseRoutes = __webpack_require__(11);
	
	var _courseRoutes2 = _interopRequireDefault(_courseRoutes);
	
	var _dotenv = __webpack_require__(14);
	
	var _dotenv2 = _interopRequireDefault(_dotenv);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	// https://github.com/motdotla/dotenv/blob/master/README.md
	
	
	// body-parser extracts the entire body portion of an incoming request stream and
	// exposes it on req.body as something easier to interface with.
	_dotenv2.default.config();
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	/* eslint-disable no-console */
	// B''H //
	
	
	// -- ----------------------------------------------------------------------------
	var app = (0, _express2.default)();
	app.use((0, _compression2.default)());
	app.use((0, _cors2.default)());
	app.set('port', process.env.PORT || 8000);
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	var sqlConfig = {
	    user: process.env.DB_USER,
	    password: process.env.DB_PASS,
	    server: process.env.DB_SERVER,
	    database: 'Books',
	
	    options: {
	        encrypt: true // Use this if you're on Windows Azure
	    }
	};
	
	_mssql2.default.connect(sqlConfig, function (err) {
	    console.log(err);
	});
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	// Configure body-parser to be linked with Express.
	// See: https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	var authorRouter = (0, _authorRoutes2.default)(_mssql2.default);
	var bookRouter = (0, _bookRoutes2.default)(_mssql2.default);
	var courseRouter = (0, _courseRoutes2.default)(_mssql2.default);
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	app.use('/api/authors', authorRouter);
	app.use('/api/books', bookRouter);
	app.use('/api/courses', courseRouter);
	// -- ----------------------------------------------------------------------------
	
	
	// -- ----------------------------------------------------------------------------
	app.get('/', function (req, res) {
	    res.send('Hello World Ya Mon!');
	});
	
	app.listen(app.get('port'), function (err) {
	    if (err) {
	        console.log(err);
	    } else {
	        console.log('App is running on ' + app.get('port'));
	    }
	});
	// -- ----------------------------------------------------------------------------

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("compression");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("cors");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("mssql");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    var authorRouter = _express2.default.Router();
	    var authorRootController = (0, _authorRootController2.default)(sql);
	
	    // -- ----------------------------------------------------------------------------
	    authorRouter.route('/').get(authorRootController.get);
	    // -- ----------------------------------------------------------------------------
	
	
	    return authorRouter;
	};
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _authorRootController = __webpack_require__(7);
	
	var _authorRootController2 = _interopRequireDefault(_authorRootController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    // ---------------------------------------------------------
	    // localhost:8000/api/authors
	    // localhost:8000/api/authors?first_name=Rick
	    var get = function get(req, res) {
	
	        var ps = new sql.PreparedStatement();
	
	        ps.input('p_first_name', sql.VarChar(100));
	        ps.input('p_last_name', sql.VarChar(100));
	
	        ps.prepare('select * from dbo.udf_get_authors(@p_first_name, @p_last_name)', function (err) {
	            ps.execute({
	                p_first_name: req.query.first_name,
	                p_last_name: req.query.last_name
	            }, function (err, result) {
	                if (err) res.status(500).send(err);else {
	                    res.send(result.recordset);
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	    return {
	        get: get
	    };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    var bookRouter = _express2.default.Router();
	    var bookRootController = (0, _bookRootController2.default)(sql);
	    var bookIdController = (0, _bookIdController2.default)(sql);
	
	    // -- ----------------------------------------------------------------------------
	    // Install ExtensionJSONView Chrome plugin to see the JSON nicely
	    // Install Postman REST Client chrome plugin - Actually now a Chrome App
	    bookRouter.route('/').post(bookRootController.post).get(bookRootController.get);
	    // -- ----------------------------------------------------------------------------
	
	
	    // -- ----------------------------------------------------------------------------
	    // USE URL: http://localhost:8000/api/books/3
	    bookRouter.route('/:id').all(bookIdController.all).get(bookIdController.get).put(bookIdController.put).patch(bookIdController.patch).delete(bookIdController.dlt);
	    // -- ----------------------------------------------------------------------------
	
	    return bookRouter;
	};
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bookIdController = __webpack_require__(9);
	
	var _bookIdController2 = _interopRequireDefault(_bookIdController);
	
	var _bookRootController = __webpack_require__(10);
	
	var _bookRootController2 = _interopRequireDefault(_bookRootController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    // ---------------------------------------------------------
	    // .all is express middleware that'll run then pass onto get, put, patch, or delete
	    var all = function all(req, res, next) {
	
	        // const id = req.params.id;
	        var ps = new sql.PreparedStatement();
	        ps.input('id', sql.Int);
	
	        ps.prepare('select * from books where id = @id', function (err) {
	            ps.execute({
	                id: req.params.id
	            }, function (err, result) {
	                if (result.recordset.length === 0) {
	                    res.status(404).send('Not Found');
	                } else {
	                    req.book = result.recordset[0];
	                    next();
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    //
	    var get = function get(req, res) {
	        res.send(req.book);
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // put = UPDATE all fields
	    var put = function put(req, res) {
	
	        var request = new sql.Request();
	
	        // http://junerockwell.com/difference-parameters-query-strings-express-js/
	        request.input('p_id', sql.VarChar(50), req.params.id);
	        request.input('p_title', sql.VarChar(50), req.body.title);
	        request.input('p_author', sql.VarChar(50), req.body.author);
	        request.input('p_genre', sql.VarChar(50), req.body.genre);
	        request.input('p_read_flag', sql.Int, req.body.read_flag);
	
	        request.execute('usp_update_book', function (err, result) {
	
	            if (err) res.status(500).send(err);else {
	                res.send(result.recordset[0]);
	            }
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // patch = UPDATE only fields passed in
	    var patch = function patch(req, res) {
	
	        var request = new sql.Request();
	
	        // http://junerockwell.com/difference-parameters-query-strings-express-js/
	        request.input('p_id', sql.VarChar(50), req.params.id);
	        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
	        request.input('p_title', sql.VarChar(50), req.body.title);
	        request.input('p_author', sql.VarChar(50), req.body.author);
	        request.input('p_genre', sql.VarChar(50), req.body.genre);
	        request.input('p_read_flag', sql.Int, req.body.read_flag);
	        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
	        request.input('p_title_update', sql.Int, req.body.title ? 1 : 0);
	        request.input('p_author_update', sql.Int, req.body.author ? 1 : 0);
	        request.input('p_genre_update', sql.Int, req.body.genre ? 1 : 0);
	        request.input('p_read_flag_update', sql.Int, req.body.read_flag ? 1 : 0);
	
	        request.execute('usp_update_book', function (err, result) {
	
	            if (err) res.status(500).send(err);else {
	                res.send(result.recordset[0]);
	            }
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    //
	    var dlt = function dlt(req, res) {
	
	        var ps = new sql.PreparedStatement();
	        ps.input('id', sql.Int);
	
	        ps.prepare('delete from books where id = @id', function (err) {
	            ps.execute({
	                id: req.params.id
	            }, function (err) {
	                if (err) {
	                    res.status(500).send(err);
	                } else {
	                    res.status(204).send('Item deleted');
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    return {
	        all: all,
	        get: get,
	        put: put,
	        patch: patch,
	        dlt: dlt
	    };
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    // ---------------------------------------------------------
	    var post = function post(req, res) {
	
	        if (!req.body.title) {
	            res.status(400);
	            res.send('Title is required');
	        } else {
	
	            var request = new sql.Request();
	
	            request.input('p_title', sql.VarChar(50), req.body.title);
	            request.input('p_author', sql.VarChar(50), req.body.author);
	            request.input('p_genre', sql.VarChar(50), req.body.genre);
	            request.input('p_read_flag', sql.Int, req.body.read_flag);
	
	            request.execute('usp_insert_into_books', function (err, result) {
	
	                // console.log(result);
	
	                if (err) res.status(500).send(err);else {
	                    res.status(201);
	                    res.send(result.recordset);
	                }
	            });
	        }
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // http://junerockwell.com/difference-parameters-query-strings-express-js/
	    //
	    // localhost:8000/api/books
	    // localhost:8000/api/books?genre=Science%20Fiction
	    // localhost:8000/api/books?genre=Fiction
	    // localhost:8000/api/books?genre=Fiction&read_flag=0
	    // localhost:8000/api/books?genre=Fiction&read_flag=0&author=Jerry%20Mongoose
	    // localhost:8000/api/books?read_flag=0
	    var get = function get(req, res) {
	
	        /*
	        const p_author    = req.query.author;
	        const p_genre     = req.query.genre;
	        const p_read_flag = req.query.read_flag;
	        */
	
	        var ps = new sql.PreparedStatement();
	
	        ps.input('p_author', sql.VarChar(50));
	        ps.input('p_genre', sql.VarChar(50));
	        ps.input('p_read_flag', sql.Int);
	
	        ps.prepare('select * from dbo.udf_Get_Books(@p_author, @p_genre, @p_read_flag)', function (err) {
	            ps.execute({
	                p_author: req.query.author,
	                p_genre: req.query.genre,
	                p_read_flag: req.query.read_flag
	            }, function (err, result) {
	                if (err) res.status(500).send(err);else {
	                    res.send(result.recordset);
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	    return {
	        post: post,
	        get: get
	    };
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    var courseRouter = _express2.default.Router();
	    var courseRootController = (0, _courseRootController2.default)(sql);
	    var courseIdController = (0, _courseIdController2.default)(sql);
	
	    // -- ----------------------------------------------------------------------------
	    // Install ExtensionJSONView Chrome plugin to see the JSON nicely
	    // Install Postman REST Client chrome plugin - Actually now a Chrome App
	    courseRouter.route('/').post(courseRootController.post).get(courseRootController.get);
	    // -- ----------------------------------------------------------------------------
	
	
	    // -- ----------------------------------------------------------------------------
	    // USE URL: http://localhost:8000/api/courses/3
	    courseRouter.route('/:id').all(courseIdController.all).get(courseIdController.get).put(courseIdController.put).patch(courseIdController.patch).delete(courseIdController.dlt);
	    // -- ----------------------------------------------------------------------------
	
	    return courseRouter;
	};
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _courseIdController = __webpack_require__(12);
	
	var _courseIdController2 = _interopRequireDefault(_courseIdController);
	
	var _courseRootController = __webpack_require__(13);
	
	var _courseRootController2 = _interopRequireDefault(_courseRootController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    // ---------------------------------------------------------
	    // .all is express middleware that'll run then pass onto get, put, patch, or delete
	    var all = function all(req, res, next) {
	
	        // const id = req.params.id;
	        var ps = new sql.PreparedStatement();
	        ps.input('id', sql.Int);
	
	        ps.prepare('select * from courses where id = @id', function (err) {
	            ps.execute({
	                id: req.params.id
	            }, function (err, result) {
	                if (result.recordset.length === 0) {
	                    res.status(404).send('Not Found');
	                } else {
	                    req.course = result.recordset[0];
	                    next();
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    //
	    var get = function get(req, res) {
	        res.send(req.course);
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // put = UPDATE all fields
	    var put = function put(req, res) {
	
	        var request = new sql.Request();
	
	        // http://junerockwell.com/difference-parameters-query-strings-express-js/
	        request.input('p_id', sql.Int, req.params.id);
	        request.input('p_title', sql.VarChar(100), req.body.title);
	        request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
	        request.input('p_author_id', sql.Int, req.body.author_id);
	        request.input('p_length', sql.VarChar(50), req.body.length);
	        request.input('p_category', sql.VarChar(50), req.body.category);
	
	        request.execute('usp_update_course', function (err, result) {
	
	            if (err) res.status(500).send(err);else {
	                res.send(result.recordset[0]);
	            }
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // patch = UPDATE only fields passed in
	    var patch = function patch(req, res) {
	
	        var request = new sql.Request();
	
	        // http://junerockwell.com/difference-parameters-query-strings-express-js/
	        request.input('p_id', sql.Int, req.params.id);
	        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
	        request.input('p_title', sql.VarChar(100), req.body.title);
	        request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
	        request.input('p_author_id', sql.Int, req.body.author_id);
	        request.input('p_length', sql.VarChar(50), req.body.length);
	        request.input('p_category', sql.VarChar(50), req.body.category);
	        // ---    ---    ---    ---    ---    ---    ---    ---    ---    ---
	        request.input('p_title_update', sql.Int, req.body.title ? 1 : 0);
	        request.input('p_watch_url_update', sql.Int, req.body.watch_url ? 1 : 0);
	        request.input('p_author_id_update', sql.Int, req.body.author_id ? 1 : 0);
	        request.input('p_length_update', sql.Int, req.body.length ? 1 : 0);
	        request.input('p_category_update', sql.Int, req.body.category ? 1 : 0);
	
	        request.execute('usp_update_course', function (err, result) {
	
	            if (err) res.status(500).send(err);else {
	                res.send(result.recordset[0]);
	            }
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    //
	    var dlt = function dlt(req, res) {
	
	        var ps = new sql.PreparedStatement();
	        ps.input('id', sql.Int);
	
	        ps.prepare('delete from courses where id = @id', function (err) {
	            ps.execute({
	                id: req.params.id
	            }, function (err) {
	                if (err) {
	                    res.status(500).send(err);
	                } else {
	                    res.status(204).send('Item deleted');
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	
	    return {
	        all: all,
	        get: get,
	        put: put,
	        patch: patch,
	        dlt: dlt
	    };
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sql) {
	
	    // ---------------------------------------------------------
	    var post = function post(req, res) {
	
	        if (!req.body.title) {
	            res.status(400);
	            res.send('Title is required');
	        } else {
	
	            var request = new sql.Request();
	
	            request.input('p_title', sql.VarChar(100), req.body.title);
	            request.input('p_watch_url', sql.VarChar(200), req.body.watch_url);
	            request.input('p_author_id', sql.Int, req.body.author_id);
	            request.input('p_length', sql.VarChar(50), req.body.length);
	            request.input('p_category', sql.VarChar(50), req.body.category);
	
	            request.execute('usp_insert_into_courses', function (err, result) {
	
	                // console.log(result);
	
	                if (err) res.status(500).send(err);else {
	                    res.status(201);
	                    res.send(result.recordset);
	                }
	            });
	        }
	    };
	    // ---------------------------------------------------------
	
	
	    // ---------------------------------------------------------
	    // http://junerockwell.com/difference-parameters-query-strings-express-js/
	    //
	    // localhost:8000/api/courses
	    // localhost:8000/api/courses?category=Science%20Fiction
	    var get = function get(req, res) {
	
	        var ps = new sql.PreparedStatement();
	
	        ps.input('p_title', sql.VarChar(100));
	        ps.input('p_author_id', sql.Int);
	        ps.input('p_category', sql.VarChar(50));
	
	        ps.prepare('select * from dbo.udf_get_courses(@p_title, @p_author_id, @p_category)', function (err) {
	            ps.execute({
	                p_title: req.query.title,
	                p_author_id: req.query.author_id,
	                p_category: req.query.category
	            }, function (err, result) {
	                if (err) res.status(500).send(err);else {
	                    res.send(result.recordset);
	                }
	            });
	        });
	    };
	    // ---------------------------------------------------------
	
	    return {
	        post: post,
	        get: get
	    };
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map
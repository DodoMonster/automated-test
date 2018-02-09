'use strict';

/*
 * Module dependencies.
 */

const users = require('../app/controller/users');

/**
 * Expose routes
 */

module.exports = function (app) {

    app.post('/api/users', users.create);
    app.post('/api/login', users.login);
    app.get('/api/users/:id', users.load);

    /**
     * Error handling
     */

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', {error: err.stack});
            return;
        }

        // error page
        res.status(500).render('500', {error: err.stack});
    });

    // assume 404 since no middleware responded
    app.use(function (req, res) {
        const payload = {
            url: req.originalUrl,
            error: 'Not found'
        };
        if (req.accepts('json')) return res.status(404).json(payload);
        res.status(404).render('404', payload);
    });
};

'use strict';

/*
 * Module dependencies. 
 */
const script = require('../app/controller/script'),
    testJob = require('../app/controller/testJob');

module.exports = function (app) {
    app.post('/api/createScript', script.create);
    app.post('/api/uploadScript', script.upload);
    app.get('/api/getScript', script.list);
    app.post('/api/deleteScript', script.delete);     
    
    app.post('/api/runJob', testJob.run); 
    app.get('/api/getResult', testJob.list);
    app.post('/api/deleteResult', testJob.delete);     
    

    // app.get('/api/script/:id', script.load);

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message &&
            (~err.message.indexOf('not found') ||
                (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', {
                error: err.stack
            });
            return;
        }

        // error page
        res.status(500).render('500', {
            error: err.stack
        });
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
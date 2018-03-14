'use strict';

/*
 * Module dependencies. 
 */
const user = require('../app/controller/user'),
    project = require('../app/controller/project'),
    script = require('../app/controller/script'),
    task = require('../app/controller/task');
const fs = require('fs.promised');
const join = require('path').join;


module.exports = function (app) {
    const login = async function (ctx, next) {
        ctx.response.type = 'html';
        ctx.response.body = await fs.readFile(join(__dirname, '../web/src/login.html'), 'utf8');
    };

    app.get('/login', login);
    app.get('/api/user/getUserList', user.list);
    app.post('/api/user/createUser', user.create);
    app.post('/api/user/deleteUser', user.delete);
    app.post('/api/user/editUser', user.edit);
    app.post('/api/user/login', user.login);
    
    app.get('/api/project/getProjectList', project.list);
    app.post('/api/project/createProject', project.create);
    app.post('/api/project/editProject', project.edit);
    app.post('/api/project/deleteProject', project.delete);

    app.post('/api/script/createScript', script.create);
    app.post('/api/script/uploadScript', script.upload);
    app.get('/api/script/getScript', script.list);
    app.post('/api/script/deleteScript', script.delete);
    app.post('/api/script/editScript', script.edit);

    app.post('/api/task/runJob', task.run);
    app.get('/api/task/getResult', task.list);
    app.post('/api/task/deleteResult', task.delete);

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
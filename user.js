module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all users to populate the users table.
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT id, userName, email, password, country FROM user", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
            complete();
        });
    }


    // Display all the users on the page.
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteuser.js"];
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('user', context);
            }

        }
    });

    // Adds an entity, redirects to page after adding.

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO user (userName, email, password, country) VALUES (?,?,?,?)";
        var inserts = [req.body.userName, req.body.email, req.body.password, req.body.country];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/user');
            }
        });
    });




    // Just get one.
    function getUser(res, mysql, context, id, complete){
        var sql = "SELECT id, userName, email, password, country FROM user WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
            complete();
        });
    }



    // Desiplays one for updating.
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateuser.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-user', context);
            }

        }
    });


    // For updating an entity.
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE user SET userName=?, email=?, password=?, country=? WHERE id=?";
        var inserts = [req.body.userName, req.body.email, req.body.password, req.body.country];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });





    // Deletes an entity

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM user WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })



    return router;
}();

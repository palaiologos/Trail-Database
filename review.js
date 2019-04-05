module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all review to populate the review table.
    function getReviews(res, mysql, context, complete){
        mysql.pool.query("SELECT id, date, comment FROM review", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.review  = results;
            complete();
        });
    }


    // Display all the review on the page.
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletereview.js"];
        var mysql = req.app.get('mysql');
        getReviews(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('review', context);
            }

        }
    });

    // Adds an entity, redirects to page after adding.

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO review (date, comment) VALUES (?,?)";
        var inserts = [req.body.date, req.body.comment];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/review');
            }
        });
    });




    // Just get one.
    function getReview(res, mysql, context, id, complete){
        var sql = "SELECT id, date, comment FROM review WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.review = results[0];
            complete();
        });
    }



    // Desiplays one for updating.
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatereview.js"];
        var mysql = req.app.get('mysql');
        getReview(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-review', context);
            }

        }
    });


    // For updating an entity.
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE review SET date=?, comment=? WHERE id=?";
        var inserts = [req.body.date, req.body.comment];
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
        var sql = "DELETE FROM review WHERE id = ?";
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

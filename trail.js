module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all trails to populate the trail table.
    function getTrails(res, mysql, context, complete){
        mysql.pool.query("SELECT id, trailName, distance, difficulty, elevationGain, dogFriendly, season FROM trail", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.trail  = results;
            complete();
        });
    }


    // Display all the trails on the page.
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletetrail.js"];
        var mysql = req.app.get('mysql');
        getTrails(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('trail', context);
            }

        }
    });

    // Just get one.
    function getTrail(res, mysql, context, id, complete){
        var sql = "SELECT id, trailName, distance, difficulty, elevationGain, dogFriendly, season FROM trail WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.trail = results[0];
            complete();
        });
    }



    // Desiplays one for updating.
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatetrail.js"];
        var mysql = req.app.get('mysql');
        getTrail(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-trail', context);
            }

        }
    });


    // For updating an entity.
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE trail SET trailName=?, distance=?, difficulty=?, elevationGain=?, dogFriendly=?, season=? WHERE id=?";
        var inserts = [req.body.trailName, req.body.distance, req.body.difficulty, req.body.elevationGain, req.params.dogFriendly, req.params.season];
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




    // Adds an entity, redirects to page after adding.

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO trail (trailName, distance, difficulty, elevationGain, dogFriendly, season) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.trailName, req.body.distance, req.body.difficulty, req.body.elevationGain, req.body.dogFriendly, req.body.season];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/trail');
            }
        });
    });


    // Deletes an entity

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM trail WHERE id = ?";
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

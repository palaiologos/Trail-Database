module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all location to populate the location table.
    function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT id, region, nearestCity FROM location", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.location  = results;
            complete();
        });
    }

    // Display all the location on the page.
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletelocation.js"];
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('location', context);
            }

        }
    });

    return router;
}();

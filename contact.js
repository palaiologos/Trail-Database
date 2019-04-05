module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get all contact to populate the contact table.
    function getContacts(res, mysql, context, complete){
        mysql.pool.query("SELECT id, orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL FROM contact", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contact  = results;
            complete();
        });
    }


    // Display all the contact on the page.
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecontact.js"];
        var mysql = req.app.get('mysql');
        getContacts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('contact', context);
            }

        }
    });


    // Adds an entity, redirects to page after adding.

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO contact (orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.orgName, req.body.orgAddress, req.body.city, req.body.state, req.body.zipCode, req.body.phoneNumber, req.body.websiteURL];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/contact');
            }
        });
    });



    // Just get one.
    function getContact(res, mysql, context, id, complete){
        var sql = "SELECT id, orgName, orgAddress, city, state, zipCode, phoneNumber, websiteURL FROM contact WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contact = results[0];
            complete();
        });
    }



    // Desiplays one for updating.
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatecontact.js"];
        var mysql = req.app.get('mysql');
        getContact(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-contact', context);
            }

        }
    });


    // For updating an entity.
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE contact SET orgName=?, orgAddress=?, city=?, state=?, zipCode=?, phoneNumber=?, websiteURL=? WHERE id=?";
        var inserts = [req.body.orgName, req.body.orgAddress, req.body.city, req.body.state, req.params.zipCode, req.params.phoneNumber, req.params.websiteURL];
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
        var sql = "DELETE FROM contact WHERE id = ?";
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

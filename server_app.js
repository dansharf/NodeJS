  // Web API.  
  app.post('/api/setX/:username', checkAuthUser, function(req, res) {
     var username = req.params.username;
     var preference = JSON.parse(req.body.jsonString);
     if (dbConnected == true) {
       db.collection('CollectionName').updateOne({username: username}, {$set: preference}, {upsert: true});
       setTimeout(function() {
          db.collection('CollectionName').find({username: username}).limit(1).toArray(
            function(err, document) {
              req.session.style = document;
              res.end();
            })
       }, 1000)
     }
     else res.end();
   });

   app.get('/api/getX/:username', checkAuthUser, function(req, res) {
     sessionStyle = req.session.style;
     if (sessionStyle) res.json(sessionStyle);
     else if (dbConnected == true) {
       var username = req.params.username;
       db.collection('preferences').find({username: username}).limit(1).toArray(
          function(err, document) {
               req.session.style = document;
               res.json(document);
           })
     }
     else res.end();
const mongoDB = require('mongodb')
const url = 'mongodb://localhost:27017'

const dbName = 'test'

exports.getTestDB = (req, res) => {
    mongoDB.MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        if(err){
            res.send({err: 'has error in DB connection'});
            console.log(err);
            return;
        }

        let db = client.db(dbName);
        db.collection('testtable').findOne({name:'hello'}, function(err, result){
            if(err){
                console.log(err);
                res.send({err: 'can not fetch the data'});
                return;
            }
            res.send(result);
        })
    });
}



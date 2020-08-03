const mongoDB = require('mongodb');
//const url = 'mongodb://localhost:27017';
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
console.log('Connecting to DB: ' + DB_HOST);
const url = 'mongodb://' + DB_USER + ':' + DB_PASSWORD + DB_HOST;


const DBName = 'pdf';
const FilesTable = 'files';
const mClient = mongoDB.MongoClient;

exports.getTestDB = (req, res) => {
    mongoDB.MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        if(err){
            res.send({err: 'has error in DB connection'});
            console.log(err);
            return;
        }

        let db = client.db(DBName);
        db.collection('testtable').findOne({name:'hello'}, function(err, result){
            if(err){
                console.log(err);
                //res.send({err: 'can not fetch the data'});
                return;
            }
            console.log(result);
        
            //res.send(result);
        })
    });
}

const connectDB = (pDBName) => {
    const options = {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }
    return mClient.connect(url, options).then( (client) => {
        return client.db(pDBName);
    });
}

const getConnTable = (table) => {
    return  connectDB(DBName).then(db => {
        return db.collection(table);
    });
}

const getRecord = (table, query) => {
    return getConnTable(table).then( table => {
        return table.findOne(query).then(result => {
            return result;
        });
    });
}

const saveRecord = (table, dataDoc) => {
    return getConnTable(table).then(table => {
        return table.insertOne(dataDoc).then( result => {
            console.log('saved', result.insertedId, dataDoc);
            return result;
        });
    });
}

const deleteRecord = (table, query) => {
    return getConnTable(table).then(table => {
        return table.deleteOne(query).then( result => {
            return result;
        });
    })
}

exports.getRecord = getRecord;
exports.saveRecord = saveRecord;
exports.deleteRecord = deleteRecord;
exports.getConnTable = getConnTable;
exports.FilesTable = FilesTable;

const mongoDB = require('mongodb');
const url = 'mongodb://localhost:27017';

const DBName = 'pdf'; //pdf
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

//exports.getTestDB(null, null);


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

// saveRecord('files', {'name': '042a3dff-1656-45ce-acc2-dc0eaa9c8ebe.txt'}).then(result => {
//     getRecord('files', {_id: result.insertedId});
// });
//getRecord('files', {name: '042a3dff-1656-45ce-acc2-dc0eaa9c8ebe.txt'});

//getRecord('testtable', {name:'hello'});
// connectDB(dbName).then(db => {
//     console.log('connect to ' + dbName);
// }).catch( err => {
//     console.log(err);
// });
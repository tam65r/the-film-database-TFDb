const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function insertData(db, collec, data) {
    try {
        await client.connect();
        const database = client.db(db); 
        const collection = database.collection(collec); 


        if (Array.isArray(data)) {
            const result = await collection.insertMany(data);
            console.log(`${result.insertedCount} documents inserted`);
        } else {
            const result = await collection.insertOne(data);
            console.log(`1 document inserted with id: ${result.insertedId}`);
        }

    } catch (error) {
        console.log('Error trying to save files to database: ' + error);
    } finally {
        await client.close();
    }
}


const allMovies = JSON.parse(fs.readFileSync('all_movies_with_details.json', 'utf8'));


insertData('TFDb', 'movies',allMovies);
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

const CSV_PATH = "csv_files";

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function readCSV(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(`${filepath} pushed successfully.`);
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}


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


const database = await readCSV(`${CSV_PATH}/TMDB_movie_dataset_v11.csv`);

insertData('TFDb', 'films', database);
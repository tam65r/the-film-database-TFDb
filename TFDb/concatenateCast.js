
import fs from 'fs';
import csv from 'csv-parser'; 

const CSV_PATH = 'csv_files';

async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(`${filePath} pushed successfully.`);
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

function concatenateCast(cast, people, jobs) {
  
    let allCast = [];
    
    cast.forEach(member => {
        let castPerson = {
            'movie_id': member.movie_id,
            'person_id': member.person_id,
            'role': member.role,
        };

        jobs.forEach(job => {
            if(member.job_id == job.job_id) {
                castPerson = {...castPerson, 'job': job.name};
            }
        });

        people.forEach(person => {
            if (member.person_id = person.id) {
                const ps = {
                     'name': person.name,
                     'birthday': person.birthday,
                     'deathday': person.deathday,
                     'gender': person.gender,
                }
                castPerson = {...castPerson, ps};
            }

        });
        
        allCast.push(castPerson);
    });

    return allCast;
} 

const casts = await readCSV(`${CSV_PATH}/all_casts.csv`);
const people = await readCSV(`${CSV_PATH}/all_people.csv`);
const jobs = await readCSV(`${CSV_PATH}/job_names.csv`);

const conctCast = concatenateCast(casts,people,jobs)

const json = JSON.stringify(conctCast, null, 2); 

fs.writeFileSync(`${CSV_PATH}/conc_cast.json`, json, 'utf8');

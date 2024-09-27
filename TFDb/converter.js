const fs = require('fs');
const csv = require('csv-parser');

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

function retrieveCategories(catsId, catsNames, movieId) {
    let categories = [];
    let tempCat = [];
    catsId.forEach(cat => {
        if (cat.movie_id == movieId) {
            tempCat.push(cat);
        }
    });

    catsNames.forEach(cat => {
        tempCat.forEach(movieCat => {
            if (movieCat.category_id == cat.category_id && cat.language_iso_639_1 == 'en') {
                categories.push({'name': cat.name, 'id': cat.category_id});
            }
        });
    });
    
    return categories;
}


function retrieveCast(cast, movieId) {
    
    let actors = [];

    cast.forEach(member => {
        if (member.movie_id == movieId) {

            const details = {'details': member.ps};
            const cast = {...member, ...details};

            delete cast.ps;
            delete cast.movie_id;
           

            actors.push(cast);
        }
    });

    return actors;
}


async function buildMoviesJson() {
    try {

        const allMovies = [];

        const movies = await readCSV(`${CSV_PATH}/all_movies.csv`);
        const casts = await readCSV(`${CSV_PATH}/all_casts.csv`);
        //const categories = await readCSV(`${CSV_PATH}/all_categories.csv`);
        const characters = await readCSV(`${CSV_PATH}/all_characters.csv`);
        //const alias = await readCSV(`${CSV_PATH}/all_people_aliases.csv`);
        const people = await readCSV(`${CSV_PATH}/all_people.csv`);
        const votes = await readCSV(`${CSV_PATH}/all_votes.csv`);
        const categoriesNames = await readCSV(`${CSV_PATH}/category_names.csv`);
        //const imagesIds = await readCSV(`${CSV_PATH}/image_ids.csv`);
        //const imagesLicenses = await readCSV(`${CSV_PATH}/image_licenses.csv`);
        const jobs = await readCSV(`${CSV_PATH}/job_names.csv`);
        const moviesCategories = await readCSV(`${CSV_PATH}/movie_categories.csv`);
        const moviesDetails = await readCSV(`${CSV_PATH}/movie_details.csv`);
        
        const conctCast = JSON.parse(fs.readFileSync(`${CSV_PATH}/conc_cast.json`, 'utf8'));
        

        movies.forEach(movie => {

            //testing
            console.log(movie.id);

            let film = {
                'name': movie.name,
                'id': movie.id,
                'release': movie.date,
            };

            const categories = retrieveCategories(moviesCategories,categoriesNames,movie.id);
            const cast = retrieveCast(conctCast, movie.id);

            moviesDetails.some(details => {
                if (movie.id == details.movie_id) {
                    film = {
                        ...film, 
                        'runtime': details.runtime,
                        'budget': details.budget,
                        'revenue': details.revenue
                    };
                    return true;
                }
                return false;
            });

            votes.some(vote => {
                if (movie.id == vote.movie_id) {
                    film = {
                        ...film, 
                        'vote_average': vote.vote_average,
                        'votes_count': vote.votes_count
                    };
                    return true;
                }
                return false;
            });


            film = {film, categories, cast};

            allMovies.push(film);
        });

        const jsonFilm = JSON.stringify(allMovies, null, 2); 

        fs.writeFileSync('all_movies_with_details.json', jsonFilm, 'utf8');

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

buildMoviesJson();
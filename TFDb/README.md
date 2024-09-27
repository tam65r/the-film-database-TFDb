# TFDb Setup

## Overview

The Film Database (TFDb) is a created with the information openly available in [omdb - Open Media Database](https://www.omdb.org/en/us/content/Help:DataDownload).

## Prerequisites

* Node.js
* MongoDB
* npm

## Instructions

MongoDB Comunity Edition can be installed following the tutorial available in [MongoDb](https://www.mongodb.com/docs/manual/installation/).

### Step 1

Run `npm install` to install all dependencies.

### Step 2

Run `node concatenateCast.js` to create a .json file with the information of all the cast members and their respective jobs and names.

### Step 3

Run `node converter.js` to join all information to a single .json file.

### Step 4

Run `node databaseAddMovies.js` to add the movie collection to the database.

**NOTE**: depending on what port or url your MongoDB is running you might have to change it in the code.


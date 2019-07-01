# Trail Blazer
## Nathan Chan | July 3, 2019
### General Assembly - Software Engineering Immersive Project 2: HTML, CSS/Bootstrap, Javascript, Node.js, Express,js, Postgres, Sequelize
#### Check out a demo of the site here: 

## Introduction
Looking for your next adventure? Here's where it begins! 
This site supports your search for your next hike providing searched results based on similar features to hikes you like as well as reviews of those hikes. 

Screenshot of the app:




## Project Requirements
This is the second project that will be incorporated as part of the portfolio of the General Assembly Software Engineering Immersive. The goal is to combined all that we have learned in Units 1 and 2 (HTML, CSS, Javasript, Node.js, Express.js, Postgres, Sequelize, and Authentication) into a web application that we can publish. 

### Technical Requirements
The technical requirements for the project are as follows: 

* Have at least 2 models (more if they make sense) -- ideally a user model and one that represents the main functional idea for your app
* Include sign up/log in functionality, with hashed passwords & an authorization flow
* Incorporate at least one API. Examples include Yelp, Tumblr, Facebook, and others on Mashape.
* Have complete RESTful routes for at least one of your resources with GET, POST, PUT, and DELETE
* Utilize an ORM to create a database table structure and interact with your relationally-stored data
* Include a readme file that explains how to use your app
* Have semantically clean HTML, CSS, and back-end code
* Be deployed online and accessible to the public


# Building the App

Run npm install to install all of the dependencies


## Pulling from APIs

This project combines three APIs with an option to incorporate additional ones: 
1. Hiking Project API - 
2. Dark Sky API - 
3. Mapbox API - 

Images of the API sites

### Hiking Project API


### Dark Sky API


### Mapbox API 





## Database Design
After finding the appropriate data, the data connections were established to develop an app that meets the technical requirements of this project. 

Image of the database structure


## Wireframing and User Exprience


### Route Files

#### Site Experience
Description and Images of the site

Home 

Profile / Signup 

Favorites 

Similar Results

 







# Express Authentication

Express authentication template using Passport + flash messages + custom middleware

## Getting Started

#### Scaffold w/tests (see `master` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database

#### Finished version (see `brian-finished` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Run `createdb express_auth_development` to create the development database
  * Run `createdb express_auth_test` to create the test database
  * Run `sequelize db:migrate` to run migrations




### Built with
* HTML 
* CSS (including Bootstrap)
* Javascript
* Google Fonts
* Node.js
* Express.js
* Postgres
* Sequelize


### Credit To:
* alltrails.com for web content and layout inspiration
* Hiking Project API
* Dark Sky API
* Mapbox API


#### Additional Collaborators:
Thanks to Steve Peters, Carlo Bruno, Mike Shull, and many others in the SEI-SEA-25 cohort for their ideas and thoughts that were incorporated in this project

### Additional Functionality and Wish List
* Adding in actual reviews by pulling from the Yelp API
* Incorporating camping sites and fishing spots
* Linking a trip to suggest good food places nearby
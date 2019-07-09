# Trail Blazer
## Nathan Chan | July 3, 2019
### General Assembly - Software Engineering Immersive Project 2: HTML, CSS/Bootstrap, Javascript, Node.js, Express,js, Postgres, Sequelize
#### Check out a demo of the site here: 

## Introduction
Looking for your next adventure? Here's where it begins! 
Use this site to search for your next hike! Search for your next hike, save them to your favorites, post reviews, and find similar hikes. 
Although there are similar sites available to the public, the existing sites provide an overwhelming amount of information at times which is difficult to understand and sort through. 

Screenshot of the app:
<img src="./public/img/Trailblazer.png" height = 200px width = 400px>



## Project Requirements
This is the second project that will be incorporated as part of the portfolio of the General Assembly Software Engineering Immersive. The goal is to combined all that we have learned in Units 1 and 2 (HTML, CSS, Javasript, Node.js, Express.js, Postgres, Sequelize, and Authentication) into a web application that we can publish for the public. 

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
1. Hiking Project API - https://www.hikingproject.com/data
2. Dark Sky API - https://darksky.net/dev/docs#overview
3. Mapbox API - https://docs.mapbox.com/api/search/

Images of the API sites

### Hiking Project API
<img src="./public/img/HikingProject.png" height = 200px width = 400px>


### Dark Sky API
<img src="./public/img/DarkSky.png" height = 200px width = 400px>

One challenge that I ran into with the Dark Sky API was the fact that it would only allow 1,000 API calls per day. I reached that limit because I was initially calling the API on each search which would return 20 trails each with their own Dark Sky API call. After this, I refactored the code to only show weather for the trail of choice 


### Mapbox API 
<img src="./public/img/Mapbox.png" height = 200px width = 400px>

A challenge with Mapbox was the map itself was not being displayed properly as the map seemed to only show up on half of the space created for it. After doing some digging, I found that some of the CSS styling needed updating. 

## Planning
About 4-8 hours of the project was devoted to initial planning, database diagrams, and wireframing. 

### Database Design
After finding the appropriate data, the data connections were established to develop an app that meets the technical requirements of this project. 

Database Structure
<img src="./planning/ERDiagram_Project2_v2.png" height = 200px width = 400px>


### Wireframing and User Exprience
Initial wireframes were drawn to understand the general flow of a user through the web app. The wireframing also helped to establish the initial routes and pages that would be referenced

#### Route Files
The requirements of this project included implementing all four CRUD (Create, Read, Update, Delete) routes. The way this CRUD routes were constructed were initiall determined by the wireframing and user experience. 
<img src="./planning/Routes.jpg" height = 200px width = 400px>

#### Site Experience
The following are wireframe diagrams that best capture the initial thoughts for this web app. 

Description and Images of the site:

##### Home 
<img src="./planning/Home Page.png" height = 200px width = 400px>


##### Profile / Signup 
<img src="./planning/Login Page.png" height = 200px width = 400px>

##### Favorites 
<img src="./planning/Show Page.png" height = 200px width = 400px>

##### Similar Results
<img src="./planning/Search Page Redirect.png" height = 200px width = 400px>

 







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
* hikingproject.com for web content and layout inspiration as well as icons
* Hiking Project API
* Dark Sky API
* Mapbox API
* Abe Yang for his initial investigation into the Dark Sky API


#### Additional Collaborators:
Thanks to Steve Peters, Carlo Bruno, Mike Shull, and many others in the SEI-SEA-25 cohort for their ideas and thoughts that were incorporated in this project

### Additional Functionality and Wish List
* Incorporating multi-page view so that it would show only 10 results per page with a link to scroll to the next set of 10. 
* Adding in actual reviews by pulling from the Yelp API
* Incorporating camping sites and fishing spots
* Linking a trip to suggest good food places nearby
# Exercise Tracker App

This project was built to showcase Frontend and Backend skills of web development.
The application was built on NodeJS + Express + MongoDB as the Backend Technology and ReactJS with Redux, redux-thunk and bootstrap as the Front End Technology.
Stack: MERN

## ReactJS Dependencies
The dependencies used for the front end are as follows:
* axios             - To make requests from front end to backend
* moment            - To help to format Date
* redux             - Redux used to help with state management for cleaner code
* redux-thunk       - to help with making dispatch actions asynchronously

## NodeJS Dependencies
The dependencies used for the backend are as follows:
* bcryptjs          - package to help with password-hashing before storing in mongoDB
* jsonwebtoken      - provides JSON web token to be able to make requests
* express           - NodeJS framework used to develop the backend
* express-validator - middleware to check whether data sent to backend is valid
* mongoose          - used to be able to manipulate mondoDB collections
* dotenv            - Environmental Variables stored within

## Hosting
This application is currently being hosted using Heroku.

A demo of the application can be viewed at
URL: https://elikamwa-exercise-tracker.herokuapp.com

# How to Use
The application has been implemented using Authentication and JSONWebToken to be able to access it.

You will require to register or login using an account to be able to access the website. If you do not wish to create an account, you can use the test account in the database to be able to navigate through the web application.

## Authentication
Authenticating to the web application will provide you with a JSON web token that you will be using to navigate throughout the application. The web token is valid for 24 hours. After the 24 hours, it will automatically expire and will ask you to re-authenticate on your next login.

## Users
You require to authenticate to get inside the application, but whether you authenticate using the test account or your own account, the list of users and exercises are viewable and editable to everyone. This application was intended to be used by a single user but however, registration was implemented to showcase CRUD (Create, Read, Update, and Delete) operations + authentication.

You can create several users who will all be able to create their own personalized exercises logged.

// TODO - Plans for the app in the future will be such that all users registered will have their own list of users and exercises.

## Exercises
Once you have a user created, you can go to the Create Exercises Log tab to be able to start logging your exercises. For instance, if user_1 and user_2 have been created, you are able to create an exercise and have a dropdown to choose which user you want to log the exercise for.

After an exercise has been created, you are able to view the list of all the exercises created

// TODO - Being able to sort the exercises list when clicking on the table header
// TODO - Add some radio buttons to only display exercises for a requested user
# About Time 📱
This is the Backend for the React App About Time develped as part of the futureproof Bootcamp - Auguste Cohort.

## What is it? 🤷‍♂️
The About Time App is a live, multiplayer quiz game that uses questions from the [Open Trivia Database](https://opentdb.com/).
In order to play you can visit the Homepage of the deployed client and click o the Help Button.

## Why this app? 🤷‍♂️
This app has been developed as part of the curriculum of the futureproof bootcamp, Auguste Cohort, in Lap 3 (9-10 weeks into the bootcamp).

## Where to find them 👀
The Frontend is currently deployed on Netlify at [this address](https://about-time.netlify.app).
The Backend is currently deployed on Heroku at [this address](https://lap3quizzer.herokuapp.com).

## How to install and use the local version 💾
In order to use the app locally you will need Docker, so be sure to have than installed before trying the following commands.

1. clone this repo
```
git clone git@github.com:buscaroli/Lap3-Project-Backend.git
```
2. enter the folder
```
cd Lap3-Project-Backend
```
3. You can now start the backend server and database
```
sh ./_scripts/start.sh
```
4. You can install the frontend app by following the instructions located at [this address](https://github.com/Aaron-Marsh/Lap3_project_client)

## How to test 🧪
Follow steps 1 and 2 then
```
sh ./_scripts/startTest.sh
```
or
```
sh ./_scripts/startCoverage.sh
```

## Technologies used 📡
- NodeJS
- ExpressJS
- PostgreSQL
- Docker
- Axios
- Socket.io
- Jest
- Supertest

## Challenges
Implementing a live quiz meant we had to learn to use socket.io and to make it work both serverside and clientside so a lot of communication was required between the memebers of the team. The use of a Kanban board (hosted on Trello) helped greatly in this regard.

## Wins
The App was a great succes on our final presentation, it looks quite polished (in has been developed in 4 days) and it's fun to play.

## Team 👨‍🦲👱‍♀️
The development of the whole App (Frontend and Backend) has been made possible by the combined efforts of:
[Aaron](https://github.com/aaron-marsh)
[George](https://github.com/GMillerMc)
[Matteo (me!)](https://github.com/buscaroli)
[Nasiima](nasiima)
[Tom](millman97)

# Solo project - ScreenSleuth



## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

ScreenSleuth is a comprehensive movie database powered by TMDB API. The page was designed using React, Tailwind, and Vite as builder.
Explore a vast collection of films and TV shows, with in-depth information about each title including plot summaries, ratings and a trailer.Whether you're a cinephile or just looking for something to watch, ScreenSleuth has got you covered. 
The landing page was designed to be mobile-friendly, with a modern and attractive look. The header included a logo and a hamburger menu for mobile devices.
Responsive design techniques were employed to ensure the page looked great on all devices. The page was tested on multiple broswers.

### Links

- Solution URL: [https://github.com/DjurovicAleksandar/ScreenSleuth-TMDB](https://github.com/DjurovicAleksandar/ScreenSleuth-TMDB)
- Live Site URL: [https://screensleuth-dbb21.web.app/](https://screensleuth-dbb21.web.app/)

## My process

First, I started by setting up the React project using Vite as the build tool and Tailwind as the CSS framework. I created the basic folder structure for the project, installed the necessary dependencies, and set up the project's configuration files.

Next, I created a home page component that displayed a list of popular movies fetched from the TMDB API, and navigation with a search bar. I used the Ajax to make API calls.

After creating the home page, I created a movie detail page component that displayed the details of a selected movie. I used React Router to handle the routing between the home page and the movie detail page.

Besides that, I also created a added list of movies on home page, based on their category (upcoming, top 250, etc).

Then, I created a separate component for the search results and added it to the home page. When a user searches for a movie, the search results component fetches the search results from the TMDB API and displays them.

I added functionality to allow users to add movies to a watchlist and created a watchlist component to display the user's saved movies, using a firebase firestore as database.

Finally, I added some finishing touches to the application by implementing responsive design to ensure the application looked great on all devices. I also added some animations to make the application more interactive and engaging.

### Built with

- ReacJS
- Tailwind css
- Firebase
- Firebase firestore
- Vite
- TMDB Api
- Youtube trailer API
- Mobile-first workflow

### What I learned

Throughout the development process, I learned a lot about working with APIs, using the React Context API to manage state, using Firebase Firestore, and implementing responsive design with Tailwind. I also gained experience in using Vite as a build tool for React projects.

## Author

- Website - [Aleksandar Đurović](https://aleksandardjurovic.netlify.app/)


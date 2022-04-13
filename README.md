# Blog feed App - Angular typescript

![Blog Feed App](./src/assets/gif.gif)

[![Demo](https://img.shields.io/badge/Go-to_the_app-red.svg?style=flat-square)](https://6256e2eeb065202dc6671de2--silly-custard-0bbae2.netlify.app/feed)

Note: For the demo to work, the server needs to be running on localhost:9000.

## Introduction

Hello there! Here you can find a small angular app that simulates a feed of blog posts.

## Features

The main feature of this app is to show a list of posts. It is possible to view a single post on different view and add comments. Client side caching has been used to save the user's favorite posts.

The existing features in the project are:

- List of posts on the homepage
- Single post view
- Add/remove favorite
- Add comments
- 404 page
- Unit tests
- Client side caching
- SCSS/SASS

Packages & Technologies used in the repo:

- `angular framework`
- `rxjs`
- `karma/jasmine`
- `typescript`

## Run it on your machine

For this project, it was used a local server ([json-server]) running on localhost at port 9000.

```sh
# Clone this repository

$ git clone https://github.com/FMMonteiro/Blog-feed.git

# Go into the repository

$ cd blog-feed

# Install dependencies

$ npm install

# Run the app

$ ng serve

## Run unit tests


```

## Run tests

```sh
# Run the tests

$ ng test
```

[json-server]: https://github.com/typicode/json-server

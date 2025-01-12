# Movie World Client

Movie World Front is a Vue.js application that allows users to browse, like, and hate movies. Users can also log in and sign up to access additional features.

## Project setup

To set up the project, run the following command:

```sh
npm install
```

### Compiles and hot-reloads for development

To start the development server, run:

```sh
npm run serve
```

### Compiles and minifies for production

To build the project for production, run:

```sh
npm run build
```



### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



## Components

### `App.vue`

The main component that includes the header, movie list, and modals for login and sign-up.

### `MovieCard.vue`

A component that displays individual movie details and includes a link to fetch user movies.

### `CustomModal.vue`

A reusable modal component used for login and sign-up forms.

### `LoginForm.vue`

A component for the login form.

### `SignUpForm.vue`

A component for the sign-up form.

### `SortOptions.vue`

A component that provides sorting options for the movie list.

## API

### `api.js`

Contains functions to interact with the backend API, including fetching movies and user-specific movies.

## Store

### `store.js`

Vuex store to manage the application's state, including user authentication and movie data.

## Usage

1. **Login**: Click on the "Log in" button and enter your credentials.
2. **Sign Up**: Click on the "Sign Up" button and fill in the required details.
3. **Browse Movies**: View the list of movies and sort them by likes, hates, or date.
4. **Like/Hate Movies**: If logged in, you can like or hate movies.
5. **Fetch User Movies**: Click on the user's name to fetch movies posted by that user.

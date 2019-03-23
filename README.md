# Standard Work Front End Application

An application to standardize & document your work process.

---

The following is an overview of the structure and tooling used in constructing this software.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Architecture

This app uses and architectual pattern called Flux. Flux is implemented with a tiny library called [Redux](https://redux.js.org/introduction/motivation). Reading the redux documentation will help with understanding this. Note: with 500,000 downloads / day, redux is one of the most downloaded JavaScript packages. React just hit 5M downloads/week, while redux is around 3M. https://www.npmjs.com/package/react

## Quirks / Other

- API Request handles the interface with the api
- The NetworkHandler is a redux action creator that runs the IsFetching => Success => Error process for every request/response. It calls the api request to do this.
- The response handler formats the response in the proper format and can generate a JSON error object based on a network error if the api is not available.

## Development

- In apiRequest.js comment out the credentials: 'include' line in apiRequest.js
- In Login.js, change Cookies.get('wrightnet_user_token') to the hardcoded value of a cookie ID obtained via loging into sw.wrightmfg.com
- In netWorkHandler.js, uncomment the adding of a user id in every request.

## Source Organization

> **Actions**: Functions triggered by UI with data that will in turn trigger a reducer function.

> **Reducers**: Functions that mutate state depending on the action.

> **Helpers**: Ancillary functions and utilities for various tasks like filtering skus or fetching data from the API.

> **Components**: Smaller React UI files that DO NOT use redux state. They are very reusable and composable for this reason. Modals, buttons, tables, warning boxes, and the like are stored here.

> **Containers**: Larger React UI files that DO USE redux state. These components are less reusable, but components are offten extracted from containers to make the containers smaller. If there is a pattern of duplicating work within a container, it's a sign that a component should be extracted from it and placed in the components folder for further reuse.

## Dependencies

Deeper descriptions of each dependency and their related GitHub repositories can be found by searching it at https://www.npmjs.com/

- `js-cookie`: Small utility for reading and writing cookies in javascript.
- `@material-ui/core`: Material UI library for React.
- `@material-ui/icons`: Material UI Icons packaged into components for easy use in React. Complementary to `@material-ui/icons`
- `@material-ui/styles`: A styling solution for Material UI. Allows injection of CSS into custom components.
- `filepond`: Easy file upload for JavaScript.
- `react-filepond`: React binding for filepond.
- `filepond-plugin-*`: Plugins for filepond.
- `lodash`: JavaScript extension utilities.
- `react`: A JavaScript library for building data-driven user interfaces.
- `react-dom`: React library for working with the DOM (react can be used on non-web apps. react-dom adds this abilty).
- `react-beautiful-dnd`: A drag and drop library for react.
- `redux`: Predictable state container for React.
- `react-redux`: React binding for Redux.
- `redux-thunk`: Allows async action creators (API calls) in redux.
- `uuid`: Universally unique ID generation for generating components with globally unique keys.
- `typeface-roboto`: Package that contains self-hosted WOFF roboto font.
- `redux-devtools-extension`: Allows dev tools to view redux state.

To run this project locally, please clone this repository and follow these steps.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import * as serviceWorker from './serviceWorker'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './containers/App/index'
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const render = ComponentToRender => {
  return ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ComponentToRender />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./containers/App/index', () => {
    const NextApp = require('./containers/App/index').default
    render(NextApp)
  })
}

serviceWorker.unregister()

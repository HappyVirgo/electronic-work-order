//Basic imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Material UI
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

//Fonts
import {
  SfUiBold,
  SfUiSemibold,
  SfUiMedium,
  SfUiLight,
  SfUiHeavy
} from './assets/fonts/'

//Store configuration
import { Provider } from 'react-redux'
import store from './store'


//Creating MuiTheme
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'SfUiDisplay',
    ].join(','),
  },  

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [SfUiMedium, SfUiBold, SfUiSemibold, SfUiLight, SfUiHeavy],
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

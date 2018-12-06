import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// {type:"UPDATE_MESSAGE",payload:"DATA"}
const rootReducer = function messageReducer(
  state = "Good morning from Reducer",
  action
) {
  switch (action.type) {
    case "UPDATE_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());

const mapStateToProps = state => {
  return {
    message: state
  };
};

let number = 0;

const generateAction = () => {
  return { type: "UPDATE_MESSAGE", payload: `Good morning ${++number}` };
};

class App extends Component {
  // state = {
  //   message: "Ciao"
  // };

  // handleChange = e => this.setState({ message: e.target.value });

  componentDidMount() {
    setInterval(() => {
      store.dispatch(generateAction());
    }, 2000);
  }

  render() {
    const {
      props: { message }
    } = this;
    return (
      <>
        <input type="text" value={message} />

        <p>The message is: {message}</p>
      </>
    );
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

const Container = props => {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
};

export default Container;

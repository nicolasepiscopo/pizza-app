import './App.scss';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import store from './state/store';
import Cart from './containers/Cart';

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="app">
          <h1>Pizza App</h1>
          <Cart />
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;

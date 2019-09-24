import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

export default ({ children }) => <Provider store={store}>{children}</Provider>;

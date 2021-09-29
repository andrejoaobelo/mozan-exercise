import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { StateProvider } from './State';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <StateProvider>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'semantic-ui-css/semantic.min.css'

// // This is a wrapper for google.script.run that lets us use promises.
// import { serverFunctions } from '../../utils/serverFunctions';

import { FirebaseContext, useAsyncEffect } from './hooks';
import { Firebase } from './components/Firebase';

import { App } from './components/App';

const container = document.getElementById('index');
const root = createRoot(container);

if (module.hot) {
    module.hot.accept();
}

root.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
);

import React, { useState } from 'react';
import './App.css';

import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/translate';

function App() {
    const locale = localStorage.getItem('locale') || LOCALES.ENGLISH
  return (
    <div className="App">
    </div>
  );
}

export default App;

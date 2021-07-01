import React from 'react';
import { Header } from './header/header';
import { Categories } from './categories/categories';
import { Route, Switch } from 'react-router-dom';
import { WordSet } from './word-set/word-set';


function App() {
  return (
    <div className="App">
      <Header />
      {/* <Categories /> */}
      {/* <WordSet /> */}
      <Switch>
        <Route path='/' component={Categories} exact/>
        <Route path='/wordset' component={WordSet}/>
      </Switch>
    </div>
  );
}

export default App;

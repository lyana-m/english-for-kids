import React from 'react';
import { Header } from './header/header';
import { Categories } from './categories/categories';
import { Route, Switch, Redirect } from 'react-router-dom';
import { WordSet } from './word-set/word-set';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/rootReducer';



const App = () => {
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  
    return (
      <div className="App">
        <Header />
        {/* <Categories /> */}
        {/* <WordSet /> */}
        <Switch>
          <Route path="/" component={Categories} exact />
          {/* <Route path="/wordset" component={WordSet} /> */}
          <Route path="/wordset" render={() => cardSetNumber === -1 ? (
            <Redirect to='/'/>
          ) : (
            <Route path="/wordset" component={WordSet} />
          )} />
        </Switch>
      </div>
    );
  }


export default App;

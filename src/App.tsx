import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './header/header';
import { Footer } from './footer';
import { Categories } from './categories/categories';
import { WordSet } from './word-set/word-set';
import { RootState } from './reducers/rootReducer';
import { IS_MENU_OPENED } from './constants';

const App = () => {
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  const isMenuOpened = useSelector((state: RootState) => state.cardSet?.isMenuOpened);
  const dispatch = useDispatch();

  const appClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      !(e.target as HTMLElement).classList.contains('nav') &&
      !(e.target as HTMLElement).classList.contains('menu') &&
      !(e.target as HTMLElement).classList.contains('line')
    ) {
      dispatch({
        type: IS_MENU_OPENED,
        isMenuOpened: false,
      });
    }
  };

  return (
    <div className="App" onClick={(e) => appClickHandler(e)}>
      <Header />
      <Switch>
        <Route path="/" component={Categories} exact />
        <Route
          path="/wordset"
          render={() => (cardSetNumber === -1 ? <Redirect to="/" /> : <Route path="/wordset" component={WordSet} />)}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

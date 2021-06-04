import './App.scss';
import { Router, Switch, Route } from 'react-router';
import CharacterCheck from './components/characterCheck/CharacterCheck';
import HistoryAnswerProvider from './context/historyAnswer.context';
import NewWordProvider from './context/newWord.context';

import Header from './components/common/Header';
import NewWordCheck from './components/newWordCheck/NewWordCheck';
import Login from './components/auth/Login';

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <HistoryAnswerProvider>
        <NewWordProvider>
          <Router history={customHistory}>
            <Header />
            <Switch>
              <Route path="/character" component={CharacterCheck} />
              <Route path="/newword" component={NewWordCheck} />
              <Route path="/login" component={Login} />
              <Route path="/" component={CharacterCheck} />
            </Switch>
          </Router>
        </NewWordProvider>
      </HistoryAnswerProvider>
    </div>
  );
}

export default App;

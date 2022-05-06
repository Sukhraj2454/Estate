
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Routes/Main';
import Home from './Routes/Home';
import Worker from './Routes/Worker';
import Search from './Routes/Search/Search';
import { createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme();
  return (
    <Router>

      <Switch>

        <Route path="/" exact>
          <Main theme={theme} />
        </Route>

        <Route path="/home" exact>
          <Home theme={theme} />
        </Route>
        <Route path='/user' exact>
          <Worker />
        </Route>
        <Route path='/search' exact>
          <Search />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

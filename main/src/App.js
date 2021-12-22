
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Routes/Main';
import Home from './Routes/Home';
import { createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme();
  return (
    <Router>

      <Switch>

        <Route path="/home" exact>
          <Main theme={theme} />
        </Route>

        <Route path="/" exact>
          <Home theme={theme} />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

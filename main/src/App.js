
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Dashboard from './Components/Dashboards/DashAdmin';
import { createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme();
  return (
    <Router>

      <Switch>

        <Route path="/home" exact>

          <Home theme={theme} />
        </Route>

        <Route path="/" exact>
          <Dashboard theme={theme} />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

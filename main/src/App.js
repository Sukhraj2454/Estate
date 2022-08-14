
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
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

        <Route path="/" exact element={<Main theme={theme} />} />

        <Route path="/home" exact element={<Home theme={theme} />} />

        <Route path='/user' exact element={<Worker />} />

        <Route path='/search' exact element={<Search />} />
      </Switch>

    </Router>
  );
}

export default App;

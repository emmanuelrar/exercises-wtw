import { IconButton, Typography } from '@material-ui/core';
import { MenuOutlined, SpeedOutlined } from '@material-ui/icons';
import './App.css';
import SpeedCalculator from './exercises/speedCalculator/SpeedCalculator';
import { useState } from 'react';
import NavBar from './common/navbar/Navbar';
import HowManyCoins from './exercises/howManyCoins/HowManyCoins';

const App = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [option, setOption] = useState(1);

  const toggleDrawer = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="App">
      <header className="App-header">
        <IconButton onClick={toggleDrawer}>
          <MenuOutlined fontSize="large" className="menu" />
        </IconButton>
        <Typography variant="h2" component="h1">Wheel the <SpeedOutlined fontSize="large" /> World</Typography>
      </header>
      <NavBar open={openMenu} toggleDrawer={toggleDrawer} selectOption={setOption}></NavBar>
      { option === 1 ? <SpeedCalculator></SpeedCalculator> : <></> }
      { option === 2 ? <HowManyCoins></HowManyCoins> : <></> }
      { option === 3 ? <h1>The Big Z</h1> : <></> }
    </div>
  );
}

export default App;

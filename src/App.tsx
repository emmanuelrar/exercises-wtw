import { IconButton, Typography } from '@material-ui/core';
import { MenuOutlined, PublicOutlined, SpeedOutlined } from '@material-ui/icons';
import './App.css';
import SpeedCalculator from './exercises/speedCalculator/SpeedCalculator';
import { useState } from 'react';
import NavBar from './common/navbar/Navbar';
import HowManyCoins from './exercises/howManyCoins/HowManyCoins';
import TheBigZ from './exercises/theBigZ/TheBigZ';

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
        <Typography variant="h2" component="h1">Wheel the <PublicOutlined fontSize="large" /> World</Typography>
      </header>
      <NavBar open={openMenu} toggleDrawer={toggleDrawer} selectOption={setOption}></NavBar>
      { option === 1 ? <SpeedCalculator></SpeedCalculator> : <></> }
      { option === 2 ? <HowManyCoins></HowManyCoins> : <></> }
      { option === 3 ? <TheBigZ></TheBigZ> : <></> }
    </div>
  );
}

export default App;

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { DirectionsBike, MonetizationOnOutlined, SortByAlphaOutlined } from '@material-ui/icons';
import { FC } from 'react';
import './Navbar.css';


interface NavBarProps {
    open: boolean,
    toggleDrawer: () => void,
    selectOption: React.Dispatch<React.SetStateAction<number>>,
}

const NavBar: FC<NavBarProps> = ({ open, toggleDrawer, selectOption }) => {

    return (
        <div onClick={toggleDrawer} >
            <Drawer anchor="left" className="menu-drawer" open={open} onClose={toggleDrawer}>
                <List>
                    <ListItem button alignItems="center" onClick={() => { selectOption(1) }}>
                        <ListItemIcon><DirectionsBike color="primary" /></ListItemIcon>
                        <ListItemText primary="Team Bicycle Riding" />
                    </ListItem>
                    <ListItem button alignItems="center" onClick={() => { selectOption(2) }}>
                        <ListItemIcon><MonetizationOnOutlined color="secondary" /></ListItemIcon>
                        <ListItemText primary="¿How many coins do I need?" />
                    </ListItem>
                    <ListItem button alignItems="center" onClick={() => { selectOption(3) }}>
                        <ListItemIcon><SortByAlphaOutlined /></ListItemIcon>
                        <ListItemText primary="The Big Z" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default NavBar;

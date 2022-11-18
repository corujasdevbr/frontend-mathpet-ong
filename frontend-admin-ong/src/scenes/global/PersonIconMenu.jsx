import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const options = [
  'Editar Perfil',
  '-------------------------',
  'Sair',
];

export default function PersonIconMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const {logout} = useAuth();
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    switch (index) {
        case 0:
            navigate("/ong/profile");
            break;
        case 2:
            logout()
            break;
        default:
            break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
      >
        <ListItem  onClick={handleClickListItem}>
            <ListItemAvatar>
            <Avatar>
                <PersonOutlinedIcon />
            </Avatar>
            </ListItemAvatar>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
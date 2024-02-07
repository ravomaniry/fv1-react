import { useState } from 'react';
import { useAppTexts, useUser } from '../../di/redux';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { AccountCircle, AccountCircleOutlined, HelpOutline, Logout } from '@mui/icons-material';
import { routes } from '../routes';
import { useAuth } from '../hooks/useAuth';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const texts = useAppTexts();
  const theme = useTheme();
  const user = useUser();
  const { onLogout } = useAuth();
  return (
    <div>
      <IconButton
        data-cy='UserMenuButton'
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <AccountCircle sx={{ color: theme.palette.common.white }} />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircleOutlined color='primary' />
          </ListItemIcon>
          <ListItemText>{user?.username}</ListItemText>
        </MenuItem>
        <MenuItem href={routes.help}>
          <ListItemIcon>
            <HelpOutline color='primary' />
          </ListItemIcon>
          <ListItemText>{texts.helpTitle}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          data-cy='LogoutButton'
          onClick={onLogout}
        >
          <ListItemIcon>
            <Logout color='secondary' />
          </ListItemIcon>
          <ListItemText>{texts.logOut}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

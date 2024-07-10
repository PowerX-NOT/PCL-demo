import { useState, useCallback, ReactElement, PropsWithChildren } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import { closedMixin, openedMixin } from 'theme/functions/sidebar-mixins';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar';

export const drawerOpenWidth = 260;
export const drawerCloseWidth = 134;

const MainLayout = ({ children }: PropsWithChildren): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerToggle = useCallback(() => setOpen(!open), [open]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Topbar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        variant="permanent"
        open={open}
        sx={(theme) => ({
          width: open ? drawerOpenWidth : drawerCloseWidth,
          ...(open && openedMixin(theme)),
          ...(!open && closedMixin(theme)),
          '& .MuiDrawer-paper': {
            width: open ? drawerOpenWidth : drawerCloseWidth,
            ...(open && openedMixin(theme)),
            ...(!open && closedMixin(theme)),
          },
        })}
      >
        <Sidebar open={open} />
      </Drawer>
      <Box
        component="main"
        overflow="auto"
        sx={(theme) => ({
          width: 1,
          flexGrow: 1,
          // overflow: 'hidden',
          pt: 5,
          pr: { xs: 2.5875, sm: 5.175 },
          pb: 6.25,
          pl: { xs: 2.625, sm: 5.25 },
          transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
          }),
        })}
      >
        <Toolbar
          sx={{
            height: 96,
          }}
        />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

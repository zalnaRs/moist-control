import { Refresh } from '@suid/icons-material';
import AppBar from '@suid/material/AppBar';
import Box from '@suid/material/Box';
import IconButton from '@suid/material/IconButton';
import Toolbar from '@suid/material/Toolbar';
import Typography from '@suid/material/Typography';
import { refreshData } from '../lib/bluetooth';

const MainAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zicro:Bit
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="refresh"
            onClick={() => refreshData()}
          >
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;

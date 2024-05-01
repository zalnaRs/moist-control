import { useNavigate } from '@solidjs/router';
import { Refresh } from '@suid/icons-material';
import Box from '@suid/material/Box';
import CircularProgress from '@suid/material/CircularProgress';
import List from '@suid/material/List';
import ListItem from '@suid/material/ListItem';
import ListItemButton from '@suid/material/ListItemButton';
import ListItemIcon from '@suid/material/ListItemIcon';
import ListItemText from '@suid/material/ListItemText';
import { Component, createSignal } from 'solid-js';
import {
  UART_SERVICE_UUID,
  UART_RX_CHARACTERISTIC_UUID,
  UART_TX_CHARACTERISTIC_UUID,
} from '../constants';
import { connect } from '../lib/bluetooth';

const Connect: Component = () => {
  const [refreshing, setRefreshing] = createSignal(false);

  const navigate = useNavigate();

  const discover = async () => {
    setRefreshing(true);

    try {
      const discoveredDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          UART_SERVICE_UUID,
          UART_RX_CHARACTERISTIC_UUID,
          UART_TX_CHARACTERISTIC_UUID,
        ],
      });

      connect(discoveredDevice);
      navigate('/');
    } catch (err) {
      alert(err!.message);
    }

    setRefreshing(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={discover} disabled={refreshing()}>
            <ListItemIcon>
              {refreshing() ? (
                <CircularProgress sx={{ width: 20, height: 20 }} />
              ) : (
                <Refresh />
              )}
            </ListItemIcon>
            <ListItemText primary="Connect to a device" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Connect;

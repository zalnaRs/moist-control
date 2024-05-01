import {
  BluetoothConnected,
  DeviceThermostat,
  WbSunny,
  Water,
} from '@suid/icons-material';
import Box from '@suid/material/Box';
import Divider from '@suid/material/Divider';
import List from '@suid/material/List';
import ListItem from '@suid/material/ListItem';
import ListItemButton from '@suid/material/ListItemButton';
import ListItemIcon from '@suid/material/ListItemIcon';
import ListItemText from '@suid/material/ListItemText';
import ListSubheader from '@suid/material/ListSubheader';
import Skeleton from '@suid/material/Skeleton';
import Stack from '@suid/material/Stack';
import TextField from '@suid/material/TextField';
import { Component, For } from 'solid-js';
import { theme } from '../App';
import { celiusToFahrenheit, kmToMiles, stepsToKM } from '../constants';
import DeviceProvider from '../contexts/DeviceProvider';
import { device, syncOptions } from '../lib/bluetooth';
import { data } from '../lib/store';

const Home: Component = () => {
  return (
    <DeviceProvider>
      {!data && (
        <Stack spacing={1} sx={{ padding: 2 }}>
          <For each={[0, 0, 0]}>
            {() => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ borderRadius: theme.shape.borderRadius }}
              />
            )}
          </For>
        </Stack>
      )}
      {data && (
        <Box
          sx={{
            width: '100%',
            padding: 2,
          }}
        >
          <List>
            {import.meta.env.DEV && (
              <ListItem>
                <ListItemText>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </ListItemText>
              </ListItem>
            )}
            <ListItem sx={{ justifyContent: 'center' }}>
              <img src="/assets/images/mbit.png" width={'40%'} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BluetoothConnected />
              </ListItemIcon>
              <ListItemText primary="Connected" secondary={device?.name} />
            </ListItem>

            <Divider />
            <ListSubheader component={'div'}>Statistics</ListSubheader>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Water />
                </ListItemIcon>
                <ListItemText>
                  <div>
                    <b>{data.moist}</b> {' moist (0 dry-1023 moist)'}
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WbSunny />
                </ListItemIcon>
                <ListItemText>
                  <div>
                    <b>{data.light}</b> {'(0 dark-255 light)'}
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeviceThermostat />
                </ListItemIcon>
                <ListItemText>
                  <b>
                    {data.temp}
                    <sup>℃</sup>
                  </b>
                  (
                  <b>
                    {celiusToFahrenheit(data.temp)}
                    <sup>℉</sup>
                  </b>
                  ){' current temperature'}
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListSubheader component={'div'}>Settings</ListSubheader>
            <ListItem>
              <ListItemText primary="Brightness" />
              <TextField
                type="number"
                defaultValue={100}
                onBlur={(e) =>
                  syncOptions({
                    brightness: parseInt((e.target as HTMLInputElement).value),
                  })
                }
              />
            </ListItem>
          </List>
        </Box>
      )}
    </DeviceProvider>
  );
};

export default Home;

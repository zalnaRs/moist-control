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
import {
  celiusToFahrenheit,
  kmToMiles,
  normalise,
  stepsToKM,
} from '../constants';
import DeviceProvider from '../contexts/DeviceProvider';
import { device, syncOptions } from '../lib/bluetooth';
import { data } from '../lib/store';
import { Alert, AlertTitle, LinearProgress } from '@suid/material';

const check = () => {
  return !(
    data.moist < 900 ||
    data.light < 200 ||
    data.temp < 18 ||
    data.temp >= 50
  );
};

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

            {data.moist < 900 && (
              <Alert severity="warning" sx={{ margin: 1 }}>
                <AlertTitle>Low moisture!</AlertTitle>
                Water the soil!
              </Alert>
            )}
            {data.light < 200 && (
              <Alert severity="warning" sx={{ margin: 1 }}>
                <AlertTitle>Not enough light!</AlertTitle>
                Remove shades, if needed!
              </Alert>
            )}
            {data.temp < 18 && (
              <Alert severity="warning" sx={{ margin: 1 }}>
                <AlertTitle>Not enough temperature!</AlertTitle>
                Ensure proper temperature for your ambient air!
              </Alert>
            )}
            {data.temp >= 50 && (
              <Alert severity="warning" sx={{ margin: 1 }}>
                <AlertTitle>Too hot temperature!</AlertTitle>
                For the safety of the micro:bit, please remove it!
              </Alert>
            )}
            {check() && (
              <Alert severity="success" sx={{ margin: 1 }}>
                <AlertTitle>Everything is alright!</AlertTitle>
                Your soil, ambient air, and environment are excellent!
              </Alert>
            )}

            <Divider />
            <ListSubheader component={'div'}>Statistics</ListSubheader>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Water />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <b>{data.moist}</b> moist
                    </div>
                  }
                  secondary={
                    <LinearProgress
                      variant="determinate"
                      value={normalise(data.moist, 0, 1023)}
                      sx={{ height: 14 }}
                      color={
                        data.moist <= 600
                          ? 'error'
                          : data.moist >= 900
                          ? 'success'
                          : 'warning'
                      }
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WbSunny />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <b>{data.light}</b> light
                    </div>
                  }
                  secondary={
                    <LinearProgress
                      variant="determinate"
                      value={normalise(data.light, 0, 255)}
                      sx={{ height: 14 }}
                      color={
                        data.light <= 200
                          ? 'error'
                          : data.light >= 210
                          ? 'success'
                          : 'warning'
                      }
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeviceThermostat />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
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
                    </div>
                  }
                  secondary={
                    <LinearProgress
                      variant="determinate"
                      value={normalise(data.moist, 0, 1023)}
                      sx={{ height: 14 }}
                      color={
                        data.temp < 18
                          ? 'error'
                          : data.temp >= 50
                          ? 'warning'
                          : 'success'
                      }
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
            {/* <Divider />
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
              </ListItem>*/}
          </List>
        </Box>
      )}
    </DeviceProvider>
  );
};

export default Home;

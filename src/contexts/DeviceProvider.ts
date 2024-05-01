import { useNavigate } from '@solidjs/router';
import { Component, createEffect, JSX } from 'solid-js';
import { device } from '../lib/bluetooth';

type DeviceProviderProps = {
  children: JSX.Element;
};

const DeviceProvider: Component<DeviceProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  createEffect(async () => {
    if (!device) return navigate('/connect');
  }, [device]);

  return children;
};

export default DeviceProvider;

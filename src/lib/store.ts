import { createStore } from 'solid-js/store';
import { ZicroData } from '../types';

export const [data, setData] = createStore<ZicroData | null>(null);

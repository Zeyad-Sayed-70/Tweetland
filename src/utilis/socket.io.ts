import * as io  from 'socket.io-client';
import { BACKEND_URL } from '../constants/backend';

export const socket = io.connect(BACKEND_URL);
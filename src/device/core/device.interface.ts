import { Document } from 'mongoose';

export interface IDevice extends Document {
  userId: string;
  deviceId: string;
  token: string;
  isActive: boolean;
  deviceName: string;
  osVersion: string;
  platform: number;
  isDeviceRooted: boolean;
  appVersion: string;
  isEmulator: boolean;
}
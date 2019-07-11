import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
    userId: { type: String },
    deviceId: { type: String },
    token: { type: String },
    active: {type: Boolean},
    deviceName:{ type: String },
    osVersion:{ type: String },
    platform:{ type: Number},
    deviceRooted: {type: Boolean},
    appVersion: { type: String },
    isEmulator: {type: Boolean},
}, { timestamps: true });

// DeviceSchema.index({ projectId: 1, customerId: 1 });

export default DeviceSchema;

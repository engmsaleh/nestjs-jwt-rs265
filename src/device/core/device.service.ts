import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IDevice } from './device.interface';
import { BaseDataService } from '../../common/base-data.service';

@Injectable()
export class DeviceService extends BaseDataService {
    constructor(@InjectModel('devices') private readonly _deviceModel: Model<IDevice>) {
        super();
    }

    async getDevice(deviceId: string): Promise<IDevice> {
        try {
            return await this._deviceModel.findOne({ deviceId }).exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }

    async getDevices(): Promise<any> {
        try {
            return await this._deviceModel.find().exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }

    async saveDevice(data: IDevice): Promise<IDevice> {
        if (data) {
            try {
                return await this._deviceModel.create(data);
            } catch (error) {
                return this.throwInternalServerError(error);
            }
        } 
        return this.throwUnProcessableEntity();
    }

    // TODO: Check the functionality here and add one method to delete one device and other one to delete all devices for particular user
    async deleteDevice(userId: string): Promise<any> {
        try {
            return await this._deviceModel.deleteOne({ userId }).exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }
}
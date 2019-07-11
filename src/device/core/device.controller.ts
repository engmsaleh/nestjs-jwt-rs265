
import { Get, Body, Res, Controller, Param, Put, Logger, Headers, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';
import { DeviceService } from './device.service';
import { IDevice } from './device.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('device')
@ApiUseTags('device')
export class DeviceController {
    constructor(private readonly _deviceService: DeviceService) { }

    @Get(':id')
    async getDevice(@Param('id') id: string, @Res() response): Promise<any> {
        try {
            const result = await this._deviceService.getDevice(id);
            return response.send(result);
        }
        catch (err) {
            return response.status(500).send(err);
        }
    }

    @Get()
    async getDevices(@Res() response): Promise<any> {
        try {
            const result = await this._deviceService.getDevices();
            return response.send(result);
        }
        catch (err) {
            return response.status(500).send(err);
        }
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    async createDevice(
        @Headers() headers: any,
        @Res() response,
        @Body() body: CreateDeviceDto
    ): Promise<any> {
        try {
            // console.log(headers);
            const platform = headers.platform || 0;

            const deviceId = body.device_id;
            const deviceToken = body.device_token;
            const deviceName = body.device_name;
            const osVersion = body.os_version;
            const isDeviceRooted = body.is_device_rooted || false;
            const isEmulator = body.is_emulator || false;
            const appVersion = body.app_version || "";
            const isActive = body.is_active || false;
            if (deviceId && deviceToken && deviceName && osVersion) {
                const deviceObj = {
                    userId: "",
                    deviceId: deviceId,
                    token: deviceToken,
                    isActive: isActive,
                    deviceName: deviceName,
                    osVersion: osVersion,
                    platform: platform,
                    isDeviceRooted: isDeviceRooted,
                    appVersion: appVersion,
                    isEmulator: isEmulator,
                } as IDevice;
                return response.send({ status: 'success', message: 'Device for had been added successfully!' });
            }
            throw new Error('Unprocessable Entity');
        }
        catch (err) {
            return response.send(err);
        }
    }
}



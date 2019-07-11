import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './device/device.module';
import { HealthModule } from './health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './health/terminus-options.service';
import { AuthModule } from './auth/auth.module';

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongoadmin:mongopass@localhost:27017/devices?authSource=admin';
// const mongoUrl = process.env.MONGO_URL || 'mongodb://mongoadmin:mongopass@devices-mongodb.mongodb:27017/devices?authSource=admin';
@Module({
    imports: [
        MongooseModule.forRoot(mongoUrl, { useCreateIndex: true, useNewUrlParser: true }),
        HealthModule,
        TerminusModule.forRootAsync({
            imports: [HealthModule],
            useExisting: TerminusOptionsService,
        }),
        DeviceModule,
        AuthModule
    ],
})
export class ApplicationModule { }
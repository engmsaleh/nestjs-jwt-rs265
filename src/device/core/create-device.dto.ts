import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
//TODO: Make validation for existence
export class CreateDeviceDto {
    @ApiModelProperty() @IsString() readonly device_id: string;
    @ApiModelProperty() @IsString() readonly device_token: string;
    @ApiModelProperty() @IsString() readonly device_name: string;
    @ApiModelProperty() @IsString() readonly os_version: string;
    @ApiModelPropertyOptional() @IsBoolean() readonly is_emulator?: boolean;
    @ApiModelPropertyOptional() @IsBoolean() readonly is_active?: boolean;
    @ApiModelPropertyOptional() @IsBoolean() readonly is_device_rooted?: boolean;
    @ApiModelPropertyOptional() @IsString() readonly app_version: string;
}
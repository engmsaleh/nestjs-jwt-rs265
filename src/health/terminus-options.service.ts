import {
        TerminusOptionsFactory,
        TerminusEndpoint,
        TerminusModuleOptions,
        DNSHealthIndicator,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
        constructor(
                private readonly dns: DNSHealthIndicator,
        ) { }

        public createTerminusOptions(): TerminusModuleOptions {
                const healthEndpoint: TerminusEndpoint = {
                        url: '/health',
                        healthIndicators: [
                                async () => this.dns.pingCheck('google', 'http://localhost:3000'),
                        ],
                };
                return {
                        endpoints: [healthEndpoint],
                };
        }
}
import * as dnsPacket from 'dns-packet';
import { getMarketStatus } from './getMarketStatus';

import { DnsAnswer } from '../types/types';

export function createDnsResponse(name: string, id: number, questions: any[]): any {
    const response = {
        type: 'response' as "query" | "response" | undefined,
        id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions,
        answers: [] as DnsAnswer[]
    };

    switch (name) {
        case 'ping':
            response.answers.push({
                name,
                type: 'TXT',
                class: 'IN',
                ttl: 300,
                data: `Server is alive!`
            });
            break;
        default:
            response.answers.push(getMarketStatus(name));
            break;
    }

    return response;
}
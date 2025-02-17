export interface TxtAnswer {
    name: string;
    type: 'TXT';
    class: 'IN';
    ttl: number;
    data: string;
}

export type DnsAnswer = TxtAnswer;
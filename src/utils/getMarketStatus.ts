import { DnsAnswer } from '../types/types';

export function getMarketStatus(name: string): DnsAnswer {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIST: any = new Date(now.getTime() + istOffset);

    const marketOpen: any = new Date(nowIST);
    marketOpen.setHours(9, 15, 0, 0);

    const marketClose: any = new Date(nowIST);
    marketClose.setHours(15, 30, 0, 0);

    let timeLeft: number;
    let message: string;

    if (nowIST < marketOpen) {
        timeLeft = marketOpen - nowIST;
        message = `Market will open in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`;
    } else if (nowIST >= marketOpen && nowIST <= marketClose) {
        timeLeft = marketClose - nowIST;
        message = `Market will close in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`;
    } else {
        const nextOpen: any = new Date(marketOpen.getTime() + 24 * 60 * 60 * 1000);
        timeLeft = nextOpen - nowIST;
        message = `Market will open in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`;
    }

    return {
        name,
        type: 'TXT',
        class: 'IN',
        ttl: 300,
        data: message
    };
}
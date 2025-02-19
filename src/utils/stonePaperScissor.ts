import { DnsAnswer } from '../types/types';
export function playRockPaperScissors(name: string): DnsAnswer {
    const choices = ['stone', 'paper', 'scissor'];
    const userChoice = name.split('.')[1];
    const serverChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result: string;
    if (userChoice === serverChoice) {
        result = `It's a tie! Both chose ${serverChoice}.`;
    } else if (
        (userChoice === 'stone' && serverChoice === 'scissor') ||
        (userChoice === 'paper' && serverChoice === 'stone') ||
        (userChoice === 'scissor' && serverChoice === 'paper')
    ) {
        result = `You win! You chose ${userChoice}, and I chose ${serverChoice}.`;
    } else {
        result = `You lose! You chose ${userChoice}, and I chose ${serverChoice}.`;
    }

    return {
        name,
        type: 'TXT',
        class: 'IN',
        ttl: 300,
        data: result
    };
}
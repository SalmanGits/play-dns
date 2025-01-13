import dotenv from "dotenv";
import * as dnsPacket from 'dns-packet';
dotenv.config()
const PORT = parseInt(process.env.PORT || '', 10);
const ADDRESS = process.env.ADDRESS as string;
interface TxtAnswer {
  name: string;
  type: 'TXT';
  class: 'IN';
  ttl: number;
  data: string;
}

type DnsAnswer = TxtAnswer;

if (isNaN(PORT)) {
  throw new Error("Invalid PORT value. Please ensure it is a number.");
}
if (!ADDRESS) {
  throw new Error("Invalid ADDRESS value. Please ensure it is set.");
}

import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  const message = dnsPacket.decode(msg);
  let name = "default";

  if (message && message.questions && message.questions.length > 0) {
    name = message.questions[0].name;
  }

  let response = {
    type: 'response' as "query" | "response" | undefined,
    id: message.id,
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: message.questions,
    answers: [] as DnsAnswer[]
  };
console.log(name)
  switch (name) {
    case 'hello': {
      // Handle other cases in future
      break;
    }
    default: {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const nowIST: any = new Date(now.getTime() + istOffset);

      const marketOpen: any = new Date(nowIST);
      marketOpen.setHours(9, 15, 0, 0);

      const marketClose: any = new Date(nowIST);
      marketClose.setHours(15, 30, 0, 0);

      let timeLeft;
      if (nowIST < marketOpen) {
        timeLeft = marketOpen - nowIST;
        response.answers.push({
          name,
          type: 'TXT',
          class: 'IN',
          ttl: 300,
          data: `Market will open in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
        });
      } else if (nowIST >= marketOpen && nowIST <= marketClose) {
        timeLeft = marketClose - nowIST;
        response.answers.push({
          name,
          type: 'TXT',
          class: 'IN',
          ttl: 300,
          data: `Market will close in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
        });
      } else {
        const nextOpen: any = new Date(marketOpen.getTime() + 24 * 60 * 60 * 1000);
        timeLeft = nextOpen - nowIST;
        response.answers.push({
          name,
          type: 'TXT',
          class: 'IN',
          ttl: 300,
          data: `Market will open in ${Math.floor(timeLeft / (1000 * 60 * 60))} hours and ${Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes.`
        });
      }
      break;
    }
  }

  const responseBuffer = dnsPacket.encode(response);
  server.send(responseBuffer, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(`Error sending response: ${err}`);
    } else {
      console.log(`Response sent to ${rinfo.address}:${rinfo.port}`);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT, ADDRESS);
















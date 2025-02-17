import dotenv from "dotenv";
import * as dnsPacket from 'dns-packet';
dotenv.config()
const PORT = parseInt(process.env.PORT || '', 10);
const ADDRESS = process.env.ADDRESS as string;
import { TxtAnswer } from "./types/types";
import { DnsAnswer } from "./types/types";

if (isNaN(PORT)) {
  throw new Error("Invalid PORT value. Please ensure it is a number.");
}
if (!ADDRESS) {
  throw new Error("Invalid ADDRESS value. Please ensure it is set.");
}

import dgram from 'node:dgram';
import { createDnsResponse } from "./utils/createDNSResponse";

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`Received DNS request from ${rinfo.address}:${rinfo.port}`);

  const message = dnsPacket.decode(msg);

  if (!message || !message.questions || message.questions.length === 0) return;

  const name = message.questions[0].name;
  const response = createDnsResponse(name, message.id as number, message.questions);

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
















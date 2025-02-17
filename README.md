# DNS Server with Market Timing Responses

This project implements a simple DNS server using Node.js, which responds with market timing information based on Indian Standard Time (IST). The server listens for DNS queries and returns TXT records with information on whether the market is open or closed, and how much time is left until the next market event.

## Features
- Responds to DNS queries with market timing information.
- Provides custom TXT record responses based on the current time.
- More features will come, not just market time.

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dns-market-time.git
   cd dns-market-time
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following contents:
   ```env
   PORT=
   ADDRESS=
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage

### Sending a DNS Query
You can use tools like `dig` to query the DNS server.

#### Example Command:
```bash
# Querying the market time TXT record
# Replace "market.time" with your query name and 127.0.0.1 with your server's address.
dig @127.0.0.1 -p 53 market.time TXT
```

### Expected Output:
The server will respond with a TXT record indicating the current market status:
```bash
;; ANSWER SECTION:
market.time.        300    IN    TXT    "Market will open in 0 hours and 15 minutes."
```


## Customization

### Modifying the Market Timing Logic
To change the market open and close times, update the following lines in `server.ts`:
```javascript
marketOpen.setHours(9, 15, 0, 0);
marketClose.setHours(15, 30, 0, 0);
```

### Changing the Response Message
You can customize the TXT record response by modifying the `data` field in the `response.answers.push` calls.

## Troubleshooting

- **Port Binding Error:**
  If you encounter an error related to port binding, make sure no other service is using port 53 on your machine.

- **No Response to Queries:**
  Ensure the server is running and listening on the correct port and address. Use `netstat` or similar tools to check.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements.
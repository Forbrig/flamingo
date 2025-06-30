# Flamingo

Flamingo is a study case as a web application about browser capabilities for 3d rendering and webxr.

## Project Structure

- **public/**: Contains static assets and the main HTML file.
- **src/**: Contains the TypeScript source code.
- **.github/workflows/**: Contains GitHub Actions workflows for CI/CD.

## Installation

To set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Forbrig/flamingo.git
   cd flamingo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

To start the development server:

```bash
npm start
```

This will launch the application, and you can view it in your browser at <http://localhost:3000>.

## Self host handshake server

Install peerjs server in your machine and run:

```bash
peerjs --port 9000
```

## VPN Warning

When using a VPN, peer connections will fail because WebRTC requires direct network access.

- Peers can initially discover each other but cannot establish connections
- Solution: Disable your VPN when using this application

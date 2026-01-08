#!/usr/bin/env node

/**
 * Credentials Seeding Test Script
 * Run this after starting the backend server
 * Usage: node seed-credentials.js
 */

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/admin/seed-full',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('🚀 Starting credentials seed...\n');
console.log(`📍 Target: http://${options.hostname}:${options.port}${options.path}\n`);

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! Database seeded with credentials.\n');
        console.log('📋 ADMIN LOGINS (Institute-wise):\n');
        
        Object.entries(response.credentials.adminLogins).forEach(([code, cred]) => {
          console.log(`${code.padEnd(10)} → ${cred.email.padEnd(30)} / ${cred.password}`);
        });

        console.log('\n📋 STAFF LOGINS (Institute-wise):\n');
        
        Object.entries(response.credentials.staffLogins).forEach(([code, cred]) => {
          console.log(`${code.padEnd(10)} → ${cred.email.padEnd(30)} / ${cred.password}`);
        });

        console.log('\n✨ All credentials have been created and hashed in database!');
        console.log('📝 See LOGIN_CREDENTIALS.md for complete reference.');
      } else {
        console.log(`❌ Error: Status ${res.statusCode}`);
        console.log(response);
      }
    } catch (e) {
      console.error('❌ Error parsing response:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection Error:', error.message);
  console.error('\n💡 Make sure backend server is running on port 5001');
  console.error('   Run: cd backend && npm start\n');
  process.exit(1);
});

req.write(JSON.stringify({}));
req.end();

// Timeout after 10 seconds
setTimeout(() => {
  console.error('❌ Request timeout. Server might not be responding.');
  process.exit(1);
}, 10000);

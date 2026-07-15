const sequelize = require('../config/database');
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');

/**
 * Migration helper:
 * - Copies existing `password` values into `password_hash` if they look hashed
 * - If a `password` value looks plaintext, it will be hashed and written to `password_hash`
 * - Run this AFTER applying 002_add_password_hash_and_migrate.sql
 */

const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Ensure model is synced to include new column
    await sequelize.sync();

    const rows = await Staff.findAll();
    console.log(`Found ${rows.length} staff rows`);

    for (const r of rows) {
      const current = r.get({ plain: true });
      const existingHash = current.password_hash;

      if (existingHash) {
        console.log(`Skipping ${current.email} — already has password_hash`);
        continue;
      }

      const legacy = current.password;
      if (!legacy) {
        console.log(`No legacy password for ${current.email}; skipping`);
        continue;
      }

      // Detect bcrypt hash prefix ($2a$ $2b$ $2y$)
      if (/^\$2[aby]\$/.test(legacy)) {
        // Looks already hashed — copy it
        r.password_hash = legacy;
        await r.save();
        console.log(`Copied hash for ${current.email}`);
      } else {
        // Plaintext — hash and store
        const hashed = await bcrypt.hash(legacy, 12);
        r.password_hash = hashed;
        await r.save();
        console.log(`Hashed and stored password for ${current.email}`);
      }
    }

    console.log('Migration complete. Verify and then DROP legacy column `password`.');
    process.exit(0);
  } catch (err) {
    console.error('Migration error', err);
    process.exit(1);
  }
};

migrate();

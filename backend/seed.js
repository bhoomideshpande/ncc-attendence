const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Staff = require('./models/Staff');
require('dotenv').config();

const staffAccounts = [
  { id: "pc_jabin", email: "pcjabin@staff.com", password: "123456", institute: "PC Jabin College, Hubli" },
  { id: "jg_college", email: "jg@staff.com", password: "123456", institute: "JG College, Hubli" },
  { id: "svsb_college", email: "svsb@staff.com", password: "123456", institute: "SVSB College, Saundatti" },
  { id: "csb_college", email: "csb@staff.com", password: "123456", institute: "CSB College, Ramdurg" },
  { id: "kss_college", email: "kss@staff.com", password: "123456", institute: "KSS College, Hubli" },
  { id: "krces_college", email: "krces@staff.com", password: "123456", institute: "KRCES College, Bailhongal" },
  { id: "ag_college", email: "ag@staff.com", password: "123456", institute: "AG College, Munavalli" },
  { id: "jss_gokak", email: "jssgokak@staff.com", password: "123456", institute: "JSS College, Gokak" },
  { id: "ssca_govt", email: "ssca@staff.com", password: "123456", institute: "SSCA Government College, KK Koppa" },
  { id: "jss_dharwad", email: "jssdharwad@staff.com", password: "123456", institute: "JSS College, Dharwad" },
  { id: "kle_tech", email: "kle@staff.com", password: "123456", institute: "KLE Technological University, Hubli" },
  { id: "st_paul", email: "stpaul@staff.com", password: "123456", institute: "St Paul School, Belgaum" },
  { id: "st_jr_ramdurg", email: "stjr@staff.com", password: "123456", institute: "St Junior College, Ramdurg" },
  { id: "sk_comp", email: "skcomp@staff.com", password: "123456", institute: "SK Composite Jr College, Saundatti" },
  { id: "cd_halyal", email: "cdhalyal@staff.com", password: "123456", institute: "CD Halyal High School, Ramdurg" },
  { id: "kne_hs", email: "kne@staff.com", password: "123456", institute: "KNE High School, Hubli" },
  { id: "mr_sakhare", email: "mrsakhare@staff.com", password: "123456", institute: "M R Sakhare High School, Hubli" },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const account of staffAccounts) {
      const existingStaff = await Staff.findOne({ email: account.email });
      if (!existingStaff) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(account.password, salt);

        const newStaff = new Staff({
          id: account.id,
          email: account.email,
          password: hashedPassword,
          institute: account.institute,
        });

        await newStaff.save();
        console.log(`Seeded staff: ${account.email}`);
      } else {
        console.log(`Staff already exists: ${account.email}`);
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
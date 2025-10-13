const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    console.log('Checking database connection...');
    
    // Check if admin exists
    const admins = await prisma.admin.findMany();
    console.log(`\nFound ${admins.length} admin(s) in database:`);
    
    if (admins.length === 0) {
      console.log('\n❌ No admin users found!');
      console.log('Run: curl -X POST http://localhost:3000/api/auth/setup');
      return;
    }
    
    for (const admin of admins) {
      console.log(`\n📧 Email: ${admin.email}`);
      console.log(`👤 Name: ${admin.name}`);
      console.log(`🔑 Password Hash: ${admin.password.substring(0, 20)}...`);
      console.log(`📅 Created: ${admin.createdAt}`);
      
      // Test password from .env
      const testPassword = 'Xmv02441!';
      const isValid = await bcrypt.compare(testPassword, admin.password);
      console.log(`\n🔐 Testing password "${testPassword}": ${isValid ? '✅ VALID' : '❌ INVALID'}`);
      
      if (!isValid) {
        console.log('\n⚠️  Password mismatch detected!');
        console.log('The password in the database does not match "Xmv02441!"');
        console.log('\nPossible solutions:');
        console.log('1. Delete admin and recreate: DELETE FROM Admin; then call /api/auth/setup');
        console.log('2. Or use the correct password that was used during creation');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('Table')) {
      console.log('\n⚠️  Database tables not created yet!');
      console.log('Run: npx prisma db push');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();

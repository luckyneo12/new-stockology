const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixAdminPassword() {
  try {
    console.log('🔧 Fixing admin password...\n');
    
    const email = 'stockology@gmail.com';
    const plainPassword = 'Xmv02441!';
    
    // Hash the password properly
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Plain Password: ${plainPassword}`);
    console.log(`🔐 Hashed Password: ${hashedPassword.substring(0, 30)}...\n`);
    
    // Update the admin with hashed password
    const updatedAdmin = await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Admin password updated successfully!\n');
    
    // Verify the fix
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    const isValid = await bcrypt.compare(plainPassword, admin.password);
    console.log(`🧪 Testing password: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    
    if (isValid) {
      console.log('\n🎉 Success! You can now login with:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${plainPassword}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();

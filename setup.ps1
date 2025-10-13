# Stockology Blog Setup Script for Windows
# Run this script in PowerShell

Write-Host "🚀 Stockology Blog Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 Setting up environment..." -ForegroundColor Yellow

# Check if .env exists
if (Test-Path .env) {
    Write-Host "⚠ .env file already exists. Skipping..." -ForegroundColor Yellow
} else {
    if (Test-Path .env.example) {
        Copy-Item .env.example .env
        Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠ IMPORTANT: Please edit .env file with your database credentials!" -ForegroundColor Yellow
        Write-Host "   - DATABASE_URL" -ForegroundColor Yellow
        Write-Host "   - NEXTAUTH_SECRET (run: openssl rand -base64 32)" -ForegroundColor Yellow
        Write-Host "   - ADMIN_EMAIL" -ForegroundColor Yellow
        Write-Host "   - ADMIN_PASSWORD" -ForegroundColor Yellow
        Write-Host ""
        
        $continue = Read-Host "Have you configured .env file? (y/n)"
        if ($continue -ne "y") {
            Write-Host "Please configure .env file and run this script again." -ForegroundColor Yellow
            exit 0
        }
    } else {
        Write-Host "✗ .env.example not found!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🗄️ Setting up database..." -ForegroundColor Yellow

Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to generate Prisma Client!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Prisma Client generated" -ForegroundColor Green

Write-Host "Pushing schema to database..." -ForegroundColor Yellow
npx prisma db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to push schema to database!" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in .env file" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Database schema created" -ForegroundColor Green

Write-Host ""
Write-Host "👤 Creating admin user..." -ForegroundColor Yellow
Write-Host "Starting temporary server..." -ForegroundColor Yellow

# Start the dev server in background
$job = Start-Job -ScriptBlock { npm run dev }
Start-Sleep -Seconds 10

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/setup" -Method POST -UseBasicParsing
    Write-Host "✓ Admin user created successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not create admin user automatically" -ForegroundColor Yellow
    Write-Host "You can create it manually by visiting: http://localhost:3000/api/auth/setup" -ForegroundColor Yellow
}

# Stop the dev server
Stop-Job -Job $job
Remove-Job -Job $job

Write-Host ""
Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the development server: npm run dev" -ForegroundColor White
Write-Host "2. Open your browser: http://localhost:3000" -ForegroundColor White
Write-Host "3. Login to admin: http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "4. Create your first blog post!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- Quick Start: QUICK_START.md" -ForegroundColor White
Write-Host "- Full Setup: BLOG_SETUP.md" -ForegroundColor White
Write-Host "- API Testing: API_TESTING.md" -ForegroundColor White
Write-Host "- Deployment: DEPLOYMENT.md" -ForegroundColor White
Write-Host "- Features: FEATURES.md" -ForegroundColor White
Write-Host ""
Write-Host "Happy blogging! 🚀" -ForegroundColor Cyan

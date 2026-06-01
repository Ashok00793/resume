# Dr. Ashokkumar Kumaravel GitHub Pages Deployer
Clear-Host
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "     Dr. Ashokkumar Kumaravel GitHub Pages Deployer" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""

$ghPath = "C:\Program Files\GitHub CLI\gh.exe"
$gitPath = "C:\Program Files\Git\cmd\git.exe"

# 1. Authenticate with GitHub if needed
$authTest = & $ghPath auth status 2>&1
if ($authTest -match "Logged in to github.com") {
    Write-Host "[*] Already logged into GitHub." -ForegroundColor Green
} else {
    Write-Host "[!] You need to authenticate with GitHub first." -ForegroundColor Yellow
    Write-Host "Starting browser-based authentication..." -ForegroundColor Cyan
    Write-Host "1. A browser window will open." -ForegroundColor Cyan
    Write-Host "2. Copy the 8-character verification code shown in this terminal." -ForegroundColor Cyan
    Write-Host "3. Paste it in the browser to authorize." -ForegroundColor Cyan
    Write-Host ""
    & $ghPath auth login --hostname github.com --git-protocol https --web
}

# Double check authentication success
$authTest2 = & $ghPath auth status 2>&1
if ($authTest2 -notmatch "Logged in to github.com") {
    Write-Host "[Error] Authentication failed. Please try again." -ForegroundColor Red
    Exit
}

# 2. Retrieve GitHub Username
$username = (& $ghPath api user --jq ".login").Trim()
Write-Host "[*] Authenticated as: $username" -ForegroundColor Green

# 3. Create repository name
$repoName = "resume"
Write-Host "Target repository: https://github.com/$username/$repoName" -ForegroundColor Cyan

# Ensure local Git repository is active
if (-not (Test-Path .git)) {
    Write-Host "Initializing local Git repository..." -ForegroundColor Cyan
    & $gitPath init
    & $gitPath checkout -b main
}

# Add latest changes
Write-Host "Preparing local files..." -ForegroundColor Cyan
& $gitPath add .
& $gitPath -c user.name="Ashokkumar Kumaravel" -c user.email="bioashok00793@gmail.com" commit -m "Configure scientific portfolio for GitHub Pages" 2>&1 | Out-Null

# Check if the GitHub repository already exists
$repoCheck = & $ghPath repo view "$username/$repoName" 2>&1
if ($repoCheck -match "could not resolve to a Repository") {
    Write-Host "Creating a new public GitHub repository..." -ForegroundColor Cyan
    & $ghPath repo create $repoName --public --source=. --push
} else {
    Write-Host "GitHub repository already exists. Syncing remote and pushing..." -ForegroundColor Cyan
    $remoteCheck = & $gitPath remote 2>&1
    if ($remoteCheck -notmatch "origin") {
        & $gitPath remote add origin "https://github.com/$username/$repoName.git"
    }
    & $gitPath push -u origin main --force
}

# 4. Configure GitHub Pages via API
Write-Host "Configuring GitHub Pages..." -ForegroundColor Cyan
$pagesCheck = & $ghPath api repos/$username/$repoName/pages 2>&1
if ($pagesCheck -match "Not Found") {
    & $ghPath api repos/$username/$repoName/pages -f source='{"branch":"main","path":"/"}' 2>&1 | Out-Null
    Write-Host "[*] GitHub Pages has been activated." -ForegroundColor Green
} else {
    Write-Host "[*] GitHub Pages is already active." -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   SUCCESS! YOUR WEBSITE IS NOW LIVE ON GITHUB PAGES!" -ForegroundColor Green
Write-Host "   URL: https://$username.github.io/$repoName/" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Note: It may take 1-2 minutes for GitHub to build and serve the first deployment." -ForegroundColor Yellow

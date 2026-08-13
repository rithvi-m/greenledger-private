# Push GreenLedger to a new private GitHub repo (your account).
# Prerequisite: run once in PowerShell:
#   & "C:\Program Files\GitHub CLI\gh.exe" auth login -h github.com -p https -w

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$gh = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) {
  Write-Error "GitHub CLI not found. Install with: winget install GitHub.cli"
}

& $gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Not logged in. Run: & `"$gh`" auth login -h github.com -p https -w"
  exit 1
}

$repoName = "greenledger-private"
Write-Host "Creating private repo: $repoName"

& $gh repo create $repoName --private --source=. --remote=private --push --description "GreenLedger — private SRCAS hackathon prototype"
if ($LASTEXITCODE -ne 0) {
  Write-Host "If the name is taken, rerun with another name:"
  Write-Host "  gh repo create YOUR-REPO-NAME --private --source=. --remote=private --push"
  exit $LASTEXITCODE
}

Write-Host "Done. Private repo URL:"
& $gh repo view $repoName --web 2>$null
& $gh repo view $repoName --json url -q .url

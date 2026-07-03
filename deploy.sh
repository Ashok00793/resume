#!/usr/bin/env bash

# Dr. Ashokkumar Kumaravel Linux GitHub Deployer
set -e

# Terminal Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==========================================================${NC}"
echo -e "${GREEN}     Dr. Ashokkumar Kumaravel Linux GitHub Deployer      ${NC}"
echo -e "${GREEN}==========================================================${NC}"
echo

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}[Error] Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Detect remote URL
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE_URL" ]; then
    echo -e "${RED}[Error] No git remote origin detected.${NC}"
    echo -e "Please configure remote origin: git remote add origin <url>"
    exit 1
fi

echo -e "${CYAN}[*] Current Remote URL:${NC} $REMOTE_URL"

# Define deployment actions
deploy_https() {
    echo -e "${CYAN}[*] Configuring git credential cache (valid for 1 hour)...${NC}"
    git config --global credential.helper 'cache --timeout=3600'
    
    echo -e "${YELLOW}[!] GitHub no longer accepts account passwords for push operations.${NC}"
    echo -e "Please use your ${GREEN}GitHub Personal Access Token (PAT)${NC} as the password."
    echo -e "If you need to generate one, go to: https://github.com/settings/tokens"
    echo
    
    echo -e "${CYAN}Pushing changes to origin main...${NC}"
    if git push origin main; then
        echo -e "${GREEN}==========================================================${NC}"
        echo -e "${GREEN}   SUCCESS! YOUR WEBSITE HAS BEEN DEPLOYED TO GITHUB!    ${NC}"
        echo -e "${GREEN}==========================================================${NC}"
    else
        echo -e "${RED}[Error] Push failed. Double check your token and permissions.${NC}"
    fi
}

deploy_ssh() {
    echo -e "${CYAN}[*] Testing SSH connection to GitHub...${NC}"
    if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
        echo -e "${GREEN}[*] SSH connection validated. Pushing changes...${NC}"
        git push origin main
    else
        echo -e "${YELLOW}[!] SSH authentication failed or host key not verified.${NC}"
        echo -e "Would you like this script to configure SSH keys for you? (y/n)"
        read -r choice
        if [[ "$choice" =~ ^[Yy]$ ]]; then
            setup_ssh_keys
        else
            echo -e "${RED}[Cancel] SSH setup skipped.${NC}"
        fi
    fi
}

setup_ssh_keys() {
    SSH_DIR="$HOME/.ssh"
    KEY_FILE="$SSH_DIR/id_ed25519"
    
    if [ ! -d "$SSH_DIR" ]; then
        mkdir -p "$SSH_DIR"
        chmod 700 "$SSH_DIR"
    fi
    
    if [ ! -f "$KEY_FILE" ]; then
        echo -e "${CYAN}Generating Ed25519 SSH key...${NC}"
        ssh-keygen -t ed25519 -C "bioashok00793@gmail.com" -f "$KEY_FILE" -N ""
        eval "$(ssh-agent -s)"
        ssh-add "$KEY_FILE"
    fi
    
    echo -e "${YELLOW}==========================================================${NC}"
    echo -e "${YELLOW}               ACTION REQUIRED: ADD KEY TO GITHUB         ${NC}"
    echo -e "${YELLOW}==========================================================${NC}"
    echo -e "1. Go to: ${GREEN}https://github.com/settings/ssh/new${NC}"
    echo -e "2. Title: Mint-Linux-Keys"
    echo -e "3. Copy the SSH key below and paste it in the Key box:"
    echo
    cat "${KEY_FILE}.pub"
    echo
    echo -e "${YELLOW}==========================================================${NC}"
    echo -e "Press Enter after you have added the key to GitHub to test and push..."
    read -r
    
    # Verify connection
    echo -e "${CYAN}Testing connection again...${NC}"
    ssh -o StrictHostKeyChecking=accept-new -T git@github.com || true
    
    # Change remote URL to SSH if it was HTTPS
    if [[ "$REMOTE_URL" =~ ^https://github.com/ ]]; then
        echo -e "${CYAN}Switching Git remote origin to use SSH...${NC}"
        SSH_URL=$(echo "$REMOTE_URL" | sed -E 's|https://github.com/|git@github.com:|')
        git remote set-url origin "$SSH_URL"
        echo -e "New remote: $SSH_URL"
    fi
    
    echo -e "${CYAN}Pushing changes...${NC}"
    git push origin main
}

# Determine protocol
if [[ "$REMOTE_URL" =~ ^git@github.com: ]]; then
    deploy_ssh
else
    echo -e "Would you like to deploy using ${GREEN}HTTPS with Personal Access Token${NC} or ${GREEN}configure SSH key${NC}? (token/ssh)"
    read -r protocol
    if [ "$protocol" == "ssh" ]; then
        setup_ssh_keys
    else
        deploy_https
    fi
fi

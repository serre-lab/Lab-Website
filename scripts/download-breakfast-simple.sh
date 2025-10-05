#!/bin/bash

# Simple script to download Breakfast dataset files to Google Drive

GOOGLE_DRIVE_DIR="$HOME/Google Drive/My Drive/Misc/Web/datasets/breakfast"

echo "🍳 Downloading Breakfast Actions Dataset files..."
echo "📁 Target directory: $GOOGLE_DRIVE_DIR"
echo ""

# Create directory
mkdir -p "$GOOGLE_DRIVE_DIR"

# Download files with curl (handles redirects automatically)
echo "📥 Downloading dense_traj_all_s1.tar.gz (~37GB)..."
curl -L -o "$GOOGLE_DRIVE_DIR/dense_traj_all_s1.tar.gz" \
    "https://www.dropbox.com/s/mfz8pe7jerlj54g/dense_traj_all_s1.tar.gz?dl=1"

echo ""
echo "📥 Downloading dense_traj_all_s2.tar.gz (~57GB)..."
curl -L -o "$GOOGLE_DRIVE_DIR/dense_traj_all_s2.tar.gz" \
    "https://www.dropbox.com/s/l25u0jbmi62jwjp/dense_traj_all_s2.tar.gz?dl=1"

echo ""
echo "📥 Downloading dense_traj_all_s3.tar.gz (~42GB)..."
curl -L -o "$GOOGLE_DRIVE_DIR/dense_traj_all_s3.tar.gz" \
    "https://www.dropbox.com/s/0j7enp6cjq2r8jd/dense_traj_all_s3.tar.gz?dl=1"

echo ""
echo "📥 Downloading dense_traj_all_s4.tar.gz (~75GB)..."
curl -L -o "$GOOGLE_DRIVE_DIR/dense_traj_all_s4.tar.gz" \
    "https://www.dropbox.com/s/0ynhovye29ygha7/dense_traj_all_s4.tar.gz?dl=1"

echo ""
echo "📥 Downloading demo_bundle.rar..."
curl -L -o "$GOOGLE_DRIVE_DIR/demo_bundle.rar" \
    "http://serre-lab.clps.brown.edu/wp-content/uploads/2012/04/demo_bundle.rar"

echo ""
echo "🎉 Download complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check Google Drive folder for downloaded files"
echo "2. Create public sharing links for each file"
echo "3. Update the Breakfast dataset page with real download links"

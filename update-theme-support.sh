#!/bin/bash

# This script adds dark mode support to all HTML files in the CheckMet website

# Directory containing HTML files
DIR="/Users/lukman.ibrahim/checkmet-hono_next/Website/Checkmet-websites"

# List of HTML files to update (excluding index.html and features.html which are already updated)
HTML_FILES=(
  "about.html"
  "careers.html"
  "contact.html"
  "demo.html"
  "gdpr.html"
  "how-it-works.html"
  "partners.html"
  "pricing.html"
  "privacy.html"
  "security.html"
  "solutions.html"
  "terms.html"
)

# For each HTML file
for file in "${HTML_FILES[@]}"; do
  echo "Adding dark mode support to $file..."
  
  # 1. Add CSS files to the head section
  sed -i '' 's|<link rel="stylesheet" href="css/styles.css">|<link rel="stylesheet" href="css/styles.css">\n  <link rel="stylesheet" href="css/glassmorphism.css">\n  <link rel="stylesheet" href="css/theme-toggle.css">|' "$DIR/$file"
  
  # 2. Add class to body tag
  sed -i '' 's|<body>|<body class="light-theme">|' "$DIR/$file"
  
  # 3. Add theme toggle button before Request Demo button
  sed -i '' 's|<a href="demo.html" class="btn-demo|<button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">\n          <i class="fas fa-moon dark-icon"></i>\n          <i class="fas fa-sun light-icon"></i>\n        </button>\n        <a href="demo.html" class="btn-demo|' "$DIR/$file"
  
  # 4. Add theme switcher script before closing body tag
  sed -i '' 's|<script src="js/main.js"></script>|<script src="js/main.js"></script>\n  <!-- Theme Switcher -->\n  <script src="js/theme-switcher.js"></script>|' "$DIR/$file"
  
  echo "✅ Completed updates for $file"
done

echo "Dark mode has been added to all pages!"

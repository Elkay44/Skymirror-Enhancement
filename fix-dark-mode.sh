#!/bin/bash

# This script adds the fixed dark mode script to all HTML files in the CheckMet website

# Directory containing HTML files
DIR="/Users/lukman.ibrahim/checkmet-hono_next/Website/Checkmet-websites"

# List of all HTML files
HTML_FILES=(
  "about.html"
  "careers.html"
  "contact.html"
  "demo.html"
  "features.html"
  "gdpr.html"
  "how-it-works.html"
  "index.html"
  "partners.html"
  "pricing.html"
  "privacy.html"
  "security.html"
  "solutions.html"
  "terms.html"
)

# Correct CSS link order
CSS_LINKS="<link rel=\"stylesheet\" href=\"css/styles.css\">\n  <link rel=\"stylesheet\" href=\"css/glassmorphism.css\">\n  <link rel=\"stylesheet\" href=\"css/theme-toggle.css\">"

# For each HTML file
for file in "${HTML_FILES[@]}"; do
  echo "Fixing dark mode in $file..."
  
  # Replace theme-switcher.js with dark-mode-fix.js
  # This preserves the original script in case we need to revert
  sed -i '' 's|<script src="js/theme-switcher.js"></script>|<script src="js/dark-mode-fix.js"></script>|' "$DIR/$file"

  # Ensure correct CSS order
  echo "Ensuring correct CSS order in $file..."
  sed -i '' "s|<link rel=\"stylesheet\" href=\"css/styles.css\">.*<link rel=\"stylesheet\" href=\"css/theme-toggle.css\">|$CSS_LINKS|" "$DIR/$file"
  
  # Make sure body has the light-theme class
  sed -i '' 's|<body>|<body class="light-theme">|' "$DIR/$file"
  
  echo "✅ Fixed dark mode in $file"
  echo "✅ Ensured correct CSS order in $file"
done

echo "Dark mode has been fixed on all pages!"

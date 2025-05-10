#!/bin/bash

# Array of HTML files to update
FILES=(
  "about.html"
  "careers.html"
  "case-studies.html"
  "components/footer.html"
  "consultation.html"
  "enterprise.html"
  "index.html"
  "partners.html"
  "privacy-policy.html"
  "privacy.html"
  "solutions.html"
  "technology.html"
  "terms-of-service.html"
  "terms.html"
)

# Function to update the logo and name
update_file() {
  local file=$1
  # Update logo HTML
  sed -i '' 's|<img src="images/PNG ICON.svg" alt="Skymirror Logo" class="logo-img">|<img src="images/PNG ICON.svg" alt="Skymirror Logo" class="logo-img" width="28" height="32">|g' "$file"
  sed -i '' 's|<span class="logo-text">Sky<span>Mirror</span></span>|<span class="logo-text">Skymirror</span>|g' "$file"
  
  # Update meta descriptions and titles
  sed -i '' 's|SkyMirror|Skymirror|g' "$file"
}

# Process each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    update_file "$file"
  fi
done

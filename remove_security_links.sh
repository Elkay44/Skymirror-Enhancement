#!/bin/bash

# List of HTML files to modify
FILES=("index.html" "about.html" "careers.html" "case-studies.html" "consultation.html" "demo.html" "enterprise.html" "features.html" "gdpr.html" "how-it-works.html" "partners.html" "privacy.html" "solutions.html" "technology.html" "terms.html" "pricing.html" "contact.html")

# Function to remove security link from navigation
remove_nav_link() {
    sed -i '' '/<a href="security.html" class="navbar-link">Security</a>/d' "$1"
}

# Function to remove security link from footer
remove_footer_link() {
    sed -i '' '/<a href="security.html" class="footer-legal-link">Security Policy</a>/d' "$1"
}

# Process each file
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        remove_nav_link "$file"
        remove_footer_link "$file"
    fi
done

# Remove the security.html file itself
if [ -f "security.html" ]; then
    rm "security.html"
fi

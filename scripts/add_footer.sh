#!/bin/bash

# Get the absolute path to the footer file
FOOTER_FILE="$(pwd)/components/footer.html"

# List of HTML files to process
HTML_FILES=(
    "about.html"
    "careers.html"
    "case-studies.html"
    "consultation.html"
    "demo.html"
    "enterprise.html"
    "features.html"
    "gdpr.html"
    "how-it-works.html"
    "index.html"
    "partners.html"
    "privacy-policy.html"
    "privacy.html"
    "solutions.html"
    "technology.html"
    "terms-of-service.html"
    "terms.html"
)

# Function to add footer to a file
add_footer() {
    local file=$1
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "Error: File $file not found"
        return 1
    fi

    # Read footer content
    FOOTER_CONTENT=$(cat "$FOOTER_FILE")

    # Check if footer already exists in file
    if grep -q "footer glass-footer" "$file"; then
        echo "Footer already exists in $file"
        return 0
    fi

    # Add footer before closing body tag
    sed -i '' '/</body>/i\'$FOOTER_CONTENT'\n' "$file"
    echo "Added footer to $file"
}

# Process each file
for file in "${HTML_FILES[@]}"; do
    add_footer "$file"
done

echo "All files processed. Footer added to all HTML pages."

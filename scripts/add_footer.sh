#!/bin/bash

# Script to add footer to all HTML files
# Usage: ./add_footer.sh [options]
# Options:
#   -f, --force     Force update even if footer exists
#   -v, --verbose   Show detailed progress
#   -n, --dry-run   Show what would be done without making changes

# Get script directory
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FOOTER_FILE="$PROJECT_DIR/components/footer.html"

# Default options
FORCE=false
VERBOSE=false
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--force)
            FORCE=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -n|--dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Function to log messages
log() {
    if [ "$VERBOSE" = true ] || [ "$1" != "debug" ]; then
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] $2"
    fi
}

# Function to add footer to a file
add_footer() {
    local file=$1
    local backup_file="$file.bak"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        log "error" "Error: File $file not found"
        return 1
    fi

    # Create backup
    cp "$file" "$backup_file"
    log "debug" "Created backup: $backup_file"

    # Read footer content
    FOOTER_CONTENT=$(cat "$FOOTER_FILE")

    # Check if footer already exists
    if grep -q "footer glass-footer" "$file" && [ "$FORCE" = false ]; then
        log "info" "Footer already exists in $file (use -f to force update)"
        return 0
    fi

    # Check for closing body tag
    if ! grep -q "</body>" "$file"; then
        log "error" "Error: No closing body tag found in $file"
        return 1
    fi

    # Add footer
    if [ "$DRY_RUN" = false ]; then
        # Create temporary file with footer content
        temp_file=$(mktemp)
        echo "$FOOTER_CONTENT" > "$temp_file"
        
        # Get content before </body>
        sed '/<\/body>/q' "$file" > "$temp_file".part1
        
        # Get content after </body>
        sed -n '/<\/body>/,$p' "$file" > "$temp_file".part2
        
        # Combine parts
        cat "$temp_file".part1 "$temp_file" "$temp_file".part2 > "$file"
        
        # Clean up temporary files
        rm "$temp_file" "$temp_file".part1 "$temp_file".part2
        
        if [ $? -eq 0 ]; then
            log "success" "Successfully added footer to $file"
        else
            log "error" "Error adding footer to $file"
            # Restore backup on error
            cp "$backup_file" "$file"
            rm "$backup_file"
            return 1
        fi
    else
        log "info" "Would add footer to $file"
    fi

    # Clean up backup if successful
    if [ "$DRY_RUN" = false ]; then
        rm "$backup_file"
    fi

    return 0
}

# Find all HTML files in project directory
log "info" "Searching for HTML files..."
HTML_FILES=($(find "$PROJECT_DIR" -type f -name "*.html"))

# Process each file
TOTAL_FILES=${#HTML_FILES[@]}
CURRENT_FILE=0

for file in "${HTML_FILES[@]}"; do
    CURRENT_FILE=$((CURRENT_FILE + 1))
    log "info" "Processing file $CURRENT_FILE/$TOTAL_FILES: $file"
    add_footer "$file"
done

log "info" "All files processed."
if [ "$DRY_RUN" = true ]; then
    log "info" "No changes were made (dry run)"
fi

#!/bin/bash

# Script to remove footer from all HTML files
# Usage: ./remove_footer.sh [options]
# Options:
#   -v, --verbose   Show detailed progress
#   -n, --dry-run   Show what would be done without making changes

# Get script directory
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Default options
VERBOSE=false
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
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

# Function to remove footer from a file
remove_footer() {
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

    # Check if footer exists
    if ! grep -q "footer glass-footer" "$file"; then
        log "info" "No footer found in $file"
        return 0
    fi

    # Remove footer
    if [ "$DRY_RUN" = false ]; then
        # Get content before footer
        sed '/<footer class="footer glass-footer"/q' "$file" > "$temp_file".part1
        
        # Get content after footer
        sed -n '/<\/footer>/,/<\/body>/p' "$file" | tail -n +2 > "$temp_file".part2
        
        # Combine parts
        cat "$temp_file".part1 "$temp_file".part2 > "$file"
        
        if [ $? -eq 0 ]; then
            log "success" "Successfully removed footer from $file"
        else
            log "error" "Error removing footer from $file"
            cp "$backup_file" "$file"
            rm "$backup_file"
            return 1
        fi
    else
        log "info" "Would remove footer from $file"
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
    remove_footer "$file"
done

log "info" "All files processed."
if [ "$DRY_RUN" = true ]; then
    log "info" "No changes were made (dry run)"
fi

#!/usr/bin/env python3
"""
Generate and update deploy token for cache busting verification.

For Astro projects, this updates src/data/deploy-token.json which is then
imported by Layout.astro and rendered as a meta tag in the HTML.
"""

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path


def generate_token():
    """Generate a timestamp-based deploy token."""
    return datetime.utcnow().strftime("%Y%m%d-%H%M%S")


def update_token_file(repo_path, token):
    """Update or create the deploy token JSON file."""
    token_file = Path(repo_path) / "src" / "data" / "deploy-token.json"
    
    # Ensure directory exists
    token_file.parent.mkdir(parents=True, exist_ok=True)
    
    # Write token
    data = {
        "token": token,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    with open(token_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    return token_file


def ensure_layout_imports_token(repo_path):
    """
    Ensure Layout.astro imports the deploy token and includes it in a meta tag.
    In Astro, imports go inside the frontmatter (between --- markers).
    Returns True if modifications were made.
    """
    layout_file = Path(repo_path) / "src" / "layouts" / "Layout.astro"
    
    if not layout_file.exists():
        print(f"Warning: Layout file not found at {layout_file}")
        return False
    
    with open(layout_file, 'r') as f:
        content = f.read()
    
    original_content = content
    modified = False
    
    # Check if deploy token is already imported (inside frontmatter)
    if 'deploy-token.json' not in content:
        # Find the second --- (end of frontmatter)
        first_marker = content.find('---')
        if first_marker == -1:
            print(f"Warning: Could not find frontmatter in {layout_file}")
            return False
        
        second_marker = content.find('---', first_marker + 3)
        if second_marker == -1:
            print(f"Warning: Could not find end of frontmatter in {layout_file}")
            return False
        
        # Add import inside frontmatter, after the first ---
        import_stmt = 'import deployToken from "../data/deploy-token.json";\n'
        insert_pos = first_marker + 3
        # Add newline if not present
        if content[insert_pos:insert_pos+1] != '\n':
            import_stmt = '\n' + import_stmt
        content = content[:insert_pos] + import_stmt + content[insert_pos:]
        modified = True
    
    # Check if meta tag with deploy token exists
    if 'name="deploy-token"' not in content:
        # Add meta tag in the <head> section, after theme-color meta
        theme_color_pattern = r'(<meta name="theme-color" content=\{[^}]+\} />)'
        match = re.search(theme_color_pattern, content)
        if match:
            insert_pos = match.end()
            meta_tag = '\n    <meta name="deploy-token" content={deployToken.token} />'
            content = content[:insert_pos] + meta_tag + content[insert_pos:]
            modified = True
    
    if modified:
        with open(layout_file, 'w') as f:
            f.write(content)
        print(f"Updated {layout_file} to include deploy token")
    
    return modified


def main():
    if len(sys.argv) < 2:
        repo_path = "."
    else:
        repo_path = sys.argv[1]
    
    # Generate new token
    token = generate_token()
    print(f"token={token}")
    
    # Update token file
    token_file = update_token_file(repo_path, token)
    print(f"Updated {token_file}")
    
    # Ensure Layout imports token
    layout_modified = ensure_layout_imports_token(repo_path)
    
    return 0


if __name__ == "__main__":
    sys.exit(main())

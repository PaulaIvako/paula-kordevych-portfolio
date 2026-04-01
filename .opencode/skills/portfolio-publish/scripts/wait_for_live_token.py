#!/usr/bin/env python3
"""
Poll the live site until the expected deploy token appears in the HTML.

Usage:
    python3 wait_for_live_token.py <url> <token>
    
Example:
    python3 wait_for_live_token.py "https://paula-kordevych.art/" "20250401-123456"
"""

import re
import sys
import time
import urllib.request
from urllib.error import URLError, HTTPError


def fetch_page(url):
    """Fetch the page with cache-busting headers."""
    # Add cache-busting query param
    separator = '&' if '?' in url else '?'
    cache_bust_url = f"{url}{separator}_cb={int(time.time())}"
    
    req = urllib.request.Request(
        cache_bust_url,
        headers={
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'User-Agent': 'Mozilla/5.0 (compatible; DeployBot/1.0)'
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.read().decode('utf-8')
    except HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}")
        return None
    except URLError as e:
        print(f"URL Error: {e.reason}")
        return None
    except Exception as e:
        print(f"Error fetching page: {e}")
        return None


def check_token_in_html(html, token):
    """Check if the deploy token appears in the HTML."""
    # Look for meta tag with deploy-token
    pattern = rf'<meta[^>]*name=["\']deploy-token["\'][^>]*content=["\']{re.escape(token)}["\'][^>]*>'
    if re.search(pattern, html):
        return True
    
    # Also check for token anywhere in content (fallback)
    if token in html:
        return True
    
    return False


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 wait_for_live_token.py <url> <token>")
        print("Example: python3 wait_for_live_token.py 'https://paula-kordevych.art/' '20250401-123456'")
        return 1
    
    url = sys.argv[1]
    expected_token = sys.argv[2]
    
    # Configuration
    max_attempts = 30
    delay_seconds = 10
    
    print(f"Waiting for deploy token '{expected_token}' to appear on {url}")
    print(f"Max attempts: {max_attempts}, Delay: {delay_seconds}s")
    print()
    
    for attempt in range(1, max_attempts + 1):
        print(f"Attempt {attempt}/{max_attempts}...")
        
        html = fetch_page(url)
        
        if html is None:
            print("  Failed to fetch page, will retry...")
        elif check_token_in_html(html, expected_token):
            print()
            print(f"SUCCESS! Deploy token '{expected_token}' found in live HTML")
            return 0
        else:
            print(f"  Token not found yet, waiting...")
        
        if attempt < max_attempts:
            time.sleep(delay_seconds)
    
    print()
    print(f"TIMEOUT: Token '{expected_token}' did not appear after {max_attempts} attempts")
    print("The push may have succeeded, but deploy verification failed.")
    return 1


if __name__ == "__main__":
    sys.exit(main())

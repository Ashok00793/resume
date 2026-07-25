import re, urllib.request, json, os

GS_URL = "https://scholar.google.com/citations?hl=en&user=nnrKxBMAAAAJ&view_op=list_works&sortby=pubdate"
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data.js')

def fetch():
    req = urllib.request.Request(GS_URL, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
    return html

def parse_stats(html):
    m = re.search(r'Citations\s*(\d+)', html)
    cites = int(m.group(1)) if m else None
    m = re.search(r'h-index\s*(\d+)', html)
    h = int(m.group(1)) if m else None
    m = re.search(r'i10-index\s*(\d+)', html)
    i10 = int(m.group(1)) if m else None
    return cites, h, i10

def update_data(cites, h, i10):
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    updated = content
    updated = re.sub(r'citations:\s*\d+', f'citations: {cites}', updated)
    updated = re.sub(r'i10Index:\s*\d+', f'i10Index: {i10}', updated)

    old_qa = re.search(r'with \d+ citations', updated)
    if old_qa:
        updated = updated.replace(old_qa.group(), f'with {cites} citations')

    old_qa2 = re.search(r'with \d+ total citations', updated)
    if old_qa2:
        updated = updated.replace(old_qa2.group(), f'with {cites} total citations')

    changed = updated != content
    if changed:
        with open(DATA_PATH, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f'Updated: {cites} citations, h={h}, i10={i10}')
    else:
        print('No changes')
    return changed

if __name__ == '__main__':
    html = fetch()
    cites, h, i10 = parse_stats(html)
    if cites:
        update_data(cites, h, i10)
    else:
        print('Failed to parse GS stats')

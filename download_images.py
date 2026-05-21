from duckduckgo_search import DDGS
import urllib.request
import os
import time

queries = {
    # Double chin reduction is the main one that needs fix, but I'll grab a few other high quality ones
    "double_chin_reduction_stock.jpg": "Kybella double chin injection clinic procedure high quality",
    "laser_skin_tightening_stock.jpg": "laser skin tightening face procedure dermatology clinic high quality",
    "chemical_peel_stock.jpg": "chemical skin peel aesthetician face dermatology clinic",
    "microdermabrasion_stock.jpg": "microdermabrasion procedure face dermatology",
    "hydrafacial_stock.jpg": "hydrafacial machine treatment face clear skin",
    "dermal_fillers_stock.jpg": "dermal filler injection face aesthetic clinic",
    "laser_pigmentation_stock.jpg": "q-switched nd yag laser face pigmentation dermatology"
}

output_dir = "assets"

with DDGS() as ddgs:
    for filename, query in queries.items():
        print(f"Searching for {query}...")
        results = ddgs.images(query, max_results=3, size="Large")
        
        filepath = os.path.join(output_dir, filename)
        
        for r in results:
            url = r['image']
            print(f"  Downloading {url}...")
            try:
                # Add headers to avoid 403 Forbidden
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                    out_file.write(response.read())
                print(f"  Saved to {filepath}")
                break
            except Exception as e:
                print(f"  Failed: {e}")
        
        time.sleep(1) # Be nice

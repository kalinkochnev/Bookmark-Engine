export function getBookmarkWebpages(limit=5) {
    let tree = browser.bookmarks.getTree();

    tree.then((bkmrk_tree) => {
        // Get the bookmarks and then get their webpages
        let bookmarks = getBookmarks(bkmrk_tree[0]);
        let pending_requests = [];

        for (const [index, bk] in bookmarks.entries()) {
            console.log('yoyoyo')
            // Stop sending requests once we reach our limit
            if (index >= limit) {
                break;
            }

            // Return HTML response from the promise
            let req = fetch(kb.url, {method: 'get'}).then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    return null;
                }
            });

            // Add request to pending
            pending_requests.push(req);
        }

        // Wait for all the requests to resolve
        Promise.all(pending_requests).then(results => {
            return results.filter(item => item !== null);
        });
        
    },
        (error) => console.log(`An error: ${error}`)
    );
}
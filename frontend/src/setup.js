export function getBookmarks(bookmarkTree, bookmarks = []) {
	// Ignore any folders (which means they don't have a url)
	if (bookmarkTree.url) {
        // Create the Rust Bookmark struct
		bookmarks.push({
			title: bookmarkTree.title,
			url: bookmarkTree.url
		})
	}

	// If it is a folder, search for its children
	if (bookmarkTree.children) {
		for (let child of bookmarkTree.children) {
			bookmarks.push(...getBookmarks(child, []))
		}
	}
    
    // Preprocess any duplicate 
	return bookmarks;
}

export function getBookmarkWebpages(limit=5) {
    let tree = browser.bookmarks.getTree();

    return tree.then((bkmrk_tree) => {
        // Get the bookmarks and then get their webpages
        let bookmarks = getBookmarks(bkmrk_tree[0]);
        let pending_requests = [];

        for (let [index, bk] of bookmarks.reverse().entries()) {
            // Stop sending requests once we reach our limit
            if (index >= limit) {
                break;
            }

            // Return the HTML response from the promise
            let req = fetch(bk.url, {method: 'get'  }).then(res => {
                if (res.ok) {
                    console.log(res.headers);

                    return res.text();
                } else {
                    return null;
                }
            });

            // Add request to pending
            pending_requests.push(req);
        }

        // Wait for all the requests to resolve
        return Promise.all(pending_requests).then(results => {
            return results.filter(item => item !== null);
        });
        
    },
        (error) => console.log(`An error: ${error}`)
    );
}
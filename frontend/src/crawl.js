import { getBookmarks } from "./setup";


function index_bookmarks() {
    // Get bookmarks from the browser.
    let bookmarks = getBookmarks();
    
    // preprocess bookmarks by grouping ones that have same base url
    let grouped = Bookmarks.group_bookmarks(bookmarks);

    // Retrieve bookmarked webpages and begin crawl of bookmarks
    let index = [];

    // If crawl is enabled, explore all bookmarks completely
    if (crawlEnabled) {
        for (let bk of bookmarks) {
            index.push(bk.crawl(bk.url));
        }
    } else {
        for (let bk of bookmarks) {
            index.push(bk.index_page())
        }
    }


    // Save index to browser and with last updated information
    Index.save();

    // Add suggestions to search bar
    handle_suggestions();

}
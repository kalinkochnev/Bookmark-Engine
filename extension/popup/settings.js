import {getBookmarkWebpages} from "./setup.js";

document.getElementById("dosmth").addEventListener('click', () => {
	displayBookmarks();
	console.log(":(")
	// console.log(getBookmarkWebpages(1));
});

function getBookmarks(bookmarkTree, bookmarks = []) {
	// Ignore any folders (which means they don't have a url)
	if (bookmarkTree.url) {
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
	return bookmarks;
}


function displayBookmarks() {
	let tree = browser.bookmarks.getTree();
	let folders = document.getElementById("bk-folders");
	folders.innerHTML = ""

	tree.then((bkmrk_tree) => {
		// Get the bookmarks and then display them
		console.log(bkmrk_tree[0]);

		let bookmarks = getBookmarks(bkmrk_tree[0]);

		for (bk of bookmarks) {
			folders.appendChild(document.createTextNode(bk.title));
			folders.appendChild(document.createElement("br"));
		}
	},
		(error) => console.log(`An error: ${error}`)
	);
}

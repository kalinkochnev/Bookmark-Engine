import {getBookmarks, getBookmarkWebpages} from "./setup.js";

document.getElementById("dosmth").addEventListener('click', () => {
	displayBookmarks();
	getBookmarkWebpages().then(result => console.log(result))
});

function displayBookmarks() {
	let tree = browser.bookmarks.getTree();
	let folders = document.getElementById("bk-folders");
	folders.innerHTML = ""

	tree.then((bkmrk_tree) => {
		// Get the bookmarks and then display them
		let bookmarks = getBookmarks(bkmrk_tree[0]);

		for (let bk of bookmarks) {
			folders.appendChild(document.createTextNode(bk.title));
			folders.appendChild(document.createElement("br"));
		}
	},
		(error) => console.log(`An error: ${error}`)
	);
}

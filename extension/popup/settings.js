document.getElementById("dosmth").addEventListener('click', () => {
    getBookmarkFolders()
});


function getBookmarkFolders() {

    let tree = bookmarks.getTree();
    let folders = document.getElementById("bk-folders");
    folders.appendChild(document.createTextNode(Object.keys(tree)));
}

/*

*/
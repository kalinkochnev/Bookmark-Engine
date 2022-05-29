document.getElementById("dosmth").addEventListener('click', () => {
    getBookmarkFolders()
});


function onRejected(error) {
  console.log(`An error: ${error}`);
}

function logItems(bookmarkItem) {
  let folders = document.getElementById("bk-folders");

  if (bookmarkItem.url) {
    folders.appendChild(document.createTextNode(bookmarkItem.title));
  } else {
    folders.appendChild(document.createTextNode("Folder"));
  }
  folders.appendChild(document.createElement("br"));
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      logItems(child);
    }
  }
}

function logTree(bookmarkItems) {
  let folders = document.getElementById("bk-folders");
  folders.innerHTML = ""

  logItems(bookmarkItems[0]);
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}


function getBookmarkFolders() {
  // console.log("click");
  let tree = browser.bookmarks.getTree();
  // let gettingRecent = browser.bookmarks.getRecent(10);
  tree.then(logTree, onRejected);
  // folders.firstElementChild = document.createTextNode(getBookmarks(tree))
}

function getBookmarks(bookmarkItem) {
    let bookmarks = [];
    let folders = [];
    let to_search = [bookmarkItem];

    while (to_search.length > 0) {
        let curr_bk = to_search[0];
        console.log(to_search)

        if (curr_bk.url) {
            bookmarks.push(curr_bk.title);
        } else {
            folders.push(curr_bk.title)
        }
        if (curr_bk.children) {
            for (child of curr_bk.children) {
                to_search.push(child);
            }
        }
        
        to_search.splice(0);
    }
    return bookmarks
}
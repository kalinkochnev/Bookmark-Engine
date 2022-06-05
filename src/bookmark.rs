use regex::Regex;
use scraper::{Html, Selector};
use wasm_bindgen::prelude::*;
use lazy_static::lazy_static;
use chrono::{DateTime, Local};
use crate::webpage::Webpage;

#[derive(Debug)]
enum BookmarkErr {
    SelectionNotFound,
    UrlNotValid,
    BaseUrlUnparseable,
    PathUrlUnparseable
}

#[wasm_bindgen]
struct Bookmark {
    folder_path: Vec<String>, // the structure of the folders where the bookmark is contained
    title: String,
    url: String
}
impl Bookmark {
    fn new(folder_path: Vec<String>, title: String, url: String) -> Self {
        Bookmark { folder_path, title, url }
    }
}

struct BookmarkGroup<'a> {
    base_url: &'a str,
    webpages: Vec<Webpage>
}

impl<'a> BookmarkGroup<'a> {


    pub fn new(title: String, bookmark_url: String, bookmarked_html: String) -> Result<Self, ParseError> {
        lazy_static! {
            static ref url_regex: Regex = Regex::new(r"/(^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+))([a-z0-9\-._~%!$&'()*+,;=:@/]*)/igm").unwrap();
        };

        if url_regex.is_match(&bookmark_url) {
            let url_captures = url_regex.captures(&bookmark_url).unwrap();

            let base_url = url_captures.get(0).unwrap().as_str();
            let path = match url_captures.get(2) {
                Some(path) => path.as_str(),
                None => ""
            };

        }

        return Self {title, base_url: base_url, html: Self::remove_formatting(&bookmarked_html)};
    }


    fn group_bookmarks(bookmarks: Vec<Bookmark>) {
        // Find bookmarks with the same base url
        // add paths as new webpages with a depth of 0
        // If
    }

    fn crawl(&self, start_url: String) {
        // Crawl to a certain max depth (1 most likely)

        // Send a request for the page
        // Extract the bookmark title, site title, and body text of the web page
        // Extract all links from the page
        // Keep all links that maintain the same base url
        // Add parsed page to pages that have been traversed
        // Add all links to add and haven't been explored yet

        // Repeat until there are no more links to explore
    }


    
}

#[cfg(test)]
mod tests {
    use crate::bookmark::Bookmark;

    #[test]
    fn test_scrape_test() {
        let html_sample = "
            <!DOCTYPE html>
            <html lang=\"en\">
                <head>
                    <title>test title</title>
                    <meta charset=\"utf-8\">
                </head>
                <body>
                    <h2>Bookmark folders</h2>
                    <button>click <b>me</b></button>
                </body>
            </html>
        ";
        let bookmark = Bookmark::new("".to_string(), "".to_string(), html_sample.to_string());
        println!("{}", bookmark.html);
        let scraped_text = bookmark.scrape_text().unwrap();
        assert_eq!(vec!["test title", "Bookmark folders", "click me"], scraped_text);
    }

}




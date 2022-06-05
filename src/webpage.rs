use chrono::{Duration, DateTime, Local};

pub struct Webpage<'a> {
    base_url: &'a str,
    id: usize,
    // dist_from_bk: usize, // The known minimum distance of the page from a bookmark
    title: String,
    // body: Html,
    path: String,
    last_indexed: DateTime<Local>,
    time_spent: Duration
}

impl<'a> Webpage<'a> {
    fn new(title: String, ) {

    }
    fn remove_formatting(text: &str) -> String {
        // save the html with trailing, leadings, and repeated spaces
        lazy_static! {
            static ref re: Regex =  Regex::new(r"\n+").unwrap();
        }
        text.split("\n").map(|t| t.trim().to_owned()).collect::<Vec<String>>().join("")
    }

    // Retrieves the webpage title and body text to be used to build the index
    pub fn scrape_text(&self) -> Result<Vec<String>, ParseError> {
        let fragment = Html::parse_document(self.html.as_str());

        let body_select = Selector::parse("body").unwrap();
        let title_select = Selector::parse("title").unwrap();

        let mut title_text = match fragment.select(&title_select).next() {
            Some(title) => title.text().map(|item| item.to_owned()).collect::<Vec<String>>(),
            None => vec![]
        };

        let body_text = match fragment.select(&body_select).next() {
            Some(body) => body.text().map(|item| item.to_owned()).collect::<Vec<String>>(),
            None => return Err(ParseError::SelectionNotFound),
        };

        title_text.extend(body_text);
        
        Ok(title_text)
    }

    // Send a request to retrieve the html from the given url resource
    fn get_html(&self, page_path: &str) -> Option<Html> {

    }
}

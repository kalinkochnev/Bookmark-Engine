use quick_xml::{Reader, events::Event};

pub struct Bookmark<'a> {
    name: &'a str,
    url: &'a str
}

pub fn get_bookmarks() {
    let mut file = std::fs::read_to_string("bookmarks.html").expect("File not found");
    file = file.replace("<DT>", "");
    // println!("{}", file);
    let mut reader = Reader::from_str(&file);
    let mut buffer = Vec::new();

    // Remove <DT> non-XML tag


    loop {
        match reader.read_event(&mut buffer) {
            Ok(Event::Start(ref e)) => {
                println!("{:?}", e.name());
            }
            Ok(Event::Eof) =>{ break},
            Err(e) => {panic!("Error at position {}: {:?}", reader.buffer_position(), e)},
            _ => ()
        };
    }
}
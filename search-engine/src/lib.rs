// mod bookmark;
// mod webpage;

// fn main() {
// }

mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, search-engine!");
}

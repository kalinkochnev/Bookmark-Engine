import App from './App.svelte';
import wasm from '../../search-engine/Cargo.toml';

const init = async () => {
    const module = await wasm();


    const app = new App({
        target: document.body,
        props: {
          // https://svelte.dev/docs#Creating_a_component
          greet: module.greet()
        }
    });

};

init();
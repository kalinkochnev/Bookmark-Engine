import commonjs from "@rollup/plugin-commonjs";
import { svelte } from '@sveltejs/vite-plugin-svelte';
import rust from "@wasm-tool/rollup-plugin-rust";
import { resolve } from 'path';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';
const production = !process.env.ROLLUP_WATCH;



function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
} 

// https://vitejs.dev/config/
export default [
  {
    input: 'src/main.js',
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        // we'll extract any component CSS out into
        // a separate file - better for performance
        // css: css => {
        //   css.write('public/build/bundle.css');
        // }
      }),

      rust({
        verbose: true,
        serverPath: "/build/"
      }),

      // // In dev mode, call `npm run start` once
      // // the bundle has been generated
      // !production && serve(),

      // // Watch the `public` directory and refresh the
      // // browser on changes when not in production
      // !production && livereload('public'),

      // // If we're building for production (npm run build
      // // instead of npm run dev), minify
      // production && terser()
    ]

  },
  {
    input: "src/background.js",
    output: {
      sourcemap: true,
      format: "iife",
      file: "public/build/background.js",
    },
    plugins: [resolve(), commonjs()],
    watch: {
      clearScreen: false,
    },
  },
];

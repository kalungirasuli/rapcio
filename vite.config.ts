import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'core-js/modules/web.dom-collections.iterator.js',
        'core-js/modules/es.array.reduce.js',
        'core-js/modules/es.string.ends-with.js',
        'core-js/modules/es.string.split.js',
        'core-js/modules/es.string.trim.js',
        'core-js/modules/es.array.index-of.js',
        'core-js/modules/es.string.includes.js',
        'core-js/modules/es.array.reverse.js',
        'core-js/modules/es.regexp.to-string.js',
        'core-js/modules/es.promise.js',
        'core-js/modules/es.string.replace.js',
        'core-js/modules/es.array.iterator.js',
        'core-js/modules/es.string.starts-with.js'
      ]
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['core-js']
  }
});

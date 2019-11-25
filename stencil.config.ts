import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'x-opera-tabs',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: ['./node_modules', '../../../node_modules']
    })
  ],
  copy: [{
    src: './sidebar-panel.html',
    dest: '../dist/sidebar-panel.html'
  }]
};

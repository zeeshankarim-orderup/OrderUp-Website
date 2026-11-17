'use client';

import { useEffect } from 'react';

/** Load the skill's original modules and mount moments after client navigation. */
export function HomeMotion() {
  useEffect(() => {
    let active = true;
    let release: (() => void) | undefined;
    const root = document.querySelector('.taste-home');
    const load = (path: string) => import(/* webpackIgnore: true */ /* turbopackIgnore: true */ path);
    void Promise.all([
      load('/assets/taste/motion/motion.js'),
      load('/assets/taste/moments/moments.js'),
    ]).then(([motion, moments]) => {
      if (!active) return;
      motion.refresh();
      root?.querySelectorAll('[data-moment]').forEach(el => void moments.mount(el));
      if (root) release = () => moments.unmountAll(root);
    }).catch(() => {
      // Both modules enhance server-rendered content; a load failure leaves it readable.
      document.documentElement.classList.add('m-enter-done', 'mo-safe');
    });
    return () => { active = false; release?.(); };
  }, []);
  return null;
}

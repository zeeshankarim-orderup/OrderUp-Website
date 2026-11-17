'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** The original taste modules enhance the document after each route transition. */
export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;
    const main = document.querySelector('main');
    const load = (path: string) => import(/* webpackIgnore: true */ /* turbopackIgnore: true */ path);
    void Promise.all([load('/assets/taste/motion/motion.js'), load('/assets/taste/moments/moments.js')]).then(([motion, moments]) => {
      if (!active) return;
      motion.refresh();
      if (!main) return;
      cleanup = () => moments.unmountAll(main);
      return moments.mountAll(main).then(() => { if (!active) cleanup?.(); });
    }).catch(() => document.documentElement.classList.add('m-enter-done', 'mo-safe'));
    return () => { active = false; cleanup?.(); };
  }, [pathname]);
  return null;
}

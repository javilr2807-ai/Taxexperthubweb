'use client';

import { useEffect } from 'react';

export function AdInjector() {
  useEffect(() => {
    try {
      // Find all ads that haven't been processed yet
      const ads = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])');
      if (ads.length > 0) {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        ads.forEach(() => {
          adsbygoogle.push({});
        });
      }
    } catch (e) {
      console.error('AdInjector error:', e);
    }
  }, []);

  return null;
}

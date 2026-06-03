'use client';

import { useEffect } from 'react';

type AdSenseProps = {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  layout?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export default function AdSense({
  slot,
  format = 'auto',
  layout,
  responsive = true,
  style = { display: 'block' },
  className = 'adsbygoogle',
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-wrapper my-8 overflow-hidden flex justify-center w-full" aria-hidden="true">
      <ins
        className={className}
        style={style}
        data-ad-client="ca-pub-6585145551277304"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}

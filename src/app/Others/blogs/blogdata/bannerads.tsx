import { useEffect, useRef } from 'react';

// Reusable Ad Component for React
const AdsterraBanner = ({ adKey }: { adKey: string }) => {
  const adContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainer.current && !adContainer.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      conf.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'js',
          'params' : {}
        };
      `;
      script.src = `//www.topcreativeformat.com/${adKey}/invoke.js`;
      adContainer.current.appendChild(conf);
      adContainer.current.appendChild(script);
    }
  }, [adKey]);

  return (
    <div className="my-8 flex flex-col items-center">
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Advertisement</span>
      <div ref={adContainer} className="min-h-[250px] w-full flex justify-center" />
    </div>
  );
};
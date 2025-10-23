
import React from 'react';

const MapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-11.5-3 3-3-3m6 0-3 3-3-3m0 0h6m-6 0H6m6 0a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
  </svg>
);

export default MapIcon;

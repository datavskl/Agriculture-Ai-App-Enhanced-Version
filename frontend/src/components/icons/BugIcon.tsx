
import React from 'react';

const BugIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.378 2.418c.24-.044.482-.044.724 0l5.132.933c.264.048.445.33.398.595l-1.29 5.056a1.838 1.838 0 0 1-.448 1.053 1.838 1.838 0 0 0 0 2.208c.165.25.3.525.4.815l1.35 4.501a.593.593 0 0 1-.595.748l-5.36-.766a1.838 1.838 0 0 0-1.685.233 1.838 1.838 0 0 0-1.686-.233l-5.36.766a.593.593 0 0 1-.595-.748l1.35-4.501c.1-.29.235-.566.4-.815a1.838 1.838 0 0 0 0-2.208 1.838 1.838 0 0 1-.448-1.053L5.85.948a.593.593 0 0 1 .398-.595l5.132-.933Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m-4.5-3.75h9" />
  </svg>
);

export default BugIcon;
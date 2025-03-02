// import { useRef } from 'react';

// const ToolTip = ({ children, tooltip }) => {
//   const tooltipRef = useRef(null);
//   const containerRef = useRef(null);

//   return (
//     <div
//       ref={containerRef}
//       className="relative inline-block"
//       onMouseEnter={({ clientX }) => {
//         if (!tooltipRef.current || !containerRef.current) return;
//         const { left } = containerRef.current.getBoundingClientRect();
//         tooltipRef.current.style.left = clientX - left + 'px';
//         tooltipRef.current.classList.remove('invisible');
//         tooltipRef.current.classList.add('visible', 'opacity-100');
//       }}
//       onMouseLeave={() => {
//         if (!tooltipRef.current) return;
//         tooltipRef.current.classList.add('invisible');
//         tooltipRef.current.classList.remove('visible', 'opacity-100');
//       }}
//     >
//       {children}
//       {tooltip && (
//         <span
//           ref={tooltipRef}
//           className="invisible opacity-0 transition bg-trasparent text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap"
//         >
//           {tooltip}
//         </span>
//       )}
//     </div>
//   );
// };

// export default ToolTip;

import { useRef } from 'react';

const ToolTip = ({ children, tooltip }) => {
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const { left } = containerRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + 'px';
        tooltipRef.current.classList.remove('invisible');
        tooltipRef.current.classList.add('visible', 'opacity-100');
      }}
      onMouseLeave={() => {
        if (!tooltipRef.current) return;
        tooltipRef.current.classList.add('invisible');
        tooltipRef.current.classList.remove('visible', 'opacity-100');
      }}
    >
      {children}
      {tooltip && (
        <span
          ref={tooltipRef}
          className="invisible opacity-0 transition-opacity duration-300 bg-primary text-black p-1 rounded absolute top-full mt-2 whitespace-nowrap z-50"
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default ToolTip;

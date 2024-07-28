// import React, { useState, useRef, useEffect } from 'react';

// interface DropdownProps {
//   options: string[];
//   onSelect: (option: string) => void;
//   placeholder?: string;
// }

// const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder = 'Select an option' }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleToggle = () => setIsOpen(!isOpen);

//   const handleSelect = (option: string) => {
//     setSelectedOption(option);
//     onSelect(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <div>
//         <button
//           type="button"
//           className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           id="options-menu"
//           aria-haspopup="true"
//           aria-expanded="true"
//           onClick={handleToggle}
//         >
//           {selectedOption || placeholder}
//           <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>

//       {isOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//             {options.map((option) => (
//               <button
//                 key={option}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 role="menuitem"
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  options: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick?: (value: string) => void;
  }>;
  toggleContent: ReactNode | (() => ReactNode);
  className?: string;
}

const Dropdown = ({ options, toggleContent, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [horizontalPosition, setHorizontalPosition] = useState<'left' | 'right'>('right');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current && contentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Vertical position
      if (dropdownRect.bottom + contentRect.height > windowHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }

      // Horizontal position
      if (dropdownRect.right + contentRect.width > windowWidth) {
        setHorizontalPosition('right');
      } else {
        setHorizontalPosition('left');
      }
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const renderToggleContent = () => {
    if (typeof toggleContent === 'function') {
      return toggleContent();
    }
    return toggleContent;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        // className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none ${className}`}
        onClick={handleToggle}
      >
        {renderToggleContent()}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute ${dropdownPosition === 'bottom' ? 'top-full' : 'bottom-full'} ${horizontalPosition === 'left' ? 'left-0' : 'right-0'} mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          style={{
            [dropdownPosition === 'bottom' ? 'marginTop' : 'marginBottom']: '0.5rem'
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <button
                key={index}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => {
                  option.onClick && option.onClick(option.label);
                  setIsOpen(false);
                }}
              >
                <span className="mr-3">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

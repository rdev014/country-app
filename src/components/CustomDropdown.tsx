import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  options: { name: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  icon,
  accentColor = 'cyan'
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-gray-900/40 border rounded-xl text-white font-medium
                   flex items-center justify-between
                   backdrop-blur-md transition-all duration-300
                   ${disabled 
                     ? 'opacity-50 cursor-not-allowed border-gray-600/50' 
                     : `border-${accentColor}-500/50 hover:border-${accentColor}-400 hover:bg-gray-800/50`
                   }`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={value ? 'text-white' : 'text-gray-400'}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-${accentColor}-400 transition-transform duration-300 
                     ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 
                      rounded-xl shadow-xl animate-dropdown">
          <div className="max-h-60 overflow-auto custom-scrollbar">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer transition-all duration-200
                          ${value === option.value 
                            ? `bg-${accentColor}-500/30 text-${accentColor}-400 backdrop-blur-lg` 
                            : 'text-gray-300 hover:bg-gray-800/50 hover:backdrop-blur-lg'
                          }`}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
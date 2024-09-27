import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import MatrixTextEffect from '../../animations/matrix';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  currentSection: string | null;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onClose, content, currentSection }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animatingSection, setAnimatingSection] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      if (currentSection !== animatingSection) {
        // Reset states for new animation
        setShowMatrix(false);
        setShowContent(false);
        
        gsap.fromTo(panelRef.current,
          { x: '-100%', opacity: 0 },
          { 
            x: '0%', 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.inOut",
            onComplete: () => {
              setShowMatrix(true);
              setAnimatingSection(currentSection);
            }
          }
        );
      }
    } else {
      setShowMatrix(false);
      setShowContent(false);
      setAnimatingSection(null);
    }
  }, [isOpen, currentSection]);

  const handleMatrixComplete = () => {
    setShowMatrix(false);
    setShowContent(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={panelRef}
      className="fixed top-0 left-0 w-1/3 h-full bg-black bg-opacity-90 shadow-lg z-50 flex flex-col"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white">
        <X size={24} />
      </button>
      {showMatrix && (
        <div className="flex-grow flex items-center justify-center">
          <MatrixTextEffect 
            text={typeof content === 'string' ? content : 'Welcome to my portfolio'} 
            onComplete={handleMatrixComplete} 
          />
        </div>
      )}
      <div 
        className={`flex-grow overflow-y-auto p-4 text-white ${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      >
        {content}
      </div>
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 5px; /* Width of the scrollbar */
          background: transparent; 
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #00ff00; 
          border-radius: 5px; /* Rounded edges for the scrollbar thumb */
          border: 2px solid transparent; 
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: #00cc00; /* Darker green when hovered */
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent; /* Background of the track */
          border-radius: 10px; /* Rounded edges for the track */
        }
      `}</style>
    </div>
  );
};

export default SidePanel;
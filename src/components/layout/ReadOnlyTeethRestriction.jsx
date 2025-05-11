import React from 'react';
import { useSelector } from 'react-redux';
import restrictMoveIcon from '../../assets/icons/Restrictmove.svg';
import Tooth21SVG from '../../assets/teeths/Teeth21.svg';

const ReadOnlyTeethRestriction = () => {
  // Get prescription data from Redux store
  const prescription = useSelector((state) => state.prescription);
  const selectedTeeth = prescription.selectedTeeth || [];
  
  // Generate tooth elements for the dental chart
  const generateToothElement = (toothId, number, position) => {
    const isSelected = selectedTeeth.includes(toothId);
    
    return (
      <div 
        className="relative flex flex-col items-center justify-center" 
        key={toothId}
      >
        <div className={`absolute ${position === "upper" ? "-top-6" : "-bottom-6"} text-xs font-medium text-gray-600`}>
          {number}
        </div>
        <div className={`w-10 h-14 ${isSelected ? 'relative' : ''}`}>
          <img 
            src={Tooth21SVG} 
            alt={`Tooth ${toothId}`}
            className={`w-full h-full object-contain ${isSelected ? 'opacity-40' : 'opacity-100'}`}
          />
          
          {isSelected && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
              <img src={restrictMoveIcon} alt="" className="w-full h-full" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Upper Arch */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <div className="text-sm font-medium text-gray-600">Right</div>
          <div className="text-sm font-medium text-gray-600">Left</div>
        </div>
        
        <div className="flex justify-center space-x-1 md:space-x-2 mb-2">
          {generateToothElement("18", "8┘", "upper")}
          {generateToothElement("17", "7┘", "upper")}
          {generateToothElement("16", "6┘", "upper")}
          {generateToothElement("15", "5┘", "upper")}
          {generateToothElement("14", "4┘", "upper")}
          {generateToothElement("13", "3┘", "upper")}
          {generateToothElement("12", "2┘", "upper")}
          {generateToothElement("11", "1┘", "upper")}
          <div className="border-r border-gray-300 border-dashed h-14 mx-1"></div>
          {generateToothElement("21", "└1", "upper")}
          {generateToothElement("22", "└2", "upper")}
          {generateToothElement("23", "└3", "upper")}
          {generateToothElement("24", "└4", "upper")}
          {generateToothElement("25", "└5", "upper")}
          {generateToothElement("26", "└6", "upper")}
          {generateToothElement("27", "└7", "upper")}
          {generateToothElement("28", "└8", "upper")}
        </div>
      </div>
      
      <div className="border-t border-gray-200 my-4"></div>
      
      {/* Lower Arch */}
      <div className="mt-6">
        <div className="flex justify-center space-x-1 md:space-x-2 mt-2">
          {generateToothElement("48", "8┐", "lower")}
          {generateToothElement("47", "7┐", "lower")}
          {generateToothElement("46", "6┐", "lower")}
          {generateToothElement("45", "5┐", "lower")}
          {generateToothElement("44", "4┐", "lower")}
          {generateToothElement("43", "3┐", "lower")}
          {generateToothElement("42", "2┐", "lower")}
          {generateToothElement("41", "1┐", "lower")}
          <div className="border-r border-gray-300 border-dashed h-14 mx-1"></div>
          {generateToothElement("31", "┌1", "lower")}
          {generateToothElement("32", "┌2", "lower")}
          {generateToothElement("33", "┌3", "lower")}
          {generateToothElement("34", "┌4", "lower")}
          {generateToothElement("35", "┌5", "lower")}
          {generateToothElement("36", "┌6", "lower")}
          {generateToothElement("37", "┌7", "lower")}
          {generateToothElement("38", "┌8", "lower")}
        </div>
      </div>
      
      {selectedTeeth.length > 0 && (
        <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
          <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 shadow-sm border border-gray-200">
            <img src={restrictMoveIcon} alt="" className="w-5 h-5 mr-2" />
            <span>Indicates teeth with movement restrictions</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyTeethRestriction;
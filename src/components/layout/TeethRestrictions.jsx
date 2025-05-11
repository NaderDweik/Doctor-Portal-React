import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedTooth, resetSelectedTeeth } from '../../redux/slices/prescriptionSlice';
import restrictMoveIcon from '../../assets/icons/Restrictmove.svg';
import Tooth21SVG from '../../assets/teeths/Teeth21.svg'; // Import the tooth SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

const TeethRestrictions = () => {
  const dispatch = useDispatch();
  const prescription = useSelector((state) => state.prescription);
  
  // Component state
  const [showTooltip, setShowTooltip] = useState(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showAllToothInfo, setShowAllToothInfo] = useState(false);
  
  // Tooth information for the tooltip
  const teethInfo = {
    // Molars
    '18': { name: 'Third Molar (Wisdom Tooth)', position: 'Upper Right', number: '8' },
    '17': { name: 'Second Molar', position: 'Upper Right', number: '7' },
    '16': { name: 'First Molar', position: 'Upper Right', number: '6' },
    '28': { name: 'Third Molar (Wisdom Tooth)', position: 'Upper Left', number: '8' },
    '27': { name: 'Second Molar', position: 'Upper Left', number: '7' },
    '26': { name: 'First Molar', position: 'Upper Left', number: '6' },
    '38': { name: 'Third Molar (Wisdom Tooth)', position: 'Lower Left', number: '8' },
    '37': { name: 'Second Molar', position: 'Lower Left', number: '7' },
    '36': { name: 'First Molar', position: 'Lower Left', number: '6' },
    '48': { name: 'Third Molar (Wisdom Tooth)', position: 'Lower Right', number: '8' },
    '47': { name: 'Second Molar', position: 'Lower Right', number: '7' },
    '46': { name: 'First Molar', position: 'Lower Right', number: '6' },
    
    // Premolars
    '15': { name: 'Second Premolar', position: 'Upper Right', number: '5' },
    '14': { name: 'First Premolar', position: 'Upper Right', number: '4' },
    '25': { name: 'Second Premolar', position: 'Upper Left', number: '5' },
    '24': { name: 'First Premolar', position: 'Upper Left', number: '4' },
    '35': { name: 'Second Premolar', position: 'Lower Left', number: '5' },
    '34': { name: 'First Premolar', position: 'Lower Left', number: '4' },
    '45': { name: 'Second Premolar', position: 'Lower Right', number: '5' },
    '44': { name: 'First Premolar', position: 'Lower Right', number: '4' },
    
    // Canines
    '13': { name: 'Canine', position: 'Upper Right', number: '3' },
    '23': { name: 'Canine', position: 'Upper Left', number: '3' },
    '33': { name: 'Canine', position: 'Lower Left', number: '3' },
    '43': { name: 'Canine', position: 'Lower Right', number: '3' },
    
    // Incisors
    '12': { name: 'Lateral Incisor', position: 'Upper Right', number: '2' },
    '11': { name: 'Central Incisor', position: 'Upper Right', number: '1' },
    '21': { name: 'Central Incisor', position: 'Upper Left', number: '1' },
    '22': { name: 'Lateral Incisor', position: 'Upper Left', number: '2' },
    '32': { name: 'Lateral Incisor', position: 'Lower Left', number: '2' },
    '31': { name: 'Central Incisor', position: 'Lower Left', number: '1' },
    '41': { name: 'Central Incisor', position: 'Lower Right', number: '1' },
    '42': { name: 'Lateral Incisor', position: 'Lower Right', number: '2' }
  };
  
  const handleResetTeethSelection = () => {
    dispatch(resetSelectedTeeth());
    setShowConfirmReset(false);
  };
  
  const handleToothClick = (toothId) => {
    dispatch(toggleSelectedTooth(toothId));
  };
  
  // Generate tooth elements for the dental chart
  const generateToothElement = (toothId, number, position) => {
    const isSelected = prescription.selectedTeeth && prescription.selectedTeeth.includes(toothId);
    const info = teethInfo[toothId];
    
    return (
      <div 
        className="relative flex flex-col items-center justify-center group" 
        key={toothId}
        onMouseEnter={() => showAllToothInfo ? setShowTooltip(toothId) : null}
        onMouseLeave={() => showAllToothInfo ? setShowTooltip(null) : null}
      >
        <div className={`absolute ${position === "upper" ? "-top-6" : "-bottom-6"} text-xs font-medium text-gray-600`}>
          {number}
        </div>
        <div 
          className={`w-10 h-14 cursor-pointer ${isSelected ? 'relative' : ''}`}
          onClick={() => handleToothClick(toothId)}
        >
          <img 
            src={Tooth21SVG} 
            alt={`Tooth ${toothId}`}
            className={`w-full h-full object-contain transition-opacity ${isSelected ? 'opacity-40' : 'opacity-100 hover:opacity-70'}`}
          />
          
          {isSelected && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
              <img src={restrictMoveIcon} alt="" className="w-full h-full" />
            </div>
          )}
        </div>
        
        {/* Tooth information tooltip */}
        {(showTooltip === toothId || (showAllToothInfo && isSelected)) && (
          <div className="absolute z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-xs">
            <p className="font-bold text-gray-800">{info.name}</p>
            <p className="text-gray-600">{info.position} #{info.number}</p>
            <p className="text-gray-600 mt-1">{isSelected ? 'Movement restricted' : 'No restrictions'}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700">Teeth movement restrictions<span className="text-gray-400 ml-2">(Optional)</span></h2>
      </div>
    
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-700">
          Click on any teeth that should <span className="font-semibold">not</span> be moved during treatment.
        </p>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAllToothInfo(!showAllToothInfo)}
            className="text-sm px-3 py-1 flex items-center text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            {showAllToothInfo ? 'Hide Tooth Details' : 'Show Tooth Details'}
          </button>
          
          {prescription.selectedTeeth && prescription.selectedTeeth.length > 0 && (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="text-sm px-3 py-1 flex items-center text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Reset Selection
            </button>
          )}
        </div>
      </div>
      
      {/* Dental Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* Selected teeth count */}
        <div className="absolute top-3 right-3 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
          {prescription.selectedTeeth ? prescription.selectedTeeth.length : 0} teeth restricted
        </div>
        
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
        
        <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
          <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 shadow-sm border border-gray-200">
            <img src={restrictMoveIcon} alt="" className="w-5 h-5 mr-2" />
            <span>Indicates teeth with movement restrictions</span>
          </div>
        </div>
      </div>
      
      {/* Legend for tooth information */}
      {showAllToothInfo && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
            <span className="font-semibold">1-2:</span> Incisors
          </div>
          <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
            <span className="font-semibold">3:</span> Canines
          </div>
          <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
            <span className="font-semibold">4-5:</span> Premolars
          </div>
          <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">
            <span className="font-semibold">6-8:</span> Molars
          </div>
        </div>
      )}
      
      {/* Reset confirmation modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Reset Teeth Selection?</h3>
            <p className="text-gray-600 mb-6">
              This will remove all teeth movement restrictions. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetTeethSelection}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeethRestrictions;
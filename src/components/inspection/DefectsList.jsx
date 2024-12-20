import { useState } from 'react';
import { defectsList } from '../../constants/defects';

function DefectsList({ view, language, defects, onDefectUpdate }) {
  const defectItems = defectsList[language];
  const [activeCell, setActiveCell] = useState(null);

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {defectItems.map((defect, index) => (
          <div
            key={index}
            className="relative p-4 border rounded-lg bg-white shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow"
            onClick={() => onDefectUpdate(index, (defects[index] || 0) + 1)}
            onMouseEnter={() => setActiveCell(index)}
            onMouseLeave={() => setActiveCell(null)}
          >
            {/* Notification-style counter */}
            {defects[index] > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                {defects[index]}
              </div>
            )}
            
            <div className="mb-2 text-sm">{defect}</div>
            
            {/* Control buttons only show on hover */}
            {activeCell === index && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDefectUpdate(index, Math.max(0, (defects[index] || 0) - 1));
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDefectUpdate(index, (defects[index] || 0) + 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {defectItems.map((defect, index) => (
        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-sm flex-grow">{defect}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDefectUpdate(index, Math.max(0, (defects[index] || 0) - 1))}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <input
              type="number"
              value={defects[index] || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value) || 0);
                onDefectUpdate(index, value);
              }}
              placeholder="0"
              className="w-16 text-center border rounded p-1"
            />
            <button
              onClick={() => onDefectUpdate(index, (defects[index] || 0) + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DefectsList;
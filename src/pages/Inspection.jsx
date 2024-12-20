import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/inspection/Header';
import ViewToggle from '../components/inspection/ViewToggle';
import DefectsList from '../components/inspection/DefectsList';
import CheckedQuantity from '../components/inspection/CheckedQuantity';
import PreviewModal from '../components/inspection/PreviewModal';

function Inspection({ savedState, onStateChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [language, setLanguage] = useState('english');
  const [defects, setDefects] = useState({});
  const [checkedQuantity, setCheckedQuantity] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [inspectionData, setInspectionData] = useState(null);

  // Load initial state
  useEffect(() => {
    if (savedState) {
      setDefects(savedState.defects || {});
      setCheckedQuantity(savedState.checkedQuantity || 0);
      setLanguage(savedState.language || 'english');
      setView(savedState.view || 'list');
      setInspectionData(savedState.inspectionData);
    } else if (location.state) {
      setInspectionData(location.state);
    } else {
      navigate('/details');
    }
  }, []);

  const handleSubmit = () => {
    // Clear the saved state
    if (onStateChange) {
      onStateChange(null);
    }
    // Navigate to details page
    navigate('/details');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Fixed header with inspection details */}
      <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <Header inspectionData={inspectionData} />
        </div>
      </div>

      {/* Fixed controls bar */}
      <div className="fixed top-32 left-0 right-0 bg-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center space-x-4">
          <ViewToggle
            view={view}
            onViewChange={setView}
            onLanguageChange={setLanguage}
          />
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32">
        <DefectsList
          view={view}
          language={language}
          defects={defects}
          onDefectUpdate={(index, value) => setDefects(prev => ({ ...prev, [index]: value }))}
        />
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between space-x-8">
            <div className="flex items-center space-x-8">
              <div>
                <span className="text-sm text-gray-600 mr-2">Total Defects:</span>
                <span className="font-bold">
                  {Object.values(defects).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Checked Qty:</span>
                <CheckedQuantity
                  value={checkedQuantity}
                  onChange={setCheckedQuantity}
                />
              </div>
              <div>
                <span className="text-sm text-gray-600 mr-2">Defect Rate:</span>
                <span className="font-bold">
                  {(checkedQuantity > 0
                    ? (Object.values(defects).reduce((sum, count) => sum + count, 0) / checkedQuantity) * 100
                    : 0
                  ).toFixed(2)}%
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        inspectionData={inspectionData}
        defects={defects}
        checkedQuantity={checkedQuantity}
        language={language}
      />
    </div>
  );
}

export default Inspection;
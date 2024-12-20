import { defectsList } from '../../../constants/defects';

function PreviewDefects({ defects, language }) {
  const defectItems = defectsList[language];
  const defectEntries = Object.entries(defects)
    .filter(([_, count]) => count > 0)
    .map(([index, count]) => ({
      name: defectItems[index],
      count,
    }));

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Defect Details</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Defect Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {defectEntries.map(({ name, count }, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  {name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PreviewDefects;
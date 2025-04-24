 const TableBody = ({ children, isEmpty, emptyMessage }) => {
    return (
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {isEmpty ? (
          <tr>
            <td colSpan={100} className="px-6 py-4 text-center text-sm text-gray-400">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    );
  };

  export default TableBody;
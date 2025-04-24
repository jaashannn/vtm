 const TableHead = ({ columns }) => {
    return (
      <thead className="bg-gray-700">
        <tr>
          {columns.map((column, index) => (
            <th 
              key={index}
              className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                index === 0 ? 'rounded-l-lg' : ''
              } ${
                index === columns.length - 1 ? 'rounded-r-lg' : ''
              }`}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  export default TableHead;
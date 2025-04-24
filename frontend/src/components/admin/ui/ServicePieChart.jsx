const ServicePieChart = ({ servicesData, clients }) => {
  return (
    <>
      <div className="h-64 flex items-center justify-center">
        <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-gray-700">
          {servicesData.map((service, index) => {
            const percentage = (service.count / clients.length) * 100;
            const rotation = servicesData
              .slice(0, index)
              .reduce((sum, s) => sum + (s.count / clients.length) * 360, 0);

            return (
              <div
                key={index}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${service.color} ${rotation}deg, ${service.color} ${
                    rotation + percentage * 3.6
                  }deg, transparent ${rotation + percentage * 3.6}deg)`,
                  clipPath: "circle(50% at 50% 50%)",
                }}
              ></div>
            );
          })}
          <div className="absolute w-32 h-32 rounded-full bg-gray-800"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="space-y-2">
          {servicesData.map((service, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${service.color} mr-2`}></div>
              <span>
                {service.name}: {service.count} clients (
                {Math.round((service.count / clients.length) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicePieChart;
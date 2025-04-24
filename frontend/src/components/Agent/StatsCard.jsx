// components/StatsCard.jsx
import { motion } from 'framer-motion';

export const StatsCard = ({ stat, index, variants }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white overflow-hidden shadow rounded-lg"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            {/* Icon would go here */}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {stat.change}
              </div>
            </dd>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
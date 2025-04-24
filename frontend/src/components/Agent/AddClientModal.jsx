// components/AddClientModal.jsx
import { motion } from 'framer-motion';
import Select from 'react-select';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Country code options (you can expand this list)
const countryCodeOptions = [
  { value: '+1', label: '+1 (US/Canada)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+91', label: '+91 (India)' },
  // Add more country codes as needed
];

// Country options (you can expand this list)
const countryOptions = [
  { name: 'United States', value: 'US' },
  { name: 'Canada', value: 'CA' },
  { name: 'United Kingdom', value: 'UK' },
  { name: 'India', value: 'IN' },
  // Add more countries as needed
];

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#3a3a5a',
    color: 'white',
    minHeight: '44px',
    borderRadius: '0.5rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3a3a5a'
    }
  }),
  input: (provided) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.4)'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2d2d4a',
    border: '1px solid #3a3a5a'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#00ff88' : state.isFocused ? '#3a3a5a' : 'transparent',
    color: state.isSelected ? 'black' : 'white',
    '&:hover': {
      backgroundColor: '#3a3a5a'
    }
  })
};

export const AddClientModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onFileChange, 
  onSubmit,
  onDocumentChange,
  onAddDocument,
  onRemoveDocument
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Client</h3>
              <div className="mt-2">
                <motion.form
                  onSubmit={onSubmit}
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                >
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 text-left">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Country Code & Phone Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 text-left">
                        Country Code
                      </label>
                      <Select
                        name="countryCode"
                        value={countryCodeOptions.find(
                          (option) => option.value === formData.countryCode
                        )}
                        onChange={(selectedOption) =>
                          onInputChange({
                            target: { name: "countryCode", value: selectedOption.value },
                          })
                        }
                        options={countryCodeOptions}
                        required
                        isSearchable
                        placeholder="Country Code"
                        styles={{
                          ...customStyles,
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: 'white',
                            borderColor: '#d1d5db',
                            color: '#111827',
                            '&:hover': {
                              borderColor: '#d1d5db'
                            }
                          }),
                          placeholder: (provided) => ({
                            ...provided,
                            color: '#6b7280'
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: '#111827'
                          })
                        }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 text-left">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 text-left">
                        Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 text-left">
                        Province/State
                      </label>
                      <input
                        type="text"
                        name="province"
                        id="province"
                        value={formData.province}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Country & Postal Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 text-left">
                        Country
                      </label>
                      <Select
                        name="country"
                        value={countryOptions.find(
                          (option) => option.name === formData.country
                        )}
                        onChange={(selectedOption) =>
                          onInputChange({
                            target: { name: "country", value: selectedOption.value },
                          })
                        }
                        options={countryOptions.map(({ name, value }) => ({
                          value: name,
                          label: name
                        }))}
                        required
                        placeholder="Select Country"
                        isSearchable
                        styles={{
                          ...customStyles,
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: 'white',
                            borderColor: '#d1d5db',
                            color: '#111827',
                            '&:hover': {
                              borderColor: '#d1d5db'
                            }
                          }),
                          placeholder: (provided) => ({
                            ...provided,
                            color: '#6b7280'
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: '#111827'
                          })
                        }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 text-left">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Company Size & Industry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 text-left">
                        Company Size
                      </label>
                      <input
                        type="text"
                        name="companySize"
                        id="companySize"
                        value={formData.companySize}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 text-left">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        id="industry"
                        value={formData.industry.label}
                        onChange={(e) => onInputChange({
                          target: { 
                            name: "industry", 
                            value: { value: e.target.value.toLowerCase().replace(/\s+/g, '-'), label: e.target.value }
                          }
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Marketing Goals */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="marketingGoals" className="block text-sm font-medium text-gray-700 text-left">
                      Marketing Goals
                    </label>
                    <textarea
                      name="marketingGoals"
                      id="marketingGoals"
                      value={formData.marketingGoals}
                      onChange={onInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows={3}
                      required
                    />
                  </motion.div>

                  {/* Verified ID Documents */}
                  <motion.div variants={itemVariants} className="text-sm text-gray-500">
                    Upload 2 IDs or Driving Licence + Valid Passport or other documents with picture
                  </motion.div>

                  {formData.verifiedIdDocuments?.map((document, index) => (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                      key={index}
                      variants={itemVariants}
                    >
                      <div>
                        <label htmlFor={`docName-${index}`} className="block text-sm font-medium text-gray-700 text-left">
                          Document Name
                        </label>
                        <input
                          type="text"
                          name="docName"
                          id={`docName-${index}`}
                          value={document.docName}
                          onChange={(e) => onDocumentChange(index, e)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`verification-file-upload-${index}`}
                          className="block mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center cursor-pointer"
                        >
                          {document.docPath ? document.docPath.name : "Select PDF Document"}
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          id={`verification-file-upload-${index}`}
                          name="docPath"
                          accept="application/pdf"
                          onChange={(e) => onDocumentChange(index, e)}
                          required
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => onRemoveDocument(index)}
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Remove Document
                        </button>
                      )}
                    </motion.div>
                  ))}

                  <motion.button
                    type="button"
                    onClick={onAddDocument}
                    className="mb-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    variants={itemVariants}
                  >
                    ➕ Add More Documents
                  </motion.button>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-left">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Company Logo */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 text-left">
                      Company Logo
                    </label>
                    <input
                      type="file"
                      name="companyLogo"
                      id="companyLogo"
                      onChange={onFileChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </motion.div>

                  {/* Form Actions */}
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <motion.button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register Client
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
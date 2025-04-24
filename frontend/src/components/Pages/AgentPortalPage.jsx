// pages/AgentPortalPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar } from '../Agent/Navbar';
import { StatsCard } from '../Agent/StatsCard';
import { ClientsTable } from '../Agent/ClientsTable';
import { AddClientModal } from '../Agent/AddClientModal';

const AgentPortalPage = () => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clientFormData, setClientFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyCountry: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    companySize: '',
    industry: { value: '', label: '' },
    marketingGoals: '',
    password: '',
    confirmPassword: '',
    companyLogo: null,
    verifiedIdDocuments: [
      { docName: '', docPath: null } // Initial document
    ],
    countryCode: '+1', // Default country code
    city: '',
    province: ''
  });

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      serviceType: 'Premium',
      status: 'Active',
      joiningDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Globex Inc',
      serviceType: 'Standard',
      status: 'Active',
      joiningDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Soylent Corp',
      serviceType: 'Basic',
      status: 'Inactive',
      joiningDate: '2023-03-10'
    }
  ]);

  const userData = {
    name: 'John Agent',
    email: 'john.agent@example.com',
    role: 'Senior Agent'
  };

  const stats = [
    { title: 'Total Clients', value: 42, change: '+12%' },
    { title: 'Commission Earned', value: '$8,540', change: '+5%' },
    { title: 'Active Subscriptions', value: 36, change: '+3%' },
    { title: 'Canceled Subscriptions', value: 6, change: '-2%' }
  ];

  const handleDeleteClient = (id) => {
    try {
      setClients(clients.filter(client => client.id !== id));
      toast.success('Client deleted successfully');
    } catch (error) {
      toast.error('Failed to delete client');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setClientFormData(prev => ({
      ...prev,
      companyLogo: e.target.files[0]
    }));
  };

  // Document management functions
  const handleAddDocument = () => {
    setClientFormData(prev => ({
      ...prev,
      verifiedIdDocuments: [
        ...prev.verifiedIdDocuments,
        { docName: '', docPath: null }
      ]
    }));
  };

  const handleDocumentChange = (index, e) => {
    const { name, files } = e.target;
    const updatedDocuments = [...clientFormData.verifiedIdDocuments];
    
    if (name === 'docPath') {
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        docPath: files[0]
      };
    } else {
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        [name]: e.target.value
      };
    }

    setClientFormData(prev => ({
      ...prev,
      verifiedIdDocuments: updatedDocuments
    }));
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = [...clientFormData.verifiedIdDocuments];
    updatedDocuments.splice(index, 1);
    
    setClientFormData(prev => ({
      ...prev,
      verifiedIdDocuments: updatedDocuments
    }));
  };

  const registerMasterClient = async () => {
    // Validate all required fields
    const requiredFields = [
      'companyName', 'companyAddress', 'companyCountry', 'postalCode',
      'email', 'phoneNumber', 'companySize', 'city', 'province'
    ];
    
    for (const field of requiredFields) {
      if (!clientFormData[field]?.trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!clientFormData.industry?.value?.trim()) {
      toast.error('Please select an industry');
      return false;
    }

    if (!clientFormData.marketingGoals.trim()) {
      toast.error('Please enter marketing goals');
      return false;
    }

    // Validate documents
    if (clientFormData.verifiedIdDocuments.length < 2) {
      toast.error('Please upload at least 2 ID documents');
      return false;
    }

    for (const doc of clientFormData.verifiedIdDocuments) {
      if (!doc.docName.trim() || !doc.docPath) {
        toast.error('Please complete all document fields');
        return false;
      }
    }

    if (clientFormData.password !== clientFormData.confirmPassword) {
      toast.error('Password and Confirm Password should be the same');
      return false;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient = {
        id: clients.length + 1,
        name: clientFormData.companyName,
        serviceType: 'Standard',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0],
        documents: clientFormData.verifiedIdDocuments.length
      };
      
      setClients([...clients, newClient]);
      setIsAddClientOpen(false);
      toast.success('Client registered successfully!');
      
      // Reset form
      setClientFormData({
        companyName: '',
        companyAddress: '',
        companyCountry: '',
        postalCode: '',
        email: '',
        phoneNumber: '',
        companySize: '',
        industry: { value: '', label: '' },
        marketingGoals: '',
        password: '',
        confirmPassword: '',
        companyLogo: null,
        verifiedIdDocuments: [{ docName: '', docPath: null }],
        countryCode: '+1',
        city: '',
        province: ''
      });
      
      return true;
    } catch (error) {
      toast.error('Failed to register client');
      return false;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <Navbar userData={userData} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard 
              key={stat.title}
              stat={stat}
              index={index}
              variants={cardVariants}
            />
          ))}
        </div>
      </div>
      
      <ClientsTable 
        clients={clients}
        onAddClient={() => setIsAddClientOpen(true)}
        onDeleteClient={handleDeleteClient}
      />
      
      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        formData={clientFormData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={registerMasterClient}
        onAddDocument={handleAddDocument}
        onDocumentChange={handleDocumentChange}
        onRemoveDocument={handleRemoveDocument}
      />
    </div>
  );
};

export default AgentPortalPage;
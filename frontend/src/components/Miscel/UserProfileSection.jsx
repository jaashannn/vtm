import React from 'react';
import { motion } from 'framer-motion';

const UserProfileSection = () => {
  return (
    <motion.section 
      className="user-profile-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <div className="profile-info">
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-role">Agent | Verified</p>
        </div>
      </div>
      <div className="personal-info">
        <h3>Personal Information</h3>
        <p>Email: john.doe@example.com (Verified)</p>
        <p>Phone: +123456789 (Not Verified)</p>
        <p>Country: USA</p>
        <p>Address: 1234 Elm Street</p>
        <p>City: New York</p>
        <p>Province: NY</p>
        <p>Postal Code: 10001</p>
      </div>
      <div className="bank-info">
        <h3>Bank Account Details</h3>
        <p>Bank Name: Example Bank</p>
        <p>IFSC Code: EXAMP1234</p>
        <p>Account Holder: John Doe</p>
      </div>
      <div className="documents">
        <h3>Verified ID Documents</h3>
        <p>Document 1 (Verified)</p>
        <p>Document 2 (Pending)</p>
        <button className="upload-button">Upload New Document</button>
      </div>
      <div className="additional-info">
        <h3>Additional Information</h3>
        <p>SIN Number: ***-**-****</p>
      </div>
      <div className="action-buttons">
        <button className="edit-button">Edit Profile</button>
        <button className="password-button">Change Password</button>
        <button className="logout-button">Logout</button>
      </div>
    </motion.section>
  );
};

export default UserProfileSection;

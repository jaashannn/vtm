import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const StoreController = createContext({});

export const StoreFunction = () => {
  return useContext(StoreController);
};

const StoreContext = (props) => {
  // signup required states
  const [apiUrl, setApiUrl] = useState("http://localhost:5000/api/");
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Canada");
  const [userId, setUserId] = useState("");
  const [stripeCustomerId, setStripeCustomerId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [agentFormData, setAgentFormData] = useState({
    name: "", // Corresponds to userSchema.name
    email: "",
    phoneNumber: "",
    country: country, // userSchema.country
    address: "", // userSchema.address
    city: "", // userSchema.city
    province: "", // userSchema.province
    postalCode: "", // userSchema.postalCode
    sinNumber: "", // userSchema.sinNumber
    bankName: "", // userSchema.bankAccountDetails.bankName
    ifscCode: "", // userSchema.bankAccountDetails.ifscCode
    accountHolderName: "",
    verifiedIdDocuments: [],
    countryCode: "+1", //done
    password: "",
    confirmPassword: "",
  });
  const [userList, setUserList] = useState([]); // This state belongs to the list of users fetched for admin or agents
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("clients");
  const [clientFormData, setClientFormData] = useState({
    companyName: "",
    companyLogo: null, // Updated to handle file input
    companyAddress: "",
    companyCountry: country,
    postalCode: "",
    phoneNumber: "",
    email: "",
    companySize: "",
    password: "",
    confirmPassword: "",
    industry: "", // Industry is handled by CreatableSelect
    marketingGoals: "",
  });
  // Subscription states
  const [option, setOption] = useState(null);
  const [clientPaymentData, setClientPaymentData] = useState({
    package: "price_1QxEciSEYHxd3PYrb2nQUthG",
    paymentMode: "",
    cardNumber: "",
    cardHolderName: "",
    cardExpDate: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  // UI States
  const [activeSignup, setActiveSignup] = useState("Registration");
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // api functions
  const getTokenAndRole = () => {
    const authData = Cookies.get("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setToken(parsedAuthData.token);
      setUserRole(parsedAuthData.role);
      setUserId(parsedAuthData.userId);
      setName(parsedAuthData.userName);
    } else {
      Cookies.remove("authData");
    }
  };
  // Sign up agent
  const registerAgent = async (e) => {
    e.preventDefault();
    if (
      !agentFormData.name.trim() ||
      !agentFormData.email.trim() ||
      !agentFormData.phoneNumber.trim() ||
      !agentFormData.address.trim() ||
      !agentFormData.city.trim() ||
      !agentFormData.province.trim() ||
      !agentFormData.postalCode.trim() ||
      !agentFormData.sinNumber.trim() ||
      !agentFormData.bankName.trim() ||
      !agentFormData.ifscCode.trim() ||
      !agentFormData.accountHolderName.trim() ||
      !agentFormData.password.trim() ||
      !agentFormData.confirmPassword.trim()
    ) {
      alert("All fields are required.");
      return;
    }
    if (agentFormData.password !== agentFormData.confirmPassword) {
      alert("Password and Confirm Password should be the same.");
      return false;
    }
    const formDataToSend = new FormData();

    for (const key in agentFormData) {
      if (agentFormData.hasOwnProperty(key)) {
        const value = agentFormData[key];

        if (key === "verifiedIdDocuments") {
          // Handle File(s) here.

          if (Array.isArray(value) && value.length > 0) {
            value.forEach((doc, index) => {
              if (doc.docPath instanceof File) {
                formDataToSend.append("pdfFiles", doc.docPath);
              }
            });
            const documentsToSend = value.map((doc) => ({
              docName: doc.docName,
              docPath: doc.docPath.name, // Use only the file name as a placeholder
            }));
            formDataToSend.append(
              "verifiedIdDocuments",
              JSON.stringify(documentsToSend)
            );
          } else {
            alert("Please select at least one PDF file (max 5MB).");
            return;
          }
        } else if (key === "countryCode" || key === "phoneNumber") {
          // Skip countryCode and phoneNumber here; will handle below
          continue; // IMPORTANT: Use continue, not return
        } else if (key === "bankName") {
          formDataToSend.append("bankName", value);
        } else if (key === "ifscCode") {
          formDataToSend.append("bankIfsc", value.toUpperCase());
        } else if (key === "accountHolderName") {
          formDataToSend.append("bankAccountHolderName", value);
        } else {
          formDataToSend.append(key, value);
        }
      }
    }
    // Construct phone number outside of `for` loop.
    const phoneNumber = `${agentFormData.countryCode}${agentFormData.phoneNumber}`;

    formDataToSend.append("phoneNumber", phoneNumber);

    // Log FormData (for debugging)
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(`${apiUrl}user/register/agent`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("User Registered Successfully");
        console.log("Success:", data);
      } else {
        alert(data.message || "Failed to register");
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error. Please try again later.");
    }
  };
  // Register client by agnet
  const registerClientByAgent = async () => {
    if (
      !clientFormData.companyName.trim() ||
      !clientFormData.companyAddress.trim() ||
      !clientFormData.companyCountry.trim() ||
      !clientFormData.postalCode.trim() ||
      !clientFormData.email.trim() ||
      !clientFormData.phoneNumber.trim() ||
      !clientFormData.companySize.trim() ||
      !clientFormData.industry?.value?.trim() ||
      !clientFormData.marketingGoals.trim()
    ) {
      alert("All fields are required.");
      return false;
    }

    const formDataToSend = new FormData();
    for (const key in clientFormData) {
      if (clientFormData.hasOwnProperty(key)) {
        const value = clientFormData[key];
        if (key === "companyLogo") {
          // Check if the value is a valid image file before appending
          if (value instanceof File) {
            formDataToSend.append("imageFile", value);
          }
        } else if (
          key === "industry" &&
          typeof value === "object" &&
          value.value
        ) {
          // Handle the industry object correctly
          formDataToSend.append("industryOfCompanyOperation", value.value);
        } else if (key === "companySize") {
          formDataToSend.append("companyBusinessModelType", value);
        } else if (key === "marketingGoals") {
          formDataToSend.append("resultRequireForDigitalMarketing", value);
        } else {
          formDataToSend.append(key, value);
        }
      }
    }
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await fetch(`${apiUrl}user/agent/create/client`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // Sign up client by self
  const registerMasterClient = async () => {
    if (
      !clientFormData.companyName.trim() ||
      !clientFormData.companyAddress.trim() ||
      !clientFormData.companyCountry.trim() ||
      !clientFormData.postalCode.trim() ||
      !clientFormData.email.trim() ||
      !clientFormData.phoneNumber.trim() ||
      !clientFormData.companySize.trim() ||
      !clientFormData.industry?.value?.trim() ||
      !clientFormData.marketingGoals.trim()
    ) {
      alert("All fields are required.");
      return false;
    }
    if (clientFormData.password !== clientFormData.confirmPassword) {
      alert("Password and Confirm Password should be the same.");
      return false;
    }
    const formDataToSend = new FormData();
    for (const key in clientFormData) {
      if (clientFormData.hasOwnProperty(key)) {
        const value = clientFormData[key];
        if (key === "companyLogo") {
          // Check if the value is a valid image file before appending
          if (value instanceof File) {
            formDataToSend.append("imageFile", value);
          }
        } else if (
          key === "industry" &&
          typeof value === "object" &&
          value.value
        ) {
          // Handle the industry object correctly
          formDataToSend.append("industryOfCompanyOperation", value.value);
        } else if (key === "companySize") {
          formDataToSend.append("companyBusinessModelType", value);
        } else if (key === "marketingGoals") {
          formDataToSend.append("resultRequireForDigitalMarketing", value);
        } else {
          formDataToSend.append(key, value);
        }
      }
    }
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await fetch(`${apiUrl}user/register/masterclient`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // Create payment intent while choosing plan
  const createPaymentIntent = async (
    amount,
    currency,
    customerId,
    packageId,
    email
  ) => {
    try {
      const response = await fetch(`${apiUrl}payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          customerId,
          packageId,
          email,
        }),
      });

      return response;
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  // Get packages from stripe account
  const getPackages = async () => {
    try {
      const response = await fetch(`${apiUrl}packages`);
      const data = await response.json();
      if (data.success) {
        setPackages(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Login user
  const loginUser = async () => {
    try {
      const response = await fetch(`${apiUrl}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include", // Important for sending/receiving cookies
      });

      return response;
    } catch (error) {
      console.error("Server Error:", error);
      alert("An error occurred while logging in.");
    }
  };
  // get users dynamically (Agent or Client) for admin
  const getAllUsers = async (searchQuery) => {
    try {
      const response = await fetch(
        `${apiUrl}user/admin/${searchType}${
          searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming JWT authentication
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // Verify agent by admin
  const verifyAgent = async (agentid) => {
    try {
      const response = await fetch(`${apiUrl}user/admin/verify/${agentid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Verified");
      } else {
        alert("not verified");
      }
    } catch (error) {
      console.error("Error verifying agent:", error.message);
      alert(`Failed to verify agent: ${error.message}`);
    }
  };

  // Get clients for agents
  const getAllClientsForAgent = async () => {
    try {
      const response = await fetch(
        `${apiUrl}user/agent/clients${
          searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming JWT authentication
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const sendOtp = async () => {
    try {
    } catch (error) {}
  };
  const verifyOtp = async () => {
    try {
    } catch (error) {}
  };
  const addCard = async () => {
    try {
    } catch (error) {}
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(`${apiUrl}user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
        },
        credentials: "include", // Important for sending/receiving cookies
      });
      const data = await response.json();
      setToken(null);
      setUserId(null);
      setUserRole(null);
      setName(null);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const functionObject = {
    apiUrl,
    email,
    setEmail,
    name,
    setName,
    phoneNumber,
    country,
    setCountry,
    setPhoneNumber,
    activeSignup,
    setActiveSignup,
    agentFormData,
    setAgentFormData,
    clientFormData,
    setClientFormData,
    clientPaymentData,
    setClientPaymentData,
    registerAgent,
    registerMasterClient,
    registerClientByAgent,
    clientSecret,
    setClientSecret,
    packages,
    setPackages,
    getPackages,
    getAllClientsForAgent,
    option,
    setOption,
    createPaymentIntent,
    stripeCustomerId,
    setStripeCustomerId,
    selectedPackage,
    setSelectedPackage,
    userId,
    setUserId,
    isLoading,
    setIsLoading,
    userRole,
    setUserRole,
    name,
    setName,
    password,
    setPassword,
    loginUser,
    getTokenAndRole,
    token,
    setToken,
    getAllUsers,
    userList,
    setUserList,
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    verifyAgent,
    logoutUser,
  };
  return (
    <StoreController.Provider value={functionObject}>
      {props.children}
    </StoreController.Provider>
  );
};

export default StoreContext;

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ContactSection from "./components/Contact/ContactSection.jsx";
import Footer from "./components/Helper/Footer.jsx";
import Header from "./components/Helper/Header.jsx";
import ServicePage from "./components/Pages/ServicePage.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import AboutPage from "./components/Pages/AboutPage.jsx";
import TermsAndConditions from "./components/Miscel/TermsAndConditions.jsx";
import PrivacyAndPolicy from "./components/Miscel/PrivacyAndPolicy.jsx";
import ContactPage from "./components/Contact/ContactPage.jsx";
import OurValuesSection from "./components/Miscel/OurValuesSection.jsx";
import RegistrationPage from "./components/Pages/RegistrationPage.jsx";
import LoginPage from "./components/Pages/LoginPage.jsx";
import AgentPortalPage from "./components/pages/AgentPortalPage.jsx";
import PaymentParentComponent from "./components/Payment/PaymentParentComponent.jsx";
import Packages from "./components/Miscel/Packages.jsx";
import { useEffect } from "react";
import { StoreFunction } from "./Store/store.jsx";
import AdminPortalPage from "./components/Pages/AdminPortalPage.jsx";
import BackToTopButton from "./BackToTop.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userId,
    token,
    clientSecret,
    isLoading,
    userRole,
    name,
    getTokenAndRole,
  } = StoreFunction();

  useEffect(() => {
    if (!token) {
      // Non-registered user: Restrict access to authenticated routes
      const nonAuthRoutes = [
        "/",
        "/about",
        "/service",
        "/contact",
        "/our-values",
        "/register",
        "/login",
      ];

      if (!nonAuthRoutes.includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    } else {
      const roleBasedRoutes = {
        admin: ["/admin", "/admin/dashboard", "/admin/settings"],
        agent: ["/agent", "/agent/orders", "/agent/profile"],
        masterclient: [
          "/master-client",
          "/master-client-overview",
          "/master-client/account",
        ],
      };
      // Redirect to the appropriate dashboard if accessing public routes while logged in
      const publicRoutes = [
        "/",
        "/about",
        "/service",
        "/contact",
        "/our-values",
        "/register",
        "/login",
      ];
      if (publicRoutes.includes(location.pathname)) {
        if (userRole === "admin") {
          navigate("/admin", { replace: true });
        } else if (userRole === "agent") {
          navigate("/agent", { replace: true });
        } else if (userRole === "masterclient") {
          navigate("/master-client", { replace: true });
        }
      }

      // Check if the user is trying to access an unauthorized route
      const allowedRoutes = roleBasedRoutes[userRole] || [];
      if (!allowedRoutes.includes(location.pathname)) {
        navigate(allowedRoutes[0] || "/", { replace: true });
      }
    }
  }, [userId, token, clientSecret, isLoading]);

  console.log(token, userRole, userId, name);

  useEffect(() => {
    getTokenAndRole();
  }, []);

  return (
    <>
      <main>
        {/* Show Header on all pages except /agent */}
        {location.pathname !== "/agent" && location.pathname!== "/admin" && <Header />}
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/our-values" element={<OurValuesSection />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacyandpolicy" element={<PrivacyAndPolicy />} />
          <Route path="/payment" element={<PaymentParentComponent />} />
          <Route path="/admin" element={<AdminPortalPage />} />
          <Route path="/agent" element={<AgentPortalPage />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
        
        {/* Show ContactSection on all pages except /contact and /agent */}
        {location.pathname !== "/contact" && location.pathname !== "/agent" && location.pathname !== "/admin" && <ContactSection />}
        {location.pathname !== "/agent" && location.pathname !== "/admin" && <Footer />}

        <BackToTopButton />
      </main>
    </>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Solutions } from "./components/Solutions";
import { Footer } from "./components/Footer";
import { AboutNozomi } from "./components/AboutNozomi";
import ServicesPage from "./components/ServicesPage";
import { ScrollToTop } from "./components/ScrollToTop";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Solutions />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutNozomi />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

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
import { AuthProvider } from "./lib/auth";
import { NewsPage } from "./components/NewsPage";
import { NewsDetailPage } from "./components/NewsDetailPage";
import { NewsEditor } from "./components/NewsEditor";

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
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutNozomi />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/admin/news/new" element={<NewsEditor />} />
            <Route path="/admin/news/edit/:id" element={<NewsEditor />} />
          </Routes>
          <Footer />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

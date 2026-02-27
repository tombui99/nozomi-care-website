import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Solutions } from "./components/Solutions";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Layout>
      <Header />
      <Hero />
      <Services />
      <Solutions />
      <Footer />
    </Layout>
  );
}

export default App;

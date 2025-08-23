import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
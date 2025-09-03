import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
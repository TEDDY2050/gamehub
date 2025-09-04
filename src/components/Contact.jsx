function Contact() {
  return (
    <section id="contact" className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-6">
        Have questions or feedback? We’d love to hear from you.
      </p>
      <form className="max-w-md mx-auto grid gap-4">
        <input type="text" placeholder="Your Name" className="p-3 border rounded" />
        <input type="email" placeholder="Your Email" className="p-3 border rounded" />
        <textarea placeholder="Your Message" rows="4" className="p-3 border rounded"></textarea>
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;

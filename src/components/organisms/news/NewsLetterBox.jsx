export default function NewsletterBox() {
  return (
    <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Berlangganan Newsletter</h2>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        Dapatkan berita terbaru dan informasi penting langsung di email Anda
      </p>
      <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
        <input
          type="email"
          placeholder="Masukkan email Anda"
          className="flex-1 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200">
          Berlangganan
        </button>
       </div>
    </div>
  );
}

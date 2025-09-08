import Image from "next/image";
import NavbarView from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";

export default function Contact() {
  const contactInfo = [
    {
      icon: "/images/location.png",
      title: "Alamat",
      content: "Jalan Alianyang Gg. Rahayu Ruko No. 21\nSungai bangkong, Kalimantan Barat 78116",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: "/images/phone.png", // Add phone icon
      title: "Telepon",
      content: "+6282335424547",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "/images/email.png", // Add email icon
      title: "Email",
      content: "info@perkindo-kalbar.org\ncontact@perkindo-kalbar.org",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const socialMedia = [
    {
      name: "Instagram",
      icon: "/images/instagram.png",
      url: "https://www.instagram.com/perkindo_kalbar",
      color: "bg-gradient-to-br from-pink-500 to-orange-500",
      hoverColor: "hover:from-pink-600 hover:to-orange-600"
    },
    {
      name: "LinkedIn",
      icon: "/images/linkedin.png",
      url: "https://www.linkedin.com/company/perkindo-kalbar",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      name: "Facebook",
      icon: "/images/facebook.png",
      url: "https://www.facebook.com/perkindo.kalbar",
      color: "bg-gradient-to-br from-blue-600 to-indigo-600",
      hoverColor: "hover:from-blue-700 hover:to-indigo-700"
    },
    {
      name: "WhatsApp",
      icon: "/images/whatsapp.jpg", // Add WhatsApp icon
      url: "https://wa.me/082335424547",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    }
  ];

  return (
    <>
      <NavbarView />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Hubungi Kami
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Perkindo Kalimantan Barat siap melayani dan bekerja sama dengan Anda
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Lokasi Kami
                </h2>
                <p className="text-blue-100 mt-2">Temukan kantor Perkindo Kalimantan Barat</p>
              </div>
              
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31696.412126017214!2d109.3179788!3d-0.0356717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59c7a8887ff9%3A0xf88e4395eab99277!2sKalimantan%20Barat!5e0!3m2!1sen!2sid!4v1614108402997!5m2!1sen!2sid"
                  width="100%"
                  height="400"
                  allowFullScreen={true}
                  loading="lazy"
                  className="border-0"
                ></iframe>
                
                {/* Map Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <p className="text-sm font-semibold text-slate-800">📍 Sungai Bangkong</p>
                  <p className="text-xs text-slate-600">Kalimantan Barat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-1 bg-gradient-to-r ${info.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Image
                        src={info.icon}
                        alt={info.title}
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 mb-2">{info.title}</h3>
                      <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Social Media */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ikuti Media Sosial Kami</h2>
              <p className="text-slate-600">Dapatkan update terbaru dari Perkindo Kalbar</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} ${social.hoverColor} p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={24}
                        height={24}
                        className="filter brightness-0 invert"
                      />
                    </div>
                    <span className="font-medium">{social.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Kirim Pesan</h2>
              <p className="text-slate-600">Hubungi kami untuk informasi lebih lanjut</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subjek</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Jam Operasional</h2>
            <p className="text-slate-300">Waktu terbaik untuk menghubungi kami</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Senin - Jumat</h3>
              <p className="text-slate-300">09:00 - 17:00 WIB</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Sabtu</h3>
              <p className="text-slate-300">09:00 - 14:00 WIB</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Minggu</h3>
              <p className="text-slate-300">Tutup</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Darurat</h3>
              <p className="text-slate-300">24/7 Online</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
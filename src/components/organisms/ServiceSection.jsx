import ServiceCard from "../molecules/ServiceCard";
// import { ServiceIcon } from "../atoms/icons/ServiceIcon";
import { ServiceIcon } from "../atoms/ServiceIcon";

export default function ServicesSection() {
  const services = [
    "Melayani penerimaan anggota baru...",
    "Melayani dan melakukan pelatihan...",
    "Melayani Pembuatan Sertifikat (SBU, SKK)...",
    "Melayani pembentukan TUK...",
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
            <ServiceIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Pelayanan <br />
            <span className="text-blue-600">Persatuan Konsultan Indonesia</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} title={`Layanan ${i + 1}`} desc={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

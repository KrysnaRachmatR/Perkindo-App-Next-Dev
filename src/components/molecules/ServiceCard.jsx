// import { CheckIcon } from "../atoms/icons/CheckIcon";
import { CheckIcon } from "../atoms/CheckIcon";

export default function ServiceCard({ title, desc }) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <CheckIcon />
        </div>
        <div>
          <div className="text-sm font-medium text-blue-600 mb-2">{title}</div>
          <p className="text-gray-700 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

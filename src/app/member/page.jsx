"use client";

import React, { useState } from 'react';
import { Search, Building2, MapPin, User, Calendar, Filter, Eye, ChevronRight } from 'lucide-react';
import NavbarView from '@/components/organisms/navbar/navbar';
import Footer from '@/components/organisms/footer/footer';

const MemberTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  // Data dummy anggota
  const members = [
    {
      id: 1,
      companyName: "PT Bangun Sejahtera",
      director: "Budi Santoso",
      responsible: "Ahmad Rahman",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      joinDate: "2023-01-15",
      status: "active",
      sbu: [
        { code: "RK001", name: "Konstruksi Gedung Bertingkat", grade: "Menengah" },
        { code: "RK002", name: "Konstruksi Jalan dan Jembatan", grade: "Besar" },
        { code: "RK003", name: "Konstruksi Drainase dan Irigasi", grade: "Kecil" }
      ]
    },
    {
      id: 2,
      companyName: "CV Karya Mandiri",
      director: "Siti Nurhaliza",
      responsible: "Dedi Setiawan",
      address: "Jl. Gatot Subroto No. 456, Bandung",
      joinDate: "2023-03-22",
      status: "active",
      sbu: [
        { code: "RK001", name: "Konstruksi Perumahan Modern", grade: "Menengah" },
        { code: "RK002", name: "Konstruksi Infrastruktur Dasar", grade: "Kecil" },
        { code: "RK003", name: "Konstruksi Fasilitas Umum", grade: "Menengah" }
      ]
    },
    {
      id: 3,
      companyName: "PT Mega Construction",
      director: "Andi Wijaya",
      responsible: "Lisa Permata",
      address: "Jl. Diponegoro No. 789, Surabaya",
      joinDate: "2022-11-08",
      status: "active",
      sbu: [
        { code: "RK001", name: "Konstruksi Mall dan Plaza", grade: "Besar" },
        { code: "RK002", name: "Konstruksi Pelabuhan dan Dermaga", grade: "Besar" },
        { code: "RK003", name: "Konstruksi Bandara dan Terminal", grade: "Besar" }
      ]
    },
    {
      id: 4,
      companyName: "UD Maju Bersama",
      director: "Rini Susanti",
      responsible: "Bambang Prakoso",
      address: "Jl. Ahmad Yani No. 321, Medan",
      joinDate: "2023-06-14",
      status: "pending",
      sbu: [
        { code: "RK001", name: "Konstruksi Rumah Tinggal", grade: "Kecil" },
        { code: "RK002", name: "Konstruksi Sekolah dan Pendidikan", grade: "Kecil" },
        { code: "RK003", name: "Konstruksi Tempat Ibadah", grade: "Kecil" }
      ]
    },
    {
      id: 5,
      companyName: "PT Nusantara Builder",
      director: "Hendra Gunawan",
      responsible: "Maya Sari",
      address: "Jl. Pancasila No. 654, Yogyakarta",
      joinDate: "2023-02-28",
      status: "active",
      sbu: [
        { code: "RK001", name: "Konstruksi Hotel dan Resort", grade: "Besar" },
        { code: "RK002", name: "Konstruksi Pabrik Industri", grade: "Menengah" },
        { code: "RK003", name: "Konstruksi Gudang dan Warehouse", grade: "Menengah" }
      ]
    }
  ];

  // Filter members based on search term and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        bg: 'bg-emerald-50 text-emerald-600 border-emerald-200', 
        text: 'Aktif',
        dot: 'bg-emerald-500'
      },
      pending: { 
        bg: 'bg-amber-50 text-amber-600 border-amber-200', 
        text: 'Pending',
        dot: 'bg-amber-500'
      },
      inactive: { 
        bg: 'bg-slate-50 text-slate-600 border-slate-200', 
        text: 'Tidak Aktif',
        dot: 'bg-slate-400'
      }
    };
    
    return statusConfig[status] || statusConfig.active;
  };

  const getGradeBadge = (grade) => {
    const gradeConfig = {
      'Kecil': 'bg-blue-50 text-blue-600 border-blue-200',
      'Menengah': 'bg-purple-50 text-purple-600 border-purple-200',
      'Besar': 'bg-orange-50 text-orange-600 border-orange-200'
    };
    
    return gradeConfig[grade] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
          <NavbarView/>
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              Anggota Terdaftar
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Daftar perusahaan konstruksi yang telah bergabung dan terdaftar dalam sistem kami
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari perusahaan, direktur, atau penanggung jawab..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-slate-700"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-14 pl-11 pr-8 rounded-xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer text-slate-700 min-w-[150px]"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Anggota</p>
                <p className="text-3xl font-bold">{filteredMembers.length}</p>
              </div>
              <Building2 size={32} className="text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Aktif</p>
                <p className="text-3xl font-bold">{filteredMembers.filter(m => m.status === 'active').length}</p>
              </div>
              <User size={32} className="text-emerald-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold">{filteredMembers.filter(m => m.status === 'pending').length}</p>
              </div>
              <Calendar size={32} className="text-amber-200" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden">
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/50 bg-slate-50/50">
                  <th className="text-left py-6 px-6 font-semibold text-slate-700">Perusahaan</th>
                  <th className="text-left py-6 px-6 font-semibold text-slate-700">Direktur</th>
                  <th className="text-left py-6 px-6 font-semibold text-slate-700">Penanggung Jawab</th>
                  <th className="text-left py-6 px-6 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-6 px-6 font-semibold text-slate-700">Bergabung</th>
                  <th className="text-center py-6 px-6 font-semibold text-slate-700">SBU</th>
                  <th className="text-center py-6 px-6 font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => {
                  const statusBadge = getStatusBadge(member.status);
                  return (
                    <tr key={member.id} className="border-b border-slate-100/50 hover:bg-slate-50/30 transition-colors duration-200">
                      <td className="py-6 px-6">
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">{member.companyName}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin size={14} />
                            {member.address}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="font-medium text-slate-700">{member.director}</div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="font-medium text-slate-700">{member.responsible}</div>
                      </td>
                      <td className="py-6 px-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${statusBadge.bg}`}>
                          <div className={`w-2 h-2 rounded-full ${statusBadge.dot}`}></div>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <div className="text-sm text-slate-600">
                          {new Date(member.joinDate).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                          <Building2 size={14} />
                          {member.sbu.length}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-100 hover:to-indigo-100 text-slate-700 hover:text-blue-700 rounded-xl transition-all duration-300 font-medium"
                        >
                          <Eye size={16} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredMembers.map((member) => {
              const statusBadge = getStatusBadge(member.status);
              return (
                <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-lg mb-1">{member.companyName}</h3>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg}`}>
                        <div className={`w-2 h-2 rounded-full ${statusBadge.dot}`}></div>
                        {statusBadge.text}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                    >
                      <ChevronRight size={20} className="text-slate-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User size={16} className="text-blue-500" />
                      <span><strong>Direktur:</strong> {member.director}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <User size={16} className="text-purple-500" />
                      <span><strong>PJ:</strong> {member.responsible}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin size={16} className="text-pink-500 mt-0.5" />
                      <span>{member.address}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} className="text-green-500" />
                        <span>{new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium">
                        <Building2 size={14} />
                        {member.sbu.length} SBU
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Tidak ada anggota ditemukan</h3>
              <p className="text-slate-500">Coba ubah kata kunci pencarian atau filter status</p>
            </div>
          )}
        </div>

        {/* Modal Detail SBU */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedMember.companyName}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedMember.status).bg}`}>
                        <div className={`w-2 h-2 rounded-full ${getStatusBadge(selectedMember.status).dot}`}></div>
                        {getStatusBadge(selectedMember.status).text}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <User size={18} className="text-blue-500" />
                      Direktur
                    </h4>
                    <p className="text-slate-600">{selectedMember.director}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <User size={18} className="text-purple-500" />
                      Penanggung Jawab
                    </h4>
                    <p className="text-slate-600">{selectedMember.responsible}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <MapPin size={18} className="text-pink-500" />
                      Alamat
                    </h4>
                    <p className="text-slate-600">{selectedMember.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar size={18} className="text-green-500" />
                      Tanggal Bergabung
                    </h4>
                    <p className="text-slate-600">
                      {new Date(selectedMember.joinDate).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Building2 size={18} className="text-indigo-500" />
                    Sub Bidang Usaha (SBU)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedMember.sbu.map((sbu, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                            {sbu.code}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getGradeBadge(sbu.grade)}`}>
                            {sbu.grade}
                          </span>
                        </div>
                        <p className="font-medium text-slate-700">{sbu.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MemberTable;
"use client";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignAuthController } from "./controller";

const SignUpLoginView = () => {
  const ctrl = useSignAuthController();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/20 relative z-10">
        {/* Left Section - Form */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 relative">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {ctrl.signIn ? "Welcome Back" : "Join Us Today"}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {ctrl.signIn 
                  ? "Sign in to continue your journey" 
                  : "Create your account to get started"
                }
              </p>
            </div>

            {ctrl.signIn ? (
              /* Login Form */
              <form onSubmit={ctrl.submitLogin} className="space-y-6">
                {/* Email Input */}
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={ctrl.signInUsername}
                    onChange={(e) => ctrl.setSignInUsername(e.target.value)}
                    className="w-full h-14 rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Password Input */}
                <div className="group relative">
                  <input
                    type={ctrl.showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={ctrl.signInPassword}
                    onChange={(e) => ctrl.setSignInPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-6 pr-14 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <button
                    type="button"
                    onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    {ctrl.showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Error Message */}
                {ctrl.error.signIn && (
                  <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-3">
                    <p className="text-red-600 text-sm">*{ctrl.error.signIn}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  disabled={ctrl.loading.signIn}
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {ctrl.loading.signIn ? "Signing In..." : "Sign In"}
                  </span>
                  {!ctrl.loading.signIn && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={ctrl.submitRegister} className="space-y-4">
                {/* Company Name */}
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Nama Perusahaan"
                    value={ctrl.form.nama_perusahaan}
                    onChange={(e) =>
                      ctrl.setForm({ ...ctrl.form, nama_perusahaan: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Director Name */}
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Nama Direktur"
                    value={ctrl.form.nama_direktur}
                    onChange={(e) =>
                      ctrl.setForm({ ...ctrl.form, nama_direktur: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Responsible Person */}
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Nama Penanggung Jawab"
                    value={ctrl.form.nama_penanggung_jawab}
                    onChange={(e) =>
                      ctrl.setForm({
                        ...ctrl.form,
                        nama_penanggung_jawab: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Company Address */}
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Alamat Perusahaan"
                    value={ctrl.form.alamat_perusahaan}
                    onChange={(e) =>
                      ctrl.setForm({
                        ...ctrl.form,
                        alamat_perusahaan: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Email */}
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={ctrl.form.email}
                    onChange={(e) =>
                      ctrl.setForm({ ...ctrl.form, email: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Password */}
                <div className="group relative">
                  <input
                    type={ctrl.showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={ctrl.form.password}
                    onChange={(e) =>
                      ctrl.setForm({ ...ctrl.form, password: e.target.value })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <button
                    type="button"
                    onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    {ctrl.showPassword ? (
                      <AiFillEyeInvisible size={18} />
                    ) : (
                      <AiFillEye size={18} />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Confirm Password */}
                <div className="group relative">
                  <input
                    type={ctrl.showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={ctrl.form.password_confirmation}
                    onChange={(e) =>
                      ctrl.setForm({
                        ...ctrl.form,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 px-4 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white transition-all duration-300 group-hover:bg-gray-100/50"
                  />
                  <button
                    type="button"
                    onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    {ctrl.showPassword ? (
                      <AiFillEyeInvisible size={18} />
                    ) : (
                      <AiFillEye size={18} />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Error Message */}
                {ctrl.error.signUp && (
                  <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-3">
                    <p className="text-red-600 text-sm">*{ctrl.error.signUp}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  disabled={ctrl.loading.signUp}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {ctrl.loading.signUp ? "Registering..." : "Register"}
                  </span>
                  {!ctrl.loading.signUp && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </form>
            )}

            {/* Toggle Section */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              
              <p className="text-gray-600 text-sm">
                {ctrl.signIn ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button
                  type="button"
                  onClick={() => ctrl.toggle(!ctrl.signIn)}
                  className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  {ctrl.signIn ? "Daftar di sini" : "Login di sini"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Hero */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border border-white/30 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10 text-center max-w-sm">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-xl"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              {ctrl.signIn ? "Hello, Friend!" : "Welcome Back!"}
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {ctrl.signIn
                ? "Enter your personal details and start your journey with us"
                : "To keep connected with us, please login with your personal info"}
            </p>

            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginView;
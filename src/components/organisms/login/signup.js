"use client";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignAuthController } from "./controller";

const SignUpLoginView = () => {
  const ctrl = useSignAuthController();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#ffff] rounded-2xl relative overflow-hidden w-[700px] max-w-[100%] min-h-[570px] shadow-2xl">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            ctrl.signIn ? "-left-0 opacity-0" : "left-[50%] opacity-100"
          }`}
        >
          <form
            onSubmit={ctrl.submitRegister}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center"
          >
            <h1 className="font-bold m-0">Create Account</h1>
            <input
              type="text"
              placeholder="Nama Perusahaan"
              value={ctrl.form.nama_perusahaan}
              onChange={(e) =>
                ctrl.setForm({ ...ctrl.form, nama_perusahaan: e.target.value })
              }
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Nama Direktur"
              value={ctrl.form.nama_direktur}
              onChange={(e) =>
                ctrl.setForm({ ...ctrl.form, nama_direktur: e.target.value })
              }
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
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
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="text"
              placeholder="Alamat Perusahaan"
              value={ctrl.form.alamat_perusahaan}
              onChange={(e) =>
                ctrl.setForm({ ...ctrl.form, alamat_perusahaan: e.target.value })
              }
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={ctrl.form.email}
              onChange={(e) =>
                ctrl.setForm({ ...ctrl.form, email: e.target.value })
              }
              className="bg-[#eee] border-none py-2 px-3 my-2 w-full"
            />

            <div className="relative w-full">
              <input
                id="password"
                type={ctrl.showPassword ? "text" : "password"}
                placeholder="Password"
                value={ctrl.form.password}
                onChange={(e) =>
                  ctrl.setForm({ ...ctrl.form, password: e.target.value })
                }
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {ctrl.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="relative w-full">
              <input
                id="confirm-password"
                type={ctrl.showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={ctrl.form.password_confirmation}
                onChange={(e) =>
                  ctrl.setForm({
                    ...ctrl.form,
                    password_confirmation: e.target.value,
                  })
                }
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {ctrl.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <button
              disabled={ctrl.loading.signIn || ctrl.loading.signUp}
              className="rounded-sm border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none"
            >
              {ctrl.loading.signUp ? "Registering..." : "Register"}
            </button>
            {ctrl.error.signUp && (
              <p className="text-red-500">{`*${ctrl.error.signUp}`}</p>
            )}
          </form>

          {/* Success Popup */}
          {ctrl.showPopup && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity duration-500 opacity-100">
              <div className="bg-white p-6 rounded-lg shadow-xl text-center transition-transform transform scale-100">
                <h2 className="text-xl font-bold">{ctrl.successSignUp}</h2>
                <button
                  onClick={() => {
                    ctrl.setShowPopup(false);
                    ctrl.toggle(true);
                  }}
                  className="mt-4 px-8 py-2 bg-[#081b57] text-white rounded hover:bg-[#7912d4] transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 ${
            ctrl.signIn ? "left-0 opacity-100" : "left-[7%] opacity-0"
          }`}
        >
          <form
            onSubmit={ctrl.submitLogin}
            className="bg-white flex items-center justify-center flex-col px-12 h-full text-center"
          >
            <h1 className="font-bold m-0 tracking-widest" style={{ color: "#0a1c57" }}>
              LOGIN
            </h1>
            <input
              type="email"
              placeholder="Email"
              value={ctrl.signInUsername}
              onChange={(e) => ctrl.setSignInUsername(e.target.value)}
              className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
            />
            <div className="relative w-full">
              <input
                type={ctrl.showPassword ? "text" : "password"}
                placeholder="Password"
                value={ctrl.signInPassword}
                onChange={(e) => ctrl.setSignInPassword(e.target.value)}
                className="bg-[#eee] border-none py-3 px-4 my-2 w-full"
              />
              <button
                type="button"
                onClick={() => ctrl.setShowPassword(!ctrl.showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {ctrl.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <button
              disabled={ctrl.loading.signIn || ctrl.loading.signUp}
              className="rounded-md mt-2 border border-[#081b57] bg-[#081b57] text-white text-xs font-bold py-3 px-12 tracking-wide uppercase transition-transform ease-in duration-300 active:scale-95 focus:outline-none"
            >
              {ctrl.loading.signIn
                ? "Logging in..."
                : ctrl.loading.signUp
                ? "Registering..."
                : "Sign In"}
            </button>
            {ctrl.error.signIn && (
              <p className="text-red-500">{`*${ctrl.error.signIn}`}</p>
            )}
          </form>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out ${
            ctrl.signIn ? "translate-x-50%" : "-translate-x-full"
          }`}
        >
          <div className="bg-gradient-to-r from-[#081b57] to-[#7912d4] text-white flex flex-col items-center justify-center h-full">
            {ctrl.signIn ? (
              <div className="text-center p-8">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us, please login with your personal info</p>
                <button
                  onClick={() => ctrl.toggle(false)}
                  className="mt-4 px-8 py-2 border border-white text-white rounded hover:bg-white hover:text-[#081b57] transition-colors"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="text-center p-8">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button
                  onClick={() => ctrl.toggle(true)}
                  className="mt-4 px-8 py-2 border border-white text-white rounded hover:bg-white hover:text-[#081b57] transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginView;

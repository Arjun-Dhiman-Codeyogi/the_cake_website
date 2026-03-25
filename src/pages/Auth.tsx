import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, LogIn, UserPlus, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const [tab, setTab] = useState<"login" | "register">("register");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, register, authModalOpen, closeAuthModal } = useAuth();

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Reset everything when modal opens/closes
  useEffect(() => {
    if (!authModalOpen) {
      setTab("register");
      setShowPass(false);
      setError("");
      setSuccess("");
      setRegName(""); setRegEmail(""); setRegPhone(""); setRegPass(""); setRegConfirm("");
      setLoginEmail(""); setLoginPass("");
    }
  }, [authModalOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [authModalOpen]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone.replace(/\D/g, "").slice(-10));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPass.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(regEmail.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    const digits = regPhone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 12) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (regPass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (regPass !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }

    const ok = register(regName.trim(), regEmail.trim(), regPhone.trim(), regPass);
    if (!ok) {
      setError("An account with this email already exists. Please login.");
      return;
    }
    setSuccess("Account created successfully!");
    setTimeout(() => closeAuthModal(), 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginEmail.trim() || !loginPass.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(loginEmail.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const ok = login(loginEmail.trim(), loginPass);
    if (!ok) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    setSuccess("Welcome back!");
    setTimeout(() => closeAuthModal(), 600);
  };

  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in"
        onClick={closeAuthModal}
      />

      {/* Modal card */}
      <div className="relative z-10 w-[95vw] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-scale-in"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Header with gradient */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="bg-gradient-to-r from-burgundy via-mauve to-burgundy px-6 py-7 text-center">
            {/* Close button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {tab === "register" ? (
              <UserPlus className="w-6 h-6 text-blush mx-auto mb-2" />
            ) : (
              <LogIn className="w-6 h-6 text-blush mx-auto mb-2" />
            )}
            <h2 className="font-playfair text-2xl md:text-3xl text-white">
              {tab === "register" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="font-lato text-[11px] text-white/70 mt-1 tracking-wider">
              {tab === "register" ? "Join The Pink Rosette family" : "Sign in to your account"}
            </p>
          </div>
          {/* Mini wave at bottom of header */}
          <div className="w-full overflow-hidden leading-[0]" style={{ marginTop: -1 }}>
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block" style={{ height: 10 }}>
              <path fill="white" d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
            </svg>
          </div>
        </div>

        {/* Form body */}
        <div className="bg-white px-6 pb-7 pt-4 rounded-b-2xl">
          {/* Tab switcher */}
          <div className="flex rounded-full bg-blush/30 p-1 mb-6">
            <button
              onClick={() => { setTab("register"); setError(""); setSuccess(""); setLoginEmail(""); setLoginPass(""); setShowPass(false); }}
              className={`flex-1 font-lato text-xs tracking-widest uppercase py-2.5 rounded-full transition-all duration-300 ${
                tab === "register"
                  ? "bg-burgundy text-white shadow-md"
                  : "text-foreground hover:text-burgundy"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setTab("login"); setError(""); setSuccess(""); setRegName(""); setRegEmail(""); setRegPhone(""); setRegPass(""); setRegConfirm(""); setShowPass(false); }}
              className={`flex-1 font-lato text-xs tracking-widest uppercase py-2.5 rounded-full transition-all duration-300 ${
                tab === "login"
                  ? "bg-burgundy text-white shadow-md"
                  : "text-foreground hover:text-burgundy"
              }`}
            >
              Login
            </button>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-lato text-xs text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-600 font-lato text-xs text-center">
              {success}
            </div>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-4 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-4 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-4 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={regPass}
                    onChange={e => setRegPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-10 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={regConfirm}
                    onChange={e => setRegConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-4 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-burgundy text-primary-foreground font-lato text-xs tracking-[0.2em] uppercase py-3 rounded-full hover:bg-mauve transition-colors duration-300 shadow-lg mt-1 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </button>

              <p className="font-lato text-xs text-muted-foreground text-center mt-1">
                Already have an account?{" "}
                <button type="button" onClick={() => { setTab("login"); setError(""); setRegName(""); setRegEmail(""); setRegPhone(""); setRegPass(""); setRegConfirm(""); }} className="text-burgundy font-semibold hover:underline">
                  Login here
                </button>
              </p>
            </form>
          )}

          {/* ── LOGIN FORM ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-4 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={loginPass}
                    onChange={e => setLoginPass(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full font-lato text-sm text-foreground pl-10 pr-10 py-2.5 border border-blush/50 rounded-xl outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all bg-cream/20 placeholder:text-muted-foreground/40"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-burgundy text-primary-foreground font-lato text-xs tracking-[0.2em] uppercase py-3 rounded-full hover:bg-mauve transition-colors duration-300 shadow-lg mt-1 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>

              <p className="font-lato text-xs text-muted-foreground text-center mt-1">
                Don't have an account?{" "}
                <button type="button" onClick={() => { setTab("register"); setError(""); setLoginEmail(""); setLoginPass(""); }} className="text-burgundy font-semibold hover:underline">
                  Register here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

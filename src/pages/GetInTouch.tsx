import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import { Instagram, Facebook, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const GetInTouch = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Contact:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Page Hero */}
      <section className="relative mt-10 h-40 sm:h-52 md:h-72 overflow-hidden">
        <img
          src="/images/photo-1486427944299-d1955d23e34d.webp"
          alt="Get In Touch"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-burgundy/65 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            We'd Love to Hear From You
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl text-primary-foreground animate-fade-in-up">
            Get In Touch
          </h1>
        </div>
      </section>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Split Layout */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left — Info */}
          <ScrollReveal className="animate-slide-left">
            <div className="text-3xl sm:text-5xl mb-4 sm:mb-6 animate-petal">🌸</div>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground mb-4">
              Let's Connect
            </h2>
            <div className="w-10 h-0.5 bg-mauve mb-6" />
            <p className="font-lato text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Whether you have a question about our cakes, want to place a custom
              order, or simply want to say hello — we're always delighted to hear
              from our community.
            </p>

            <ul className="flex flex-col gap-5 mb-10">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-mauve mt-0.5" />
                <div>
                  <p className="font-lato text-xs tracking-widest uppercase text-muted-foreground mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:hello@thepinkrosette.com"
                    className="font-lato text-sm text-foreground hover:text-mauve transition-colors"
                  >
                    thepinkrosette@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-mauve mt-0.5" />
                <div>
                  <p className="font-lato text-xs tracking-widest uppercase text-muted-foreground mb-0.5">
                    Location
                  </p>
                  <p className="font-lato text-sm text-foreground">
                    Fort, Mumbai, Maharashtra
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-mauve mt-0.5" />
                <div>
                  <p className="font-lato text-xs tracking-widest uppercase text-muted-foreground mb-0.5">
                    Delivery Hours
                  </p>
                  <p className="font-lato text-sm text-foreground">
                    12:00 pm – 6:00 pm · 24–48 hrs notice
                  </p>
                </div>
              </li>
            </ul>

            {/* Social CTAs */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thepinkrosette"
                target="_blank"
                rel="noreferrer"
                className="btn-sweep flex items-center gap-2 border border-mauve text-mauve font-lato text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-mauve hover:text-accent-foreground transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/thepinkrosette"
                target="_blank"
                rel="noreferrer"
                className="btn-sweep flex items-center gap-2 border border-burgundy text-burgundy font-lato text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-burgundy hover:text-primary-foreground transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </ScrollReveal>

          {/* Right — Form */}
          <ScrollReveal className="animate-slide-right">
            <div className="bg-card rounded-2xl p-5 sm:p-8 shadow-sm">
              <h3 className="font-playfair text-2xl text-foreground mb-6">
                Send a Message
              </h3>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-mauve animate-scale-in" />
                  <h4 className="font-playfair text-xl text-foreground">
                    Message Received!
                  </h4>
                  <p className="font-lato text-sm text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span className="text-destructive text-xs mt-1">Required</span>
                    )}
                  </div>

                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Email *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                      type="email"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span className="text-destructive text-xs mt-1">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      {...register("message", { required: true })}
                      rows={5}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition resize-none"
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <span className="text-destructive text-xs mt-1">Required</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-sweep bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase py-3.5 px-8 rounded-full hover:bg-mauve transition-colors duration-300 w-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Wave: pink → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default GetInTouch;

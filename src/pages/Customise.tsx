import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    icon: "🎂",
    title: "Choose Your Base",
    desc: "Pick your flavour, size, and style from our curated options.",
  },
  {
    icon: "🌸",
    title: "Personalise Every Detail",
    desc: "Share your vision — florals, colours, message, occasion.",
  },
  {
    icon: "🎁",
    title: "Delivered with Joy",
    desc: "We handcraft and deliver your dream cake within 48 hours.",
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  description: string;
};

const Customise = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Enquiry:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Split Hero */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden h-72 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=85"
            alt="Bespoke Cake"
            className="w-full h-full object-cover ken-burns"
          />
          <div className="absolute inset-0 bg-burgundy/40" />
        </div>

        <div className="bg-secondary flex flex-col justify-center px-10 py-16">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-3 animate-slide-right">
            Bespoke Creations
          </p>
          <h1 className="font-playfair text-5xl text-foreground mb-4 animate-slide-right">
            Make it Yours
          </h1>
          <div className="w-12 h-0.5 bg-mauve mb-6 animate-slide-right" />
          <p className="font-lato text-sm text-muted-foreground leading-relaxed animate-slide-right max-w-sm">
            At The Pink Rosette, every cake is a canvas. Tell us your story —
            your event, your colours, your dreams — and we'll sculpt it into an
            edible masterpiece, delivered with love.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
            The Process
          </p>
          <h2 className="font-playfair text-4xl text-foreground">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 150}>
              <div className="text-center">
                <div className="text-5xl mb-4 animate-petal">{step.icon}</div>
                <div className="w-8 h-8 bg-burgundy text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-playfair text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="font-playfair text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-lato text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Start Here
            </p>
            <h2 className="font-playfair text-4xl text-foreground">
              Send an Enquiry
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <ScrollReveal>
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-mauve animate-scale-in" />
                <h3 className="font-playfair text-2xl text-foreground">
                  Thank you!
                </h3>
                <p className="font-lato text-sm text-muted-foreground">
                  We've received your enquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
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
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <span className="text-destructive text-xs mt-1">Required</span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                      Event Date
                    </label>
                    <input
                      {...register("eventDate")}
                      type="date"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
                    Describe Your Dream Cake *
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    rows={5}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 font-lato text-sm focus:outline-none focus:ring-2 focus:ring-mauve transition resize-none"
                    placeholder="Tell us about flavours, colours, theme, occasion..."
                  />
                  {errors.description && (
                    <span className="text-destructive text-xs mt-1">Required</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-sweep bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase py-4 px-10 rounded-full hover:bg-mauve transition-colors duration-300 w-full"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Customise;

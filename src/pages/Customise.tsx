import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import { MessageCircle, Cake, Heart, Baby, Palette } from "lucide-react";

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

const occasions = [
  {
    icon: Cake,
    title: "Birthdays",
    desc: "Our team is here to help you personalise your birthday cake from start to finish, including selecting flavours and creating a one-of-a-kind design!",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80",
  },
  {
    icon: Heart,
    title: "Weddings & Anniversaries",
    desc: "A cake serves as the focal point for your celebrations. Allow us to assist in customising something that meets your criteria & makes your special occasion even more sweet!",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
  },
  {
    icon: Baby,
    title: "Baby Shower / Announcements",
    desc: "Personal occasions like a baby announcement require more attention to detail and we're here for you! Our baby shower cakes offer limitless opportunities for customisations, be it names, dates or special messages!",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=80",
  },
  {
    icon: Palette,
    title: "Themed Cakes",
    desc: "Experience the magic of themed cakes that turn your sweet dreams into edible works of art. Each cake is carefully crafted with attention to every detail, bringing your unique vision to life!",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
  },
];

const Customise = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Split Hero */}
      <section className="grid md:grid-cols-2 min-h-0 md:min-h-[70vh]">
        <div className="relative overflow-hidden h-48 sm:h-72 md:h-[100vh]">
          <img
            src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=85"
            alt="Bespoke Cake"
            className="w-full h-full object-cover ken-burns"
          />
          <div className="absolute inset-0 bg-burgundy/40" />
        </div>

        <div style={{ background: "#fce4ec" }} className="flex flex-col justify-center px-5 sm:px-10 py-10 sm:py-16">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-3 animate-slide-right">
            Bespoke Creations
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl text-foreground mb-4 animate-slide-right">
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
      <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-8 sm:mb-14">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
            The Process
          </p>
          <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 150}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-4 animate-petal">{step.icon}</div>
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

      {/* Wave: white → blush */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Occasions — Customise With Us */}
      <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ background: "#fce4ec" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-8 sm:mb-14">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              For Every Occasion
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
              Customise With Us
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
            {occasions.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 120}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-40 sm:h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-playfair text-xl text-white font-semibold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-lato text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <div style={{ background: "#fce4ec" }}>
        <section className="pb-10 sm:pb-16 lg:pb-20 px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-gradient-to-r from-burgundy via-mauve to-burgundy rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/30">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-3">
                    Chat With Us on WhatsApp
                  </h2>
                  <p className="font-lato text-sm text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
                    Have a custom cake idea? Send us a message on WhatsApp and our team
                    will help you bring your dream cake to life!
                  </p>
                  <a
                    href="https://wa.me/917718077776?text=Hi!%20I'd%20like%20to%20customise%20a%20cake%20%F0%9F%8E%82"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-lato text-sm tracking-wider uppercase px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                  <p className="font-lato text-xs text-white/40 mt-4">
                    We typically reply within 30 minutes
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Wave: blush → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default Customise;

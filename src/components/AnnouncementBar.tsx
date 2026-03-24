const messages = [
  "🌸 All orders delivered within 24–48 hrs, 12pm–6pm",
  "✨ Free delivery on orders above ₹3,000",
  "🎂 Custom cakes available — reach out to us!",
  "🌸 All orders delivered within 24–48 hrs, 12pm–6pm",
  "✨ Free delivery on orders above ₹3,000",
  "🎂 Custom cakes available — reach out to us!",
];

const AnnouncementBar = () => {
  return (
    <div className="bg-burgundy text-primary-foreground py-2 text-xs font-lato tracking-widest overflow-hidden">
      <div className="marquee-track">
        {messages.map((msg, i) => (
          <span key={i} className="px-12 whitespace-nowrap">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;

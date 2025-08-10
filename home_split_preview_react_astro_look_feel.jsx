import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { MessageCircle, PlayCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeSplitPreview() {
  useEffect(() => {
    document.documentElement.style.setProperty("--violet", "#6B4EFF");
    document.documentElement.style.setProperty("--cyan", "#2AA5C8");
    document.documentElement.style.setProperty("--bg", "#0B1020");
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-slate-100 font-inter p-6">
      <h1 className="text-3xl font-bold mb-6">Vista previa Home Split</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Column
          side="left"
          accent="var(--cyan)"
          title="Automatizaciones Make e IA"
          subtitle="Operaciones sin fricción para cualquier nicho de negocio."
          bullets={["Integraciones Make", "Flujos sin intervención", "Reporting y analítica", "Bots y asistentes a medida"]}
          ctaHref="#"
          heroImg="https://via.placeholder.com/800x450.png?text=Automatizaciones"
        />
        <Column
          side="right"
          accent="var(--violet)"
          title="Audiovisual AI"
          subtitle="Anuncios, vídeos y contenido de impacto con IA generativa."
          bullets={["Spots publicitarios", "Reels para redes", "Locución y avatars", "Guiones optimizados con IA"]}
          ctaHref="#"
          heroImg="https://via.placeholder.com/800x450.png?text=Audiovisual+AI"
        />
      </div>
      <div className="fixed bottom-5 right-5">
        <button className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center text-white shadow-lg">
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

function Column({ side, accent, title, subtitle, bullets, ctaHref, heroImg }) {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
  }, [controls]);

  return (
    <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm`}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={controls} className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: accent }}>{title}</h2>
        <p className="text-slate-300">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {bullets.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-sm">
              <CheckCircle2 className="w-4 h-4" style={{ color: accent }} /> {b}
            </span>
          ))}
        </div>
        <img src={heroImg} alt={title} className="rounded-lg border border-white/10" />
        <a href={ctaHref} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-900 font-semibold" style={{ backgroundColor: accent }}>
          Solicita tu demo personalizada
          <ArrowRight className="w-4 h-4" />
        </a>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/10">
          <PlayCircle className="w-5 h-5" /> Ver ejemplo
        </button>
      </motion.div>
    </div>
  );
}

import { useState } from "react";

// Preview SPA de TODO el sitio (Home + Servicios + Casos + Blog + Sobre + Contacto + Legal)
// - Sin dependencias externas
// - Tailwind classes para estilo
// - Placeholders visibles (via.placeholder.com) con el NOMBRE sugerido para el archivo final
// Reemplaza las imágenes por las definitivas manteniendo el mismo nombre sugerido.

export default function SitePreview() {
  const [page, setPage] = useState<"home"|"servicios"|"casos"|"blog"|"sobre"|"contacto"|"legal">("home");
  const [lang, setLang] = useState<"es"|"en">("es");

  const t = (es: string, en: string) => (lang === "es" ? es : en);

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2AA5C8] to-[#6B4EFF]" />
            <span className="font-bold tracking-tight">Automatizaciones & Audiovisual AI</span>
          </div>
          <nav className="hidden md:flex gap-1 text-sm">
            {([
              ["home", t("Inicio", "Home")],
              ["servicios", t("Servicios", "Services")],
              ["casos", t("Casos", "Work")],
              ["blog", "Blog"],
              ["sobre", t("Sobre", "About")],
              ["contacto", t("Contacto", "Contact")],
              ["legal", t("Legal", "Legal")],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                className={`px-3 py-2 rounded-lg hover:bg-white/10 ${page===key ? "bg-white/10" : ""}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === "home" && <HomeSplit lang={lang} t={t} />}
        {page === "servicios" && <Servicios t={t} />}
        {page === "casos" && <Casos t={t} />}
        {page === "blog" && <Blog t={t} />}
        {page === "sobre" && <Sobre t={t} />}
        {page === "contacto" && <Contacto t={t} />}
        {page === "legal" && <Legal t={t} />}
      </main>

      {/* Chatbot mock (OpenAI) */}
      <ChatbotBubble />

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm opacity-70 flex flex-col md:flex-row gap-3 justify-between">
          <span>© {new Date().getFullYear()} Tu Marca</span>
          <div className="flex gap-4">
            <a href="#">{t("Privacidad","Privacy")}</a>
            <a href="#">{t("Términos","Terms")}</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LangToggle({lang, setLang}:{lang:"es"|"en"; setLang:(l:"es"|"en")=>void}){
  return (
    <div className="flex items-center bg-white/10 rounded-xl p-1">
      {(["es","en"] as const).map((l)=> (
        <button key={l}
          onClick={()=>setLang(l)}
          className={`px-3 py-1 rounded-lg text-sm ${lang===l?"bg-white text-slate-900":"opacity-80 hover:opacity-100"}`}
        >{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

// HOME — split 50/50 con scroll independiente en desktop
function HomeSplit({lang, t}:{lang:"es"|"en"; t:(es:string,en:string)=>string}){
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-4">{t("Home — Dos áreas principales","Home — Two main areas")}</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-auto xl:h-[70vh]">
        <SplitColumn
          accent="#2AA5C8"
          badge="Make & AI"
          title={t("Automatizaciones Make e IA","Make & AI Automations")}
          subtitle={t("Operaciones sin fricción para cualquier nicho de negocio.","Frictionless operations for any business niche.")}
          bullets={[
            t("Integraciones Make","Make integrations"),
            t("Flujos sin intervención","Hands‑off workflows"),
            t("Reporting y analítica","Reporting & analytics"),
            t("Bots y asistentes a medida","Custom bots & assistants"),
          ]}
          heroName="hero_automatizaciones.jpg"
        />
        <SplitColumn
          accent="#6B4EFF"
          badge="Audiovisual"
          title={t("Audiovisual AI","Audiovisual AI")}
          subtitle={t("Anuncios, vídeos y contenido de impacto con IA generativa.","High‑impact ads, videos and content with generative AI.")}
          bullets={[
            t("Spots publicitarios","Ad spots"),
            t("Reels para redes","Social reels"),
            t("Locución y avatars","Voice & avatars"),
            t("Guiones con IA","AI‑assisted scripts"),
          ]}
          heroName="hero_audiovisual.jpg"
        />
      </div>

      {/* Secciones comunes bajo el split */}
      <div className="mt-10 grid gap-6">
        <Card title={t("Logos de clientes","Client logos")}>
          <img className="w-full object-contain" alt="logos_clientes.png"
               src={`https://via.placeholder.com/1200x220/0B1020/ffffff?text=logos_clientes.png`} />
        </Card>
        <Card title={t("Beneficios","Benefits")}>
          <div className="grid md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i=> (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold">{t("Más velocidad, menos costes","Faster, cheaper")}</h3>
                <p className="text-sm opacity-80">{t("Automatiza tareas repetitivas y libera horas cada semana.","Automate repetitive tasks and save hours each week.")}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title={t("Casos destacados","Featured work")}>
          <img className="w-full rounded-xl border border-white/10" alt="caso_placeholder.jpg"
               src={`https://via.placeholder.com/1200x800/0B1020/ffffff?text=caso_placeholder.jpg`} />
        </Card>
        <Card title="Blog">
          <div className="grid md:grid-cols-3 gap-4">
            {["blog_1.jpg","blog_2.jpg","blog_3.jpg"].map(n=> (
              <article key={n} className="rounded-xl overflow-hidden border border-white/10">
                <img src={`https://via.placeholder.com/1200x800/0B1020/ffffff?text=${n}`} alt={n} />
                <div className="p-4 bg-white/5">
                  <h4 className="font-semibold">{t("Título del post","Post title")}</h4>
                  <p className="text-sm opacity-80">{t("Resumen breve del contenido.","Short summary of the content.")}</p>
                </div>
              </article>
            ))}
          </div>
        </Card>
        <CTAButton href="https://tally.so/r/mBqDee">
          {t("Solicita tu demo personalizada","Request your personalized demo")}
        </CTAButton>
      </div>
    </section>
  );
}

function SplitColumn({accent, badge, title, subtitle, bullets, heroName}:{
  accent:string; badge:string; title:string; subtitle:string; bullets:string[]; heroName:string;
}){
  return (
    <div className="relative border border-white/10 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-[0.10]" style={{background: `linear-gradient(180deg, ${accent}33, transparent)`}} />
      {/* scroll independiente en desktop */}
      <div className="h-auto xl:h-[70vh] overflow-visible xl:overflow-auto">
        <div className="p-6 space-y-6">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase">
            <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: accent}} />
            {badge}
          </span>
          <h2 className="text-2xl font-extrabold leading-tight">{title}</h2>
          <p className="text-slate-300">{subtitle}</p>
          <div className="flex gap-2 flex-wrap">
            {bullets.map(b=> (
              <span key={b} className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
                <span className="w-4 h-4 rounded-full" style={{backgroundColor: accent}} />
                <span className="text-sm">{b}</span>
              </span>
            ))}
          </div>
          <img
            src={`https://via.placeholder.com/1200x700/0B1020/ffffff?text=${heroName}`}
            alt={heroName}
            className="rounded-xl border border-white/10"
          />
          <a href="https://tally.so/r/mBqDee" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-slate-900 font-semibold" style={{backgroundColor: accent}}>
            Solicita tu demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// SERVICIOS
function Servicios({t}:{t:(es:string,en:string)=>string}){
  const blocks = [
    { img:"servicio_automatizaciones.jpg", title:t("Automatizaciones","Automations"), desc:t("Integraciones Make, CRM, marketing, e‑commerce y soporte.","Make integrations, CRM, marketing, e‑commerce and support.")},
    { img:"servicio_audiovisual.jpg", title:t("IA Audiovisual","Audiovisual AI"), desc:t("Spots, reels, locución y piezas para RRSS con IA.","Spots, reels, voiceover and social content with AI.")},
  ];
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-6">{t("Servicios","Services")}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blocks.map(b=> (
          <div key={b.title} className="rounded-2xl overflow-hidden border border-white/10">
            <img src={`https://via.placeholder.com/1600x900/0B1020/ffffff?text=${b.img}`} alt={b.img} />
            <div className="p-5 bg-white/5">
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="opacity-80 text-sm mt-1">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <CTAButton href="https://tally.so/r/mBqDee" className="mt-6">{t("Pedir presupuesto","Request a quote")}</CTAButton>
    </section>
  );
}

// CASOS
function Casos({t}:{t:(es:string,en:string)=>string}){
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-6">{t("Casos","Work")}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i=> (
          <div key={i} className="rounded-2xl overflow-hidden border border-white/10">
            <img src={`https://via.placeholder.com/1200x800/0B1020/ffffff?text=caso_${i}.jpg`} alt={`caso_${i}.jpg`} />
            <div className="p-5 bg-white/5">
              <h3 className="text-lg font-semibold">{t("Caso","Case")} #{i}</h3>
              <p className="text-sm opacity-80">{t("+38% leads en 30 días","+38% leads in 30 days")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// BLOG
function Blog({t}:{t:(es:string,en:string)=>string}){
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-6">Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {img:"blog_default.jpg", title:t("Cómo la IA transforma el vídeo","How AI transforms video")},
          {img:"blog_default.jpg", title:t("5 automatizaciones clave","5 key automations")},
          {img:"blog_default.jpg", title:t("Caso práctico de Make","Make practical case")},
        ].map((p,idx)=> (
          <article key={idx} className="rounded-2xl overflow-hidden border border-white/10">
            <img src={`https://via.placeholder.com/1200x800/0B1020/ffffff?text=${p.img}`} alt={p.img} />
            <div className="p-5 bg-white/5">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm opacity-80">{t("Resumen del artículo","Post summary")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// SOBRE
function Sobre({t}:{t:(es:string,en:string)=>string}){
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-6">{t("Sobre mí","About me")}</h1>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img className="rounded-2xl border border-white/10" src={`https://via.placeholder.com/1600x900/0B1020/ffffff?text=sobre_equipo.jpg`} alt="sobre_equipo.jpg" />
        <div className="space-y-3">
          <p className="opacity-90">{t("Soy [Tu Nombre], y ayudo a empresas a aprovechar la automatización y la IA audiovisual.","I'm [Your Name], and I help businesses leverage automation and audiovisual AI.")}</p>
          <ul className="list-disc list-inside opacity-80 text-sm">
            <li>Make, OpenAI, Airtable</li>
            <li>{t("Integraciones a medida","Custom integrations")}</li>
            <li>{t("Entrega rápida y medible","Fast and measurable delivery")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// CONTACTO
function Contacto({t}:{t:(es:string,en:string)=>string}){
  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-4">{t("Contacto","Contact")}</h1>
      <img className="rounded-2xl border border-white/10 mb-6" src={`https://via.placeholder.com/1600x900/0B1020/ffffff?text=contacto_hero.jpg`} alt="contacto_hero.jpg" />
      <p className="opacity-80 mb-4">{t("Completa el formulario para tu demo personalizada.","Fill the form to get your personalized demo.")}</p>
      <a href="https://tally.so/r/mBqDee" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-semibold">
        {t("Abrir formulario Tally","Open Tally form")}
      </a>
    </section>
  );
}

// LEGAL
function Legal({t}:{t:(es:string,en:string)=>string}){
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-extrabold">{t("Legal","Legal")}</h1>

      <Card title={t("Privacidad","Privacy Policy")}>
        <p className="text-sm opacity-90">{t("Resumen RGPD, datos recogidos, base legal, derechos ARCO, contacto.","GDPR summary, data collected, legal basis, user rights, contact.")}</p>
        <img className="mt-3 rounded-xl border border-white/10" src={`https://via.placeholder.com/1600x900/0B1020/ffffff?text=legal_hero.jpg`} alt="legal_hero.jpg" />
      </Card>

      <Card title={t("Términos y Condiciones","Terms & Conditions")}>
        <ul className="list-disc list-inside text-sm opacity-90 space-y-1">
          <li>{t("Uso permitido del sitio","Permitted use")}</li>
          <li>{t("Propiedad intelectual","Intellectual property")}</li>
          <li>{t("Limitación de responsabilidad","Liability limitation")}</li>
          <li>{t("Jurisdicción","Jurisdiction")}</li>
        </ul>
      </Card>
    </section>
  );
}

function Card({title, children}:{title:string; children:any}){
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function CTAButton({href, children, className}:{href:string; children:any; className?:string}){
  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 font-semibold ${className||""}`}>
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </a>
  );
}

function ChatbotBubble(){
  return (
    <button className="fixed bottom-5 right-5 w-14 h-14 rounded-full text-white shadow-lg"
            style={{background: "linear-gradient(135deg,#6B4EFF,#2AA5C8)"}}
            title="Chatbot OpenAI">
      <svg width="24" height="24" viewBox="0 0 24 24" className="mx-auto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h6"/>
        <path d="M14 3h7v7"/>
        <path d="M21 3l-7 7"/>
      </svg>
    </button>
  );
}

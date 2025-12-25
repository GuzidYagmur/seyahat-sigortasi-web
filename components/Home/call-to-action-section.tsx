import { ShieldCheck } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section
      className="relative w-full py-24"
      style={{
        backgroundImage: "url('/images/passaport.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-xs"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-6">
          GÜRCİSTAN SEYAHAT <br />
          SAĞLIK SİGORTASI ALMAK
        </h2>

        <button
          className="
            inline-block
            px-10 py-3
            rounded-full
            font-bold
            text-gray-900
            bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300
            shadow-[0_8px_20px_rgba(0,0,0,0.35)]
            hover:from-gray-300 hover:via-gray-200 hover:to-gray-400
            hover:scale-105
            transition-all duration-300
            mb-6
            cursor-pointer
            active:scale-95
          "
        >
          HEMEN TEKLİF AL & BAŞVUR
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-200">
          <ShieldCheck className="h-4 w-4" />
          <span>Yetkili Sigorta Acentesi Güvencesiyle</span>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full py-20 bg-[url('/images/background.jpg')] bg-cover bg-center"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-xs"></div>

      <div className=" relative z-10 mx-auto max-w-7xl px-4 text-center">
        <h1 className="text-center ml-0 md:text-left  text-2xl font-bold text-blue-900 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] sm:text-2xl md:text-4xl md:ml-25 leading-snug">
          <span className="block">GÜRCİSTAN SEYAHAT SAĞLIK</span>
          <span className="block">SİGORTASI ALMAK</span>
        </h1>

        <p className="mt-4 text-center ml-0 md:text-left md:ml-25 font-semibold text-cyan-950 text-lg">
          Güvenli bir seyahat için poliçenizi hemen yaptırın!
        </p>

        <div className="mt-6 text-center ml-0 md:text-left md:ml-25">
          <button
            className="
              px-8 py-3
              rounded-full
              font-bold
              text-gray-900
              bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300
              shadow-[0_8px_20px_rgba(0,0,0,0.25)]
              hover:from-gray-300 hover:via-gray-200 hover:to-gray-400
              hover:scale-105
              transition-all duration-300
              active:scale-95
              cursor-pointer
            "
          >
            Hemen Teklif Al
          </button>
        </div>
      </div>
    </section>
  );
}

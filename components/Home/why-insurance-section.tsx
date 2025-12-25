import { ShieldCheck, FileText, Smartphone } from "lucide-react";

export default function WhyInsuranceSection() {
  return (
    <section className="w-full bg-white py-15">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-14">
          NEDEN GEREKLİ & NASIL ALINIR?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center px-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <FileText className="h-7 w-7 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              SINIRDA ZORUNLULUK
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vize başvurusu ve girişte sorun yaşamamak için gereklidir.
            </p>
          </div>

          <div className="text-center px-6 border-l border-r border-gray-200">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <ShieldCheck className="h-7 w-7 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              SAĞLIK GÜVENCESİ
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Acil durumlarda yüksek tedavi masraflarını karşılar.
            </p>
          </div>

          <div className="text-center px-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Smartphone className="h-7 w-7 text-gray-700" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              KOLAY & HIZLI ONLINE
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Anında teklif al, poliçeni dijital olarak indir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

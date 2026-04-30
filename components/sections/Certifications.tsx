import Image from "next/image";
import { getT } from "@/lib/i18n-server";
import { fetchCertifications } from "@/lib/api";

// Statická loga jako fallback (soubory v /public/logos/)
const STATIC_CERTS = [
  { id: 1, name: "EUROVENT", logo_url: "/logos/logoEUROVENT.png", url: "https://www.eurovent-certification.com/" },
  { id: 2, name: "TÜV", logo_url: "/logos/logoTUV.jpg", url: "https://www.tuv.com/" },
  { id: 3, name: "PAVUS", logo_url: "/logos/logoPAVUS.png", url: "https://www.pavus.cz/" },
  { id: 4, name: "VÚPS", logo_url: "/logos/logoVUPS.png", url: "https://www.vups.cz/" },
  { id: 5, name: "FTZÚ", logo_url: "/logos/logoFTZU.jpg", url: "https://www.ftzu.cz/" },
  { id: 6, name: "Efectis", logo_url: "/logos/logoEfectis.jpg", url: "https://efectis.com/" },
  { id: 7, name: "EPD", logo_url: "/logos/logoEPD.png", url: "https://www.epd-norge.no/" },
  { id: 8, name: "INDESEN", logo_url: "/logos/logoINDESEN.png", url: "https://www.indesen.cz/" },
  { id: 9, name: "MagiCAD", logo_url: "/logos/logoMagiCAD.jpg", url: "https://www.magicad.com/" },
  { id: 10, name: "MagiCloud", logo_url: "/logos/logoMagiCloud.jpg", url: "https://www.magicloud.com/" },
  { id: 11, name: "RLT", logo_url: "/logos/logoRLT.jpg", url: "https://www.rlt-produkte.de/" },
  { id: 12, name: "CCPI FD", logo_url: "/logos/logoCCPI_FD.png", url: "https://www.ccpi.eu/" },
  { id: 13, name: "CCPI SCD", logo_url: "/logos/logoCCPI_SCD.png", url: "https://www.ccpi.eu/" },
  { id: 14, name: "DIvB", logo_url: "/logos/logoDIvB.png", url: "https://www.divb.cz/" },
];

export default async function Certifications({ locale }: { locale: string }) {
  const t = await getT(locale, "certifications");
  const apiCerts = await fetchCertifications(locale);
  const certs = apiCerts.length > 0 ? apiCerts : STATIC_CERTS;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-eurostile text-3xl sm:text-4xl font-bold text-brand-blue">
            {t("title")}
          </h2>
          <div className="mt-2 w-16 h-1 bg-brand-green" />
        </div>

        <div className="flex flex-wrap gap-5 items-center">
          {certs.map((cert) => (
            <a
              key={cert.id}
              href={cert.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={cert.name}
              className="flex items-center justify-center h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-200"
            >
              <Image
                src={cert.logo_url}
                alt={cert.name}
                width={120}
                height={60}
                className="object-contain h-12 w-auto max-w-[120px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

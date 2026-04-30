import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import News from "@/components/sections/News";
import Certifications from "@/components/sections/Certifications";

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <main>
      <Hero />
      <Products locale={locale} />
      <News locale={locale} />
      <Certifications locale={locale} />
    </main>
  );
}

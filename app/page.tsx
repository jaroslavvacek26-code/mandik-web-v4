import { redirect } from "next/navigation";

// Root redirect – přesměruje na výchozí lokalizaci
export default function RootPage() {
  redirect("/cs");
}

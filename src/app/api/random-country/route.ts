import { getCountries } from "@/lib/countries";

export async function GET() {
  const countries = getCountries();
  const country = countries[Math.floor(Math.random() * countries.length)];
  return Response.json({ country });
}

import { getCountries } from "@/lib/countries";

export async function GET() {
  return Response.json({ countries: getCountries() });
}

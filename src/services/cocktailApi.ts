import { getJSON } from "./http";
import type { ICocktail } from "../models/Cocktail";
import { mapRawCocktailData } from "../utils/mapRawCocktailData";

const BASE = "https://www.thecocktaildb.com/api/json/v1/1";

type RawResponse = { drinks: any[] | null };

/**
 * Hämtar en slumpad cocktail.
 */
export async function fetchRandomCocktail(): Promise<ICocktail> {
  const url = `${BASE}/random.php`;
  const data = await getJSON<RawResponse>(url);

  if (!data.drinks || data.drinks.length === 0) {
    throw new Error("No random cocktail found");
  }

  return mapRawCocktailData(data.drinks[0]);
}

/**
 * Sök cocktails via namn.
 */
export async function searchCocktailsByName(name: string): Promise<ICocktail[]> {
  const q = name.trim();
  if (!q) return []; // Tom söksträng => ingen request

  // Encode söksträngen så att den kan skickas i en URL
  // T.ex. "Gin & Tonic" => "Gin%20%26%20Tonic"
  // (annars skulle & och mellanslag förstöra URL:en)
  
  const url = `${BASE}/search.php?s=${encodeURIComponent(q)}`;
  const data = await getJSON<RawResponse>(url);

  // Inga träffar => API returnerar { drinks: null }
  if (!data.drinks) return [];

  return data.drinks.map(mapRawCocktailData);
}

/**
 * Hämta full info för en cocktail via ID.
 */
export async function fetchCocktailById(id: string): Promise<ICocktail> {
  const cleanId = String(id).trim();
  if (!cleanId) throw new Error("Missing cocktail id");

  const url = `${BASE}/lookup.php?i=${encodeURIComponent(cleanId)}`;
  const data = await getJSON<RawResponse>(url);

  if (!data.drinks || data.drinks.length === 0) {
    throw new Error("Cocktail not found");
  }

  return mapRawCocktailData(data.drinks[0]);
}

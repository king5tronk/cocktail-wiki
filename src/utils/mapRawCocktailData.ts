/**
 * Since the JSON object representing a cocktail is a bit
 * oddly structured by the API developers, here’s a helper
 * function that converts the awkward data into a more
 * manageable object. It removes all ingredients and measures
 * that are null, as well as a number of attributes that
 * you won’t need.
 */
import type { ICocktail } from "../models/Cocktail";



export function mapRawCocktailData(rawCocktail: any): ICocktail {
  return {
    id: rawCocktail.idDrink,
    name: rawCocktail.strDrink,
    tags: rawCocktail.strTags ? rawCocktail.strTags.split(',') : [],
    category: rawCocktail.strCategory,
    alcoholic: rawCocktail.strAlcoholic === 'Alcoholic',
    glass: rawCocktail.strGlass,
    instructions: rawCocktail.strInstructions,
    thumbnail: rawCocktail.strDrinkThumb,
    ingredients: Array.from({ length: 15 })
      .map((_, i) => ({
        ingredient: rawCocktail[`strIngredient${i + 1}`],
        measure: rawCocktail[`strMeasure${i + 1}`],
      }))
      .filter((item) => item.ingredient),
  };
}
interface IIngredient {
  ingredient: string;
  measure: string | null;
}

export interface ICocktail {
  id: string;
  name: string;
  tags: string[];
  category: string;
  alcoholic: boolean;
  glass: string;
  instructions: string;
  thumbnail: string | null;
  ingredients: IIngredient[];
}
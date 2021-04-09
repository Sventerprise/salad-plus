export interface Recipe {
  id: string;
  name: string;
  description: string;
  img: string;
  type: RecipeType;
}

export type RecipeType = "sandwich" | "salad" | "side" | "dessert" | "drink"

export type Recipes = Recipe[]

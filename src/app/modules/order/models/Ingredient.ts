export interface Ingredient {
  id: string,
  name: string
  image: string
  itemGroup: string
  type: string
}

export type Ingredients = string[]

export type IngredientList = Ingredient[]

// group (bread, meat, etc.) properties
export interface IngredientType {
  [id: string]: {
    price: string,
    selectType: "single" | "multiple"
  }
}

export type IngredientTypes = IngredientType[]

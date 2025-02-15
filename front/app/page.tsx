'use client';

import CardGridList from "@/components/CardGridList";
import CoverList from "@/components/CoverList";
import useFilter from "@/hooks/useFilter";
import { IIngredient, ICuisine } from "@/recoil/interfaces";
import { useEffect, useState } from "react";
import CardSlideList from "../components/CardSlideList";

  // Mock Data
  export const ingredientsList= ()=> {
    const result = [];

    for (let i = 1; i <= 20; i++) {
      result.push({
        id: i,
        image: `https://source.unsplash.com/300x200?fruit,${i}`,
        name: `Ingredient ${i}`,
      });
    }

    return result;
  }

export default function Home() {
  const { checkedList } = useFilter();
  const [filteredCuisineList, setFilteredCuisineList] = useState<ICuisine[]>([]);


  const cuisineList = ()=> {
    const result = [];

    for (let i = 1; i <= 15; i++) {
      result.push({
        id: i,
        image: `https://source.unsplash.com/random/300x200?food cuisine,${i}`,
        name: `Healthy Food ${i}`,
        ingredients: [{ id: i, name: `Ingredient ${i}`}, { id: i + 1, name: `Ingredient ${i + 1}`}],
        description: `Description ${i}`,
        season: `Spring`,
      });
    }

    return result;
  }

  useEffect(() => {
    const checkedIngredientIds = checkedList.map((item: IIngredient) => item.id);
    const filteredCuisines = cuisineList().filter((cuisine: ICuisine) => {
      return cuisine.ingredients.some((ingredient: IIngredient) => checkedIngredientIds.includes(ingredient.id));
      }
    );

    setFilteredCuisineList(filteredCuisines);
  }, [checkedList]);

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold pl-7 pb-3">Seasonal Recommend</h1>
          <CoverList itemList={cuisineList().slice(5)} />
        </div>
      </div>
      <div className="sticky top-0 z-20 bg-black pb-10">
        <h1 className="text-2xl font-bold pb-3 pt-20">Select Ingredients</h1>
          <CardSlideList isCheckable={true} itemList={ingredientsList()} />
      </div>
      <div className="z-0 pt-10">
        <h1 className="text-2xl font-bold pb-3">Cuisines</h1>
        <CardGridList itemList={checkedList.length ? filteredCuisineList : cuisineList()} />
      </div>
    </main>
  );
}

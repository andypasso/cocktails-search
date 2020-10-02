import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'

export default function SingleCocktail() {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)

  useEffect(() => {
    setLoading(true)
    async function getCocktail(){
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()
        console.log(data.drinks[0])
        if(data.drinks){
          const{ strDrink:name, strDrinkThumb:image, strAlcoholic:info, strCategory:category, strGlass:glass, strInstructions:instructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10,} = data.drinks[0];
          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10]

          const newCocktail = {name, image, info, category, glass, instructions, ingredients }
          setCocktail(newCocktail)

        }else{
          setCocktail(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getCocktail()
  }, [id])

if (loading){
  return <h2 className='section-title'>Loading...</h2>
}
if (!cocktail){
  return <h2 className='section-title'>no cocktail to display</h2>

}

return <section className='section cocktail-section'>
  <Link to='/' className= 'btn btn-primary'>back home</Link>
  <h2 className='section-title'>{cocktail.name}</h2>
  <div className='drink'>
    <img src={cocktail.image} alt={cocktail.name} />
    <div className='drin-info'>
    <p>name : {cocktail.name} </p>
    <p>category : {cocktail.category} </p>
    <p>info : {cocktail.info} </p>
    <p>glass : {cocktail.glass} </p>
    <p>instructions : {cocktail.instructions} </p>
    <p>
      ingredients: {
        cocktail.ingredients.map((item, index)=> <span key={index}>{item}</span>
        )
        
      }
    </p>
    </div>

  </div>
</section>
  
}

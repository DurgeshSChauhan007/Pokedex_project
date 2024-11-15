// import { useEffect, useState } from "react";

// function PokemonList() {
//     const [x, setX] = useState(0);
//     const [y, setY] = useState(0);

//     useEffect(() => {
//         console.log("effect called");
//     }, []);
//     return (
//         <>
//             <div>
//                 X: {x} <button onClick={() => setX(x + 1)}>Inc</button>
//             </div>
//             <div>
//                 Y: {y} <button onClick={() => setY(y + 1)}>Inc</button>
//             </div>
//         </>
//     )
// }

// export default PokemonList;

import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    const [PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResults = response.data.results;
        console.log(response.data);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) =>
        {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name : pokemon.name,
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types : pokemon.types
            };
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [])
    
    return (
        <>
           <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
           {(isLoading) ? "Loading...." : 
               PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
           </div>
        </>
    )
}

export default PokemonList;
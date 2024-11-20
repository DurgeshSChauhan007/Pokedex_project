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
    const [Pokedex, setPokedex] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(Pokedex);      // this download list of 20 pokemon
        const pokemonResults = response.data.results;       // we get the array of pokemon from result

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        
        // Iterating over the array of pokemons and using their URL, to create an array of 
        // promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // Passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);     

        console.log(pokemonData);
        
        // Now iterate on the data of each pokemon and extract id, name, images, types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
                types: pokemon.types,
            };
        });

        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [Pokedex]);

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div className="pokemon-wrapper">
                    {isLoading
                        ? "Loading...."
                        : PokemonList.map((p) => (
                              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                          ))}
                </div>
                <div className="controls">
                    <button disabled={!prevUrl} onClick={() => setPokedex(prevUrl)}>
                        Prev
                    </button>
                    <button disabled={!nextUrl} onClick={() => setPokedex(nextUrl)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default PokemonList;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./PokemonList.css";
// import Pokemon from "../Pokemon/Pokemon";

// function PokemonList() {
//     // State to hold the list of Pokémon data
//     const [PokemonList, setPokemonList] = useState([]);
    
//     // State to track the loading status
//     const [isLoading, setIsLoading] = useState(true);
    
//     // State to hold the current Pokedex API URL
//     const [Pokedex, setPokedex] = useState('https://pokeapi.co/api/v2/pokemon');
    
//     // States to hold URLs for the next and previous pages
//     const [nextUrl, setNextUrl] = useState('');
//     const [prevUrl, setPrevUrl] = useState('');

//     // Function to fetch and process Pokémon data from the API
//     async function downloadPokemons() {
//         setIsLoading(true); // Start loading
        
//         // Fetch a batch of Pokémon metadata (name, URL) from the API
//         const response = await axios.get(Pokedex);
//         const pokemonResults = response.data.results; // Extract the array of Pokémon metadata
        
//         // Update next and previous page URLs for navigation
//         setNextUrl(response.data.next);
//         setPrevUrl(response.data.previous);
        
//         // Create an array of promises to fetch detailed data for each Pokémon
//         const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        
//         // Resolve all promises to get the detailed data of all 20 Pokémon
//         const pokemonData = await axios.all(pokemonResultPromise);

//         // Extract and structure the required data (id, name, image, types) for rendering
//         const res = pokemonData.map((pokeData) => {
//             const pokemon = pokeData.data;
//             return {
//                 id: pokemon.id, // Pokémon ID
//                 name: pokemon.name, // Pokémon name
//                 // Use Dream World sprite if available, otherwise fall back to shiny sprite
//                 image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_shiny,
//                 types: pokemon.types, // Pokémon types
//             };
//         });

//         // Update the Pokémon list state with the fetched data
//         setPokemonList(res);
//         setIsLoading(false); // End loading
//     }

//     // Effect to fetch data whenever the Pokedex URL changes
//     useEffect(() => {
//         downloadPokemons();
//     }, [Pokedex]);

//     return (
//         <>
//             <div className="pokemon-list-wrapper">
//                 {/* Display either a loading message or the list of Pokémon */}
//                 <div className="pokemon-wrapper">
//                     {isLoading
//                         ? "Loading...."
//                         : PokemonList.map((p) => (
//                               // Render each Pokémon using the Pokemon component
//                               <Pokemon name={p.name} image={p.image} key={p.id} />
//                           ))}
//                 </div>
//                 {/* Navigation controls for previous and next pages */}
//                 <div className="controls">
//                     <button disabled={!prevUrl} onClick={() => setPokedex(prevUrl)}>
//                         Prev
//                     </button>
//                     <button disabled={!nextUrl} onClick={() => setPokedex(nextUrl)}>
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default PokemonList;

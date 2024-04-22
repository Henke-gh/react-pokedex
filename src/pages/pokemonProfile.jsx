import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PokemonProfile() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error, e.g., set an error state to display a message to the user
      });
  }, [pokemonName]);

  function formatPokemonOrder(order) {
    return order < 10 ? `00${order}` : order < 100 ? `0${order}` : `${order}`;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="pokemon-card">
      {pokemon && ( // Render only when pokemon is not null
        <>
          <h2>{capitalizeFirstLetter(pokemonName)}</h2> <p>No. {formatPokemonOrder(pokemon.id)}</p>
          <div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={`Image of ${pokemonName}`}
            />
            <p>Height: {pokemon.height} m</p>
            <p>Weight: {pokemon.weight} kg</p>
            <p>Types:</p>

            {pokemon.types.map((type, index) => (
              <div>{type.type.name}</div>
            ))}

            <p>Stats:</p>

            {pokemon.stats.map((stat, index) => (
              <div>
                {stat.stat.name} + {stat.base_stat}
              </div>
            ))}

            <div className="audio">
              <audio controls>
                <source src={pokemon.cries.legacy} type="audio/ogg" />
              </audio>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonProfile;

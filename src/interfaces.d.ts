interface UserData {
  name: string;
  email: string;
  weatherKey: string;
  favPokemon: string;
}

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
}
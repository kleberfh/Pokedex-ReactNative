interface Pokemon {
  id?: string,
  name: string,
  url: string,
  image?: string
}

interface PokemonTypes {
  slot: number,
  type: {
    url: string,
    name: string
  }
}

interface PokemonAbility {
  is_hidden: false,
  slot: number,
  ability: {
    url: string,
    name: string,
  }
}

interface PokemonForm {
  url: string,
  name: string,
}

interface PokemonGameIndices {
  game_index: number,
  version: {
    url: string,
    name: string,
  }
}

interface PokemonHeldItem {
  item: {
    url: string,
    name: string,
  },
  version_details: {
    rarity: number,
    version: {
      url: string,
      name: string,
    }
  }
}

interface PokemonMove {
  move: {
    url: string,
    name: string,
  }
  version_group_details: {
    level_learned_at: number,
    move_learn_method: {
      url: string,
      name: string,
    },
    version_group: {
      url: string,
      name: string,
    }
  }
}

interface PokemonSpecie {
  url: string,
  name: string,
}

interface PokemonSprites {
  back_default: string | null,
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}

interface PokemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

interface PokemonData {
  abilities: PokemonAbility[],
  forms: PokemonForm[],
  game_indices: PokemonGameIndices[],
  height: number,
  held_items: PokemonHeldItem[],
  id: string,
  is_default: boolean,
  location_area_encounters: string,
  moves: PokemonMove[],
  name: string,
  order: number,
  species: PokemonSpecie | PokemonSpecie[],
  sprites: PokemonSprites,
  stats: PokemonStats[],
  types: PokemonTypes[],
  weight: number,
}

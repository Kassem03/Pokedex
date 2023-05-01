const pokemonapiURL = 'https://pokemonsapi.herokuapp.com';

function Pokemons(data) {
  let a = '';
  for (let i = 0; i < data.length; i += 1) {
    const poketypes = [];
    (data[i].poketypes).forEach((e) => {
      poketypes.push(e.name);
    });
    a += `<div class="column is-3" "column is-full-tablet" "column is-half-mobile">
                <a href = "./details.html?pokemonId=${data[i].pokemonId}"
                <div class="card large" >
                    <div class="card-image" style = "background-color : ${data[i].color}">
                        <figure class="image is-square">
                            <img src="${data[i].imgURL}" 
                                  alt="${data[i].name}">
                        </figure>
                    </div>
                    <div class="card-content" style = "background-color : ${data[i].color}">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4 no-padding has-text-centered has-text-weight-bold">${data[i].name}</p>
                                <p class="subtitle is-6 has-text-black"> Species : ${data[i].species.name} <br>
                                                                          Habitats : ${data[i].habitat.name} <br>
                                                                          Poketypes : ${poketypes}</p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>`;
  }
  return a;
}

export { pokemonapiURL, Pokemons };

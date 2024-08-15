const fecthPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status ==200){
        const dados = await APIResponse.json();
        return dados     
    }
}
//variaveis
const pokemonEscolhido = document.querySelector(".form");
const pokemonInput = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const nomePokemon =  document.querySelector(".pokemon__name")
const idPokemon = document.querySelector(".pokemon__number")
const imagemPokemon = document.querySelector(".pokemon__image")

let searchPokemon = 1;

const redenderPokemon = async(pokemon) =>{

   nomePokemon.innerHTML = `Carregando...`
    idPokemon.innerHTML = ``

    const data = await fecthPokemon(pokemon)

    if(data){
    imagemPokemon.style.display = 'block';
    nomePokemon.innerHTML = `${data.name}`
    idPokemon.innerHTML = `${data.id}`
    imagemPokemon.src = `${data.sprites.versions['generation-v']['black-white'].animated.front_default}`
    searchPokemon = data.id
    } else{
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'DIGITA CERTO PORRA'
        }
        if (data.sprites.versions['generation-v']['black-white'].animated.front_default) {
            imagemPokemon.src = `${data.sprites.versions['generation-v']['black-white'].animated.front_default}`;
        } else {
            imagemPokemon.src = `${data.sprites.front_default}`;
        }
}


pokemonEscolhido.addEventListener('submit', (event)=>{
    event.preventDefault();

    redenderPokemon(pokemonInput.value.toLowerCase());
    pokemonInput.value = '';
});


buttonNext.addEventListener('click', ()=>{
    searchPokemon +=1
    
    redenderPokemon(searchPokemon)
});

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
    searchPokemon -=1
    redenderPokemon(searchPokemon)
    }else{

    }
});
redenderPokemon(searchPokemon);

function pokemonSurpresa(){
    const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
    redenderPokemon(numeroAleatorio)
}

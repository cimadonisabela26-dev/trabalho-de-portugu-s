const musicas = [
    {
        titulo: "MACUNAÍMA E O FIM DO MUNDO",
        artista: "Ana, Arthur, Eduarda, Gustavo, Isabela e Luiza",
        arquivo: "musica1.mp3",
        capa: "capas/capa1.jpg"
    }
  ];

let indice = 0;

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const like = document.getElementById("like");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

function carregarMusica(i){

    audio.src = musicas[i].arquivo;

    cover.src = musicas[i].capa;

    title.innerText = musicas[i].titulo;

    artist.innerText = musicas[i].artista;

    atualizarPlaylist();

}

function atualizarPlaylist(){

    playlist.innerHTML="";

    musicas.forEach((m,index)=>{

        const li=document.createElement("li");

        li.innerText=m.titulo;

        if(index===indice){

            li.classList.add("active");

        }

        li.onclick=()=>{

            indice=index;

            carregarMusica(indice);

            tocar();

        }

        playlist.appendChild(li);

    });

}

function tocar(){

    audio.play();

    play.innerHTML='<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}

function pausar(){

    audio.pause();

    play.innerHTML='<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}

play.onclick=()=>{

    if(audio.paused){

        tocar();

    }else{

        pausar();

    }

}

next.onclick=()=>{

    indice++;

    if(indice>=musicas.length){

        indice=0;

    }

    carregarMusica(indice);

    tocar();

}

prev.onclick=()=>{

    indice--;

    if(indice<0){

        indice=musicas.length-1;

    }

    carregarMusica(indice);

    tocar();

}

volume.oninput=()=>{

    audio.volume=volume.value/100;

}

audio.addEventListener("timeupdate",()=>{

    progress.max=audio.duration||0;

    progress.value=audio.currentTime;

    currentTime.innerText=formatar(audio.currentTime);

    duration.innerText=formatar(audio.duration);

});

progress.oninput=()=>{

    audio.currentTime=progress.value;

}

audio.onended=()=>{

    next.click();

}

function formatar(segundos){

    if(isNaN(segundos)) return "0:00";

    let min=Math.floor(segundos/60);

    let seg=Math.floor(segundos%60);

    if(seg<10) seg="0"+seg;

    return min+":"+seg;

}

like.onclick=()=>{

    like.classList.toggle("liked");

    if(like.classList.contains("liked")){

        like.innerHTML='<i class="fa-solid fa-heart"></i>';

    }else{

        like.innerHTML='<i class="fa-regular fa-heart"></i>';

    }

}

carregarMusica(indice);

audio.volume=0.8;
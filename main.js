const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

const musica = document.getElementById("musicaFondo");
let musicaIniciada = false;

// Partículas suaves con forma de pétalo que caen lentamente.
const fondoBrillante = document.querySelector(".cascada-brillante");
if (fondoBrillante) {
    for (let i = 0; i < 24; i++) {
        const petalo = document.createElement("span");
        petalo.className = "petalo-brillante";
        petalo.style.setProperty("--x", `${Math.random() * 100}%`);
        petalo.style.setProperty("--duracion", `${12 + Math.random() * 14}s`);
        petalo.style.setProperty("--retraso", `${-Math.random() * 24}s`);
        petalo.style.setProperty("--tamano", `${4 + Math.random() * 5}px`);
        petalo.style.setProperty("--deriva", `${-45 + Math.random() * 90}px`);
        fondoBrillante.appendChild(petalo);
    }
}

// Pequeña explosión de corazones tipo confeti al abrir el sobre.
function crearLluviaDeCorazones() {
    const capa = document.createElement("div");
    capa.className = "confeti-corazones";
    capa.setAttribute("aria-hidden", "true");

    const corazones = ["♥", "♡", "♥", "❤"];
    for (let i = 0; i <  30; i++) {
        const corazon = document.createElement("span");
        corazon.className = "corazon-confeti";
        corazon.textContent = corazones[Math.floor(Math.random() * corazones.length)];
        corazon.style.setProperty("--x", `${35 + Math.random() * 30}%`);
        corazon.style.setProperty("--vuelo-x", `${-220 + Math.random() * 440}px`);
        corazon.style.setProperty("--vuelo-y", `${-220 - Math.random() * 260}px`);
        corazon.style.setProperty("--giro", `${-240 + Math.random() * 480}deg`);
        corazon.style.setProperty("--duracion", `${1.8 + Math.random() * 1.5}s`);
        corazon.style.setProperty("--retraso", `${Math.random() * 0.35}s`);
        corazon.style.setProperty("--tamano", `${12 + Math.random() * 17}px`);
        capa.appendChild(corazon);
    }

    document.body.appendChild(capa);
    setTimeout(() => capa.remove(), 4200);
}

// El navegador permite iniciar el audio gracias al clic con el que se abre el sobre.
function iniciarMusica() {
    if (musicaIniciada || !musica) return;

    musicaIniciada = true;
    musica.volume = 0.5;
    musica.currentTime = 20; // Comienza en 0:20

    const reproduccion = musica.play();
    if (reproduccion !== undefined) {
        reproduccion.catch((error) => {
            console.log("El navegador no permitió reproducir el audio:", error);
        });
    }
}

// Detener la canción al llegar a 1:30.
if (musica) {
    musica.addEventListener("timeupdate", () => {
        if (musica.currentTime >= 90) {
            musica.pause();
            musica.currentTime = 90;
        }
    });
}

document.addEventListener("click", (e) => {
    if(e.target.matches(".sobre") ||
       e.target.matches(".solapa-derecha") ||
       e.target.matches(".solapa-izquierda") ||
       e.target.matches(".corazon")) {

        iniciarMusica();
        crearLluviaDeCorazones();

        envoltura.classList.toggle("abierto");
        envoltura.classList.add("desactivar-sobre");

        if (!carta.classList.contains("abierta"))  {
            setTimeout(() => {
                carta.classList.add("mostrar-carta");

                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
            }, 1000);
        }
    } else if (e.target.matches(".envoltura-sobre *")) {
        envoltura.classList.remove("abierto");
        envoltura.classList.remove("desactivar-sobre");

        if (carta.classList.contains("abierta")) {
            carta.classList.add("cerrando-carta");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});

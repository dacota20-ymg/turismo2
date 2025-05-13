// chatbot/chatbot.js
let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => data = json);

function toggleChat() {
  const chat = document.getElementById("chat-container");
  chat.classList.toggle("oculto");
}

// Función para enviar el mensaje
function enviarMensaje() {
  const input = document.getElementById("userInput");
  const mensaje = input.value.trim();
  if (mensaje === "") return;

  agregarMensaje("Tú", mensaje);
  input.value = "";

  let encontrado = false;
  for (let item of data) {
    if (mensaje.toLowerCase().includes(item.pregunta)) {
      agregarMensaje("TuriBot", item.respuesta);
      if (item.imagen) {
        agregarImagen(item.imagen);
      }
      if (item.mapa) {
        agregarMensaje("TuriBot", `<a href="${item.mapa}" target="_blank">📍 Ver ubicación</a>`);
      }
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    agregarMensaje("TuriBot", "Lo siento, no encontré información sobre eso. Intenta con otra ciudad o lugar.");
  }
}

// Agregar un mensaje al chat
function agregarMensaje(autor, texto) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${autor}:</strong> ${texto}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// Agregar una imagen al chat
function agregarImagen(ruta) {
  const box = document.getElementById("chat-box");
  const img = document.createElement("img");
  img.src = ruta;
  img.style.width = "100%";
  img.style.marginTop = "5px";
  box.appendChild(img);
}

// Detectar cuando el usuario presiona Enter para enviar el mensaje
document.getElementById("userInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se añada una nueva línea
    enviarMensaje(); // Llamar a la función para enviar el mensaje
  }
});


<script>
  const images = document.querySelectorAll(".carousel-img");
  let current = 0;

  setInterval(() => {
    images[current].classList.remove("opacity-100");
    images[current].classList.add("opacity-0");
    current = (current + 1) % images.length;
    images[current].classList.remove("opacity-0");
    images[current].classList.add("opacity-100");
  }, 4000);
</script>

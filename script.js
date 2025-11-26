let carrito = [];

function getExtras(id) {
  const color = document.getElementById(`color-${id}`).value;
  const texto = document.getElementById(`texto-${id}`).value.trim();
  return `Color: ${color}${texto ? ', Texto: ' + texto : ''}`;
}

function actualizarPreview(id) {
  const color = document.getElementById(`color-${id}`).value;
  const texto = document.getElementById(`texto-${id}`).value;
  const preview = document.getElementById(`preview-${id}`);
  preview.style.backgroundColor = color;
  preview.textContent = texto || id.charAt(0).toUpperCase() + id.slice(1);
}

function agregarAlCarrito(producto, precio, extra) {
  carrito.push({ producto, precio, extra });
  mostrarCarrito();
  mostrarToast(`${producto} personalizado añadido 🎁`);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
  mostrarToast("Carrito vaciado 🛒");
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    lista.innerHTML += `
      <li>
        <strong>${item.producto}</strong> - Bs. ${item.precio}<br>
        <em>${item.extra}</em>
        <div class="acciones">
          <button onclick="eliminarDelCarrito(${index})">Quitar</button>
        </div>
      </li>
    `;
  });

  totalEl.textContent = total;
  contador.textContent = carrito.length;
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}


function seleccionarObjeto(objeto) {
  const tienda = document.getElementById("tienda");
  const contenedor = document.getElementById("contenedor-personalizacion");
  tienda.style.display = "block";
  contenedor.innerHTML = `
    <div class="producto">
      <div class="vista-previa" id="preview-${objeto}" style="background-color:#F36C3A;">${objeto}</div>
      <h3>${capitalizar(objeto)} Personalizado</h3>
      <p><strong>Bs. 50</strong></p>
      <label>Color:</label>
      <input type="color" id="color-${objeto}" value="#F36C3A" onchange="actualizarPreview('${objeto}')">
      <label>Texto o nombre:</label>
      <input type="text" id="texto-${objeto}" placeholder="Ej: Tu frase aquí" oninput="actualizarPreview('${objeto}')">
      <button onclick="agregarAlCarrito('${capitalizar(objeto)} Personalizado', 50, getExtras('${objeto}'))">Añadir</button>
    </div>
  `;
  tienda.scrollIntoView({ behavior: "smooth" });
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

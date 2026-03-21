import { auth, db } from "./firebase.js";
import { mostrarPopup } from "./popup.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    const password = document.getElementById('password');
    const type = password.getAttribute("type") === "password" ? "text" : "password";

    password.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});


document.getElementById("agregar_empleado_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const tipo = document.getElementById("tipo").value.trim();

        const credenciales = await createUserWithEmailAndPassword(auth, email, password);
        const user = credenciales.user;

        const usuario = {
            uid: user.uid,
            name: name,
            email: email,
            password: password, //Por el momento tendrá la contraseña en el documento hasta que terminemos bien con el proyecto
            tipo: tipo
        };

        await setDoc(doc(db, "usuarios", user.uid), usuario);

        mostrarPopup({
            encabezado: `Usuario Registrado`,
            mensaje: `
                <br>
                <p>Registrado como "${usuario.name}". Tipo de cuenta: ${usuario.tipo}.</p>
            `,
            botones: [
                { texto: "Confirmar", estilo: "btn-d" }
            ]
        });

    } catch (error) {
        console.error("Error al agregar usuario:", error);

        mostrarPopup({
            encabezado: `Error al agregar usuario`,
            mensaje: `
                <br>
                <p>Hubo un error al agregar el usuario: ${error}</p>
            `,
            botones: [
                { texto: "Confirmar", estilo: "btn-d" }
            ]
        });

    }
});
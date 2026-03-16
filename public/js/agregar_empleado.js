import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Mostrar / ocultar contraseña
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";

    passwordInput.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});


document.getElementById("agregar_empleado_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const tipo = document.getElementById("tipo").value;

    try {

        const emailToCheck = email;

        fetchSignInMethodsForEmail(auth, emailToCheck)
            .then((signInMethods) => {
                if (signInMethods && signInMethods.length > 0) {
                    console.log(`El correo ${emailToCheck} ya registrado.`);
                } else {
                    console.log(`El correo ${emailToCheck} no está registrado.`);
                }
            })
            .catch((error) => {
                console.error("Error al verificar el correo:", error);
            });


        const credenciales = await createUserWithEmailAndPassword(auth, email, password);
        const user = credenciales.user;

        const usuario = {
            uid: user.uid,
            name: name,
            email: email,//Por el momento tendrá la contraseña en el documento hasta que terminemos bien con el proyecto
            password: password,
            tipo: tipo
        };

        await setDoc(doc(db, "usuarios", user.uid), usuario);

        alert(`Registrado como: Usuario ${name}, Tipo: ${tipo}`);

    } catch (error) {
        console.error("Error al agregar usuario:", error);
        alert("Hubo un error al agregar el usuario. Por favor, intenta nuevamente.");
    }
});
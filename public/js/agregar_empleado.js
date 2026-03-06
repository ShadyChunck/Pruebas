import { auth, db } from "./js/firebase.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("agregar_empleado_form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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
            email: email,
            tipo: tipo
        };

        await addDoc(collection(db, "usuarios"), usuario);

        alert(`Registrado como: Usuario ${name}, Tipo: ${tipo}`);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        alert("Hubo un error al agregar el usuario. Por favor, intenta nuevamente.");
    }
});



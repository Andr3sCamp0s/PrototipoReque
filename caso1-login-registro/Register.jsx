import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoJP from "../assets/LogoJP.jpg";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // Simulación de usuarios ya registrados
  const usuariosRegistrados = [
    {
      correo: "admin@gmail.com",
      usuario: "admin"
    },
    {
      correo: "usuario@gmail.com",
      usuario: "usuario123"
    }
  ];

  async function manejarRegistro(e) {

    e.preventDefault();

    setMensaje("");

    // Validar campos vacíos
    if (
      correo.trim() === "" ||
      usuario.trim() === "" ||
      password.trim() === "" ||
      confirmarPassword.trim() === ""
    ) {

      setTipoMensaje("error");
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    // Validar formato correo
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {

      setTipoMensaje("error");
      setMensaje("El correo electrónico no tiene un formato válido.");
      return;
    }

    // Validar contraseña
    const caracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 6) {

      setTipoMensaje("error");
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!caracterEspecial.test(password)) {

      setTipoMensaje("error");
      setMensaje("La contraseña debe contener al menos un carácter especial.");
      return;
    }

    // Confirmar contraseña
    if (password !== confirmarPassword) {

      setTipoMensaje("error");
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    // Verificar duplicados
    let correoExiste = false;
    let usuarioExiste = false;

    for (let i = 0; i < usuariosRegistrados.length; i++) {

      if (usuariosRegistrados[i].correo === correo) {
        correoExiste = true;
      }

      if (usuariosRegistrados[i].usuario === usuario) {
        usuarioExiste = true;
      }
    }

    if (correoExiste) {

      setTipoMensaje("error");
      setMensaje("El correo ya se encuentra registrado.");
      return;
    }

    if (usuarioExiste) {

      setTipoMensaje("error");
      setMensaje("El nombre de usuario ya está en uso.");
      return;
    }

    // Registro exitoso
    try {

      const respuesta = await axios.post("http://localhost:3000/register", {
        correo: correo,
        usuario: usuario,
        password: password
      });

      setTipoMensaje("success");
      setMensaje(respuesta.data.mensaje);

      setCorreo("");
      setUsuario("");
      setPassword("");
      setConfirmarPassword("");

      // 🔥 NAVEGACIÓN CORRECTA
      setTimeout(() => {
        navigate("/reservar-cita");
      }, 800);

    } catch (error) {

      setTipoMensaje("error");

      if (error.response) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje("No se pudo conectar con el servidor.");
      }
    }
  }

  return (
   <div className="min-h-screen bg-red-500 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-red-200">

        <div className="flex justify-center mb-4">

          <img
            src={LogoJP}
            alt="Logo Centro Médico"
            className="w-32 drop-shadow-lg"
          />

        </div>

        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Centro Médico Juan Pablo II
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Creá tu cuenta dentro del sistema
        </p>

        <form onSubmit={manejarRegistro}>

          <div className="mb-4">

            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />

          </div>

          <div className="mb-4">

            <label className="block text-gray-700 mb-1">
              Nombre de usuario
            </label>

            <input
              type="text"
              placeholder="nombre_apellidos_123"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />

          </div>

          <div className="mb-1">

            <p className="text-sm text-gray-500 mb-4">
              La contraseña debe tener al menos 6 caracteres y un carácter especial como ! ? *.
            </p>

            <label className="block text-gray-700 mb-1">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />

          </div>

          <div className="mb-8">

            <label className="block text-gray-700 mb-1">
              Confirmar contraseña
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />

          </div>

          {
            mensaje !== "" && (
              <div
                className={
                  tipoMensaje === "error"
                    ? "bg-red-100 text-red-700 p-3 rounded-xl mb-4"
                    : "bg-green-100 text-green-700 p-3 rounded-xl mb-4"
                }
              >
                {mensaje}
              </div>
            )
          }

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-semibold shadow-md"
          >
            Registrarse
          </button>

        </form>

        <p className="text-center text-gray-500 mt-5">

          ¿Ya tenés una cuenta?{" "}

          <Link
            to="/login"
            className="text-red-600 hover:underline font-semibold"
          >
            Iniciar sesión
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
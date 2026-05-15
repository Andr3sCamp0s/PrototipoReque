import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoJP from "../assets/LogoJP.jpg";
import { supabase } from "../supabase";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

 async function manejarLogin(e) {

  e.preventDefault();

  setMensaje("");

  if (correo.trim() === "" || password.trim() === "") {

    setTipoMensaje("error");
    setMensaje("Todos los campos son obligatorios.");
    return;

  }

  try {

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("correo", correo.trim())
      .eq("password", password.trim());

    console.log(data);
    console.log(error);

    if (error) {

      setTipoMensaje("error");
      setMensaje(error.message);
      return;

    }

    if (data.length === 0) {

      setTipoMensaje("error");
      setMensaje("Credenciales incorrectas.");
      return;

    }

    setTipoMensaje("success");
    setMensaje("Inicio de sesión exitoso.");

    setTimeout(() => {

      navigate("/reservar-cita");

    }, 1000);

  } catch (error) {

    console.log(error);

    setTipoMensaje("error");
    setMensaje("No se pudo conectar con Supabase.");

  }
}

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 border border-red-200">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src={LogoJP} alt="Logo" className="w-32 drop-shadow-lg" />
        </div>

        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Centro Médico Juan Pablo II
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Iniciá sesión en tu cuenta
        </p>

        <form onSubmit={manejarLogin}>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500"
            />
          </div>

          {mensaje !== "" && (
            <div
              className={
                tipoMensaje === "error"
                  ? "bg-red-100 text-red-700 p-3 rounded-xl mb-4"
                  : "bg-green-100 text-green-700 p-3 rounded-xl mb-4"
              }
            >
              {mensaje}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-semibold shadow-md"
          >
            Iniciar sesión
          </button>

        </form>

        <p className="text-center text-gray-500 mt-5">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-red-600 hover:underline font-semibold">
            Registrate
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
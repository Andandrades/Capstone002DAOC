import React, { useState } from "react";
import Logo from "../../assets/img/Logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Components/API/UserContext";
import { toast } from "react-toastify";
import { Button } from "antd";

const LoginPage = () => {
  const { fetchAuthData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const goto = (url) => {
    navigate(`/${url}`);
  };

  const handleSubmit = async (e) => {
    setLoadingButton(true)
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        await response.json();
        setLoadingButton(false)
        toast.error("Usuario o contraseña invalidos.");
        return;
      }
      setLoadingButton(false)
      fetchAuthData();
    } catch (err) {
      setLoadingButton(false)

      toast.error("Usuario o contraseña invalidos.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center items-center pb-5 ">
          <img src={Logo} alt="Logo" className="w-50 h-auto" onClick={() => goto("")} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <Button
            htmlType="submit"
            loading={loadingButton}
            className="w-full !bg-purple-600 !text-white p-6 rounded-lg mb-4">
            Iniciar sesión
          </Button>
          <Button
            type="button"
            onClick={() => goto("Register")}
            className="w-full border-2 border-purple-600 text-purple-600 p-6 rounded-lg hover:bg-gray-100"
          >
            Registrarse
          </Button>

          <p className="mt-4 text-gray-600">
            ¿Olvidaste tu contraseña?{" "}
            <span
              onClick={() => goto("recover")}
              className="text-purple-600 cursor-pointer underline"
            >
              Recupérala aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

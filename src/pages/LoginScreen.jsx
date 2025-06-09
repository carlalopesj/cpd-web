import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import styles from "./LoginScreen.module.css";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await fetch("https://cpd-backend-shcz.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("profile_id", data.profile_id.toString());

        if (data.profile_id === 4) navigate("/dashboard");
      } else {
        alert(data.message || "Erro no servidor");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className={styles.container} >
      <Logo />
      <div className={styles.formContainer}>
        <Input placeholder="Usuário" value={id} onChange={setId} />
        <Input placeholder="Senha" type="password" value={password} onChange={setPassword} secureTextEntry />
        <CustomButton text="Entrar" onClick={login} />
      </div>
    </div>
  );
}

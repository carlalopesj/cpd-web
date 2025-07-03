import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./AddUserScreen.module.css";

export default function AddUserScreen() {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        password: "",
        profile_id: "",
    });

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const profileId = parseInt(localStorage.getItem("profile_id"));

        if (!token || profileId !== 4) {
            alert("Acesso negado. Apenas administradores podem adicionar usuários.");
            navigate("/login");
        } else {
            setAuthorized(true);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "profile_id" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.profile_id === "") {
            alert("Por favor, selecione um perfil para o usuário.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://192.168.0.142:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário criado com sucesso!");
                setFormData({ id: "", name: "", password: "", profile_id: "" });
            } else {
                alert(data.message || "Erro ao criar usuário.");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert("Erro na comunicação com o servidor.");
        }
    };

    if (!authorized) return null;

    return (
        <div className={styles.container}>
            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>
            <h2>Cadastro de Novo Usuário</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    ID:
                    <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                </label>

                <label>
                    Nome:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Senha:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>

                <label>
                    Perfil:
                    <select
                        name="profile_id"
                        value={formData.profile_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecionar Perfil</option>
                        <option value={1}>1 - Conferente</option>
                        <option value={2}>2 - Estoque</option>
                        <option value={3}>3 - Produção</option>
                        <option value={4}>4 - Administrador</option>
                    </select>
                </label>

                <button type="submit">Cadastrar Usuário</button>
            </form>
        </div>
    );
}

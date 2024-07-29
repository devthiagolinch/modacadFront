import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { newBlogAPI } from "../lib/axios";

export type Admin = {
    name: string;
    email: string;
    avatarUrl: string;
    password: string;
}

export function AdminLoginPage() {

    let history = useNavigate();

    const [adminEmail, setUserEmail] = useState("")
    const [adminPassword, setUserPassword] = useState("")

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        const admin = {
            email: adminEmail,
            password: adminPassword
        }

        await newBlogAPI.post('/admins/authenticate', admin).then(response => {
            if(!response) {
                throw new Error("Not Allowed")
            }

            history(`profile/${response.data}`)
        })
    }


    return (
        <div className="page-content">
            <div className="login-box">
            <div className="inputs">
                <form>
                    <div className="input-box">
                        <p>E-mail:</p>
                        <input type="email" 
                            onChange={event => setUserEmail(event.target.value)} 
                            value={adminEmail}
                        />
                    </div>

                    <div className="input-box">
                        <p>Senha:</p>
                        <input 
                            type="password"
                            onChange={event => setUserPassword(event.target.value)}
                            value={adminPassword}
                        />
                    </div>
                    <button 
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>
                    
                </form>
            </div>

            <div className="infos">
                <p>Ainda não tem conta?</p>
                <Link className="link" to={"/signup"}>Crie agora!</Link>
            </div>
            </div>
        </div>
    );
};
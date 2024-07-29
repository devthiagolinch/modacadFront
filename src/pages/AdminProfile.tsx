import { useEffect, useState } from "react"
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { Header } from "../components/header";
import { newBlogAPI } from "../lib/axios";

type User = {
    id: string,
    name: string,
    email: string,
    admin_role_id: string,
}

export function AdminProfile() {
    const admin_id = useParams()
    const [admin, setAdmin] = useState<User>();

    useEffect(() => {
        newBlogAPI.get(`/admins/profile/${admin_id}`).then(({data}) => {
            setAdmin(data)
        })

    }, [])

    if(admin) {
        return (
            <div id="page">
                <Header />

                <div id="page-content">
                    <h1>Bem vindo de volta {admin.name}</h1>
                </div>
            </div>
        )
    } else {
        return (
            <h1>User Not Found</h1>
        )
    }
}
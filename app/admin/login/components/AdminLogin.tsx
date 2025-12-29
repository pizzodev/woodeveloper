"use client";

// AdminLogin.tsx

import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {authProvider} from "@/app/libs/firebase";
import {AdminAddProductComponent} from "@/app/admin/add/components/AdminAddProductComponent";

export default function AdminLogin() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(authProvider, email, password);
            setAuthenticated(true)
        } catch {
            setError("Credenziali non valide");
            setAuthenticated(false)
        }
    };

    if (isAuthenticated) {
        return <AdminAddProductComponent/>
    } else {
        return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6">

                <h2 className="text-2xl font-semibold text-white text-center">
                    Admin Login
                </h2>

                <div className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email admin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 rounded-lg bg-gray-800 text-white
                       placeholder-gray-400 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 rounded-lg bg-gray-800 text-white
                       placeholder-gray-400 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500 text-center">
                        {error}
                    </p>
                )}

                <button
                    onClick={login}
                    className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium
                     hover:bg-blue-500 transition-colors"
                >
                    Accedi
                </button>

            </div>
        </div>
    }
}

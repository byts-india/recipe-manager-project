import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { login } from '../services/authService';
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (email.trim() !== "" && password.trim() !== "") {
            login(email, password).then((data) => {
                if (data.success) {
                    Swal.fire({
                        icon:"success",
                        text:"login successful.",
                        timer:2000,  
                    }).then(() => {
                        navigate("/dashboard");
                    });
                } else {
                    setErrMsg(data.message);
                }
            }).catch(err => {
                Swal.fire({
                    icon:"error",
                    text: "Something went wrong"
                });
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">🍳</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your Recipe Manager account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        {errMsg && <p className='text-red-400'>{errMsg}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

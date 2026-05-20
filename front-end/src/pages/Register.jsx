import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { register } from '../services/authService';
import Swal from "sweetalert2";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrMsg("");

        // Validation
        if (!firstName.trim() || !lastName.trim() || !age.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrMsg("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setErrMsg("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setErrMsg("Password must be at least 6 characters");
            return;
        }

        setLoading(true)
        register(firstName, lastName, age, email, password).then((data) => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "Your account has been created. Redirecting to login...",
                    timer: 2000,
                }).then(() => {
                    navigate("/login");
                });
            } else {
                setErrMsg(data.message || "Registration failed");
            }
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again."
            });
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Us Today</h1>
                        <p className="text-gray-600">Create your Recipe Manager account</p>
                    </div>

                    {/* Error Message */}
                    {errMsg && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 font-semibold">
                            {errMsg}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* First Name and Last Name Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                    required
                                />
                            </div>

                            {/* Last Name Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Age and Email Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Age Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="25"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                    required
                                />
                            </div>

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
                        </div>

                        {/* Password and Confirm Password Row */}
                        <div className="grid grid-cols-2 gap-4">
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
                                <p className="text-xs text-gray-500 mt-1">Min 6 characters</p>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-600 focus:outline-none transition duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg mt-6"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center mt-8 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

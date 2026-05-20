import React from 'react'
import { Link } from "react-router";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-orange-600">Recipe Manager</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Organize, discover, and share your favorite recipes all in one place
                    </p>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg">
                        <Link to="/login">
                            Get Started
                        </Link>
                    </button>
                    <button className="ml-2 bg-white hover:bg-orange-700 text-black font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg">
                        <Link to="/register">
                            Create new account
                        </Link>
                    </button>
                </div>

                {/* Featured Recipes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: "Quick Breakfast", desc: "Easy morning recipes", icon: "🍳" },
                        { title: "Healthy Lunch", desc: "Nutritious meal ideas", icon: "🥗" },
                        { title: "Dinner Specials", desc: "Crowd-pleasing dishes", icon: "🍽️" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-8 text-center">
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="bg-white rounded-2xl shadow-lg p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Recipe Manager?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Save Your Favorites", desc: "Keep all your loved recipes in one organized place" },
                            { title: "Share with Friends", desc: "Share your culinary creations with your community" },
                            { title: "Easy Search", desc: "Find recipes by ingredients, cuisine, or difficulty" },
                            { title: "Step by Step", desc: "Detailed instructions for perfect cooking results" },
                        ].map((feature, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="text-orange-600 text-2xl">✓</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

'use client';

import Link from "next/link";
import { useTracker } from "../hooks/useTracker";

export default function Shop() {
    const { trackEvent } = useTracker();

    const products = [
        { id: 1, name: "Analytics Pro", price: "$99" },
        { id: 2, name: "Enterprise Suite", price: "$499" },
        { id: 3, name: "Startup Pack", price: "$49" },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-32">
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        CausalFunnel Shop
                    </div>
                    <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Our Products</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                            <p className="text-3xl font-bold text-purple-400 mb-6">{product.price}</p>
                            <button
                                onClick={() => trackEvent('click', { element: 'add_to_cart', product_id: product.id, name: product.name })}
                                className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-28 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">
                        Sign in to continue to Final Destination
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none",
                                headerTitle: "text-2xl font-semibold",
                                headerSubtitle: "text-gray-600",
                                socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                                footerActionLink: "text-blue-600 hover:text-blue-700",
                                formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                                identityPreviewText: "text-gray-700",
                                identityPreviewEditButton: "text-blue-600",
                            }
                        }}
                        routing="path"
                        path="/login"
                        signUpUrl="/signup"
                        afterSignInUrl="/"
                    />
                </div>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

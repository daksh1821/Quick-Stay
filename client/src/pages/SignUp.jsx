import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-28 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
                        Create Your Account
                    </h1>
                    <p className="text-gray-600">
                        Join Final Destination today
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <SignUp
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
                        path="/signup"
                        signInUrl="/login"
                        afterSignUpUrl="/"
                    />
                </div>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;

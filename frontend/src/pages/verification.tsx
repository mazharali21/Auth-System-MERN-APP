import React from 'react'

const VerificationInstructions = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">📧 Verify Your Email</h2>
        
        <p className="text-gray-600 mb-4">
          Your account has been created successfully.
        </p>

        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email address.
          Please check your inbox and click the link to activate your account.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg p-3">
          If you don’t see the email, check your spam folder.
        </div>
      </div>
    </div>
  )
}

export default VerificationInstructions

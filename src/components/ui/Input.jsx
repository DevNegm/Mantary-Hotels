import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ label, type = "text", register, name, rules = {}, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;
    return (
        <div className="w-full mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-bold text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    placeholder={label}
                    id={name}
                    type={inputType}
                    {...register(name, rules)}
                    className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${error
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-300 focus:ring-blue-400"
                        }`}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}

export default Input
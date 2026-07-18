import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Enter valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    if (
      data.email === "admin@gmail.com" &&
      data.password === "admin123"
    ) {
      dispatch(
        login({
          user: {
            id: 1,
            name: "Administrator",
            email: "admin@gmail.com",
            role: "Admin",
          },

          token: "dummy-admin-token",
        })
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Finance Management Dashboard
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="admin@gmail.com"
              className="w-full border rounded-lg p-3 mt-2"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>

          </div>

          <div>

            <label className="font-medium">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                {...register("password")}
                placeholder="Enter password"
                className="w-full border rounded-lg p-3 pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginPage;
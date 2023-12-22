// LoginScreen.tsx
import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { useAuth } from "../context/authContext";
import useForm from "../hooks/useForm";
import Input from "../components/form/Input";
import GuestLayout from "../components/layouts/GuestLayout";


const LoginScreen: Component = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // Call the login function from the AuthContext
    await login({ email: values().email, password: values().password });

    // Redirect to the dashboard after successful login
    navigate('/');
  };

  return (
    <GuestLayout>
    <div class="flex-it justify-center items-center h-screen">
      <div class="text-white text-4xl font-bold">Sweetr - Login</div>
      <div class="mt-10 flex-it h-100 xs:w-100 w-full bg-gray-800 p-10 rounded-2xl">
        <div class="flex-it">
          <form class="flex-it">
            <div class="flex-it overflow-hidden sm:rounded-md">
              <div class="flex-it">
                <div class="flex-it">
                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    value={values().email}
                    error={errors().email}
                    onInput={(e: { target: { value: any; }; }) => handleChange("email", e.target.value)}
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values().password}
                    error={errors().password}
                    onInput={(e: { target: { value: any; }; }) => handleChange("password", e.target.value)}
                  />
                </div>
              </div>
              <div class="text-sm text-gray-500 pb-4">
                Don't have an account?{" "}
                <A class="underline" href="/register">
                  Register now
                </A>
              </div>
              <div class="flex-it py-2">
                <button
                  type="button"
                  class="
                  bg-froly-400 hover:bg-froly-500 focus:ring-0
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-offset-2"
                  onClick={handleLogin}
                  disabled={!isValid()}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </GuestLayout>
  );
};

export default LoginScreen;

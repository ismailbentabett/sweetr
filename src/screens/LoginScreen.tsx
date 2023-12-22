// LoginScreen.tsx
import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import useForm from "../hooks/useForm";
import Input from "../components/form/Input";

const LoginScreen: Component = () => {
  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // Handle login logic here
    if (isValid()) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values()),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        // Optionally, you can redirect the user after successful login
        navigate("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
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
                    onInput={(e: { target: { value: string } }) =>
                      handleChange("email", e.target.value)
                    }
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values().password}
                    error={errors().password}
                    onInput={(e: { target: { value: string } }) =>
                      handleChange("password", e.target.value)
                    }
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
  );
};

export default LoginScreen;

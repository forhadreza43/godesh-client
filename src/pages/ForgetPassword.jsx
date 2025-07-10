import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send reset email.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-11/12 items-center justify-center">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm space-y-4 rounded-lg bg-green-50 p-6 shadow-md"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Reset Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full rounded-md border border-accent px-4 py-2 focus:outline-accent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-accent py-2 text-white transition hover:bg-accent/90"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

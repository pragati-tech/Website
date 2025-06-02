// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.js"; // path may vary
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("Registration successful!");
      navigate("/home"); // or redirect to login
    } catch (error: any) {
      toast.error(error?.message || "Registration failed.");
      console.error("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gaming-dark min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full gaming-card p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-gray-300 mb-2 block">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="bg-gaming-dark border-gaming-purple/30 text-gray-300"
            />
          </div>
          <div>
            <label className="text-gray-300 mb-2 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              className="bg-gaming-dark border-gaming-purple/30 text-gray-300"
            />
          </div>
          <div>
            <label className="text-gray-300 mb-2 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-gaming-dark border-gaming-purple/30 text-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gaming-purple hover:bg-gaming-purple/90"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;

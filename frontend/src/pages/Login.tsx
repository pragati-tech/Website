import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../config/firebase.js"; // Make sure these are exported in firebase.ts
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUserInFirestore = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        createdAt: new Date(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await createUserInFirestore(user);

      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));

      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error?.message || "Failed to sign in. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await createUserInFirestore(user);

      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));

      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error("Google Sign-in failed");
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="bg-gaming-dark min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full gaming-card overflow-visible p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-gaming-dark border-gaming-purple/30 text-gray-300"
            />
            <p className="text-sm text-gray-400 mt-2">
              Demo emails: admin@example.com, rider@example.com, customer@example.com
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-gaming-dark border-gaming-purple/30 text-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gaming-purple hover:bg-gaming-purple/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Or sign in with</p>
          <Button
            variant="outline"
            className="w-full border-gaming-purple text-gaming-purple"
            onClick={handleGoogleSignIn}
          >
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import {
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  Mail,
  ShoppingBag
} from "lucide-react";
import { useEffect, useState } from "react";
import { AuthImagePattern } from "../components/AuthImagePattern";
import { useAuthStore } from "../redux/hooks/useAuthStore";
import toast from "react-hot-toast";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { isLoggingIng , loginAction  } = useAuthStore();


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = Joi.validate(formData, schema, {
      abortEarly: true,
    });

    if (error) {
      toast.error(error.details[0].message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginAction(formData)
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
            >
              <ShoppingBag className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">
              Sign in to your account
            </p>
          </div>
        </div>
        <div className="w-full max-w-md space-y-8">
          <form  onSubmit={handleSubmit} className="space-y-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <Mail />
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <KeyRound />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={showPassword ? "Secret" : "*******"}
                  className="grow"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="size-5 text-base-content/40"
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </label>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIng}
            >
              {isLoggingIng ? 
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </> 
             : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <div className="text-center">
          <Link to='/signin'>
          <p className="text-base-content/60">
            Create new Account?{" "}
          </p>
          </Link>
        </div>
      </div>
      <AuthImagePattern
        title="Do you find something?"
        subtitle={
          "Join to the best MarketPlace"
        }
      />
    </div>
  );
};

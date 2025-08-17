import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button/Button";
import GoogleLogin from "../components/shared/GoogleLogin";
import { useForm } from "react-hook-form";
import { getImageUrl, saveUserInfo } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const { createUser, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    let photo = "";
    if (data.photo[0]) {
      photo = await getImageUrl(data.photo[0]);
    }
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photo);

      // eslint-disable-next-line no-unused-vars
      const { password, photo: _, ...userInfo } = data;
      userInfo.image = photo;
      userInfo.authMethod = "email-password";
      userInfo.isRegistering = true;
      await saveUserInfo(userInfo);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      if (
        err.response?.status === 409 ||
        err.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        toast.error("Email already registered, please login.");
        // navigate("/login");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-11/12 max-w-[1440px] items-center justify-center">
      <div className="w-full max-w-md space-y-3 rounded-xl bg-green-50 p-8 shadow-lg dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Name */}
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block dark:text-gray-600">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              placeholder="Name"
              className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Image Upload (Optional) */}
          <div className="space-y-1 text-sm">
            <label htmlFor="photo" className="block dark:text-gray-600">
              Upload Image <span className="text-xs">(optional)</span>
            </label>
            <div className="flex items-center">
              <input
                {...register("photo")}
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                }}
                className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
              />
              {imagePreview && (
                <div className="">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-5 h-10 w-10 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-3">
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center space-x-1 pt-4">
          <div className="h-px flex-1 sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="h-px flex-1 sm:w-16 dark:bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-4">
          <GoogleLogin />
        </div>

        {/* Sign in redirect */}
        <p className="text-center text-xs sm:px-6 dark:text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline dark:text-gray-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import { Send, Mail } from "lucide-react";
import newsImage from "../assets/newsletter-image.svg";
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
const SubscribeSection = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      toast.success("Thank you for subscribing to our newsletter!");
      // reset the form fields
      reset();

    };
  return (
    <div className="py-10 md:py-15">
      <div className="mx-auto my-16 flex w-11/12 max-w-[1440px] flex-col items-center justify-between gap-10 rounded-xl bg-gradient-to-br from-green-400 to-green-400 p-8 text-white shadow-lg md:flex-row md:p-12">
        {/* Left Image */}
        <motion.div
          className="hidden lg:flex justify-center md:w-1/2"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={newsImage}
            alt="Subscribe Illustration"
            className="max-w-[250px] md:max-w-xs"
          />
        </motion.div>
        {/* Right Text & Form */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="mb-2 text-3xl font-bold">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8 text-lg text-gray-100">
            Stay up to date with our latest news and offers.
          </p>
          {/* Email Input */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
          >
            <div className="flex w-full items-center rounded-md bg-white p-5 sm:w-auto">
              <Mail className="mr-2 text-green-500" size={24} />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
                className="w-full border-none text-sm text-gray-700 outline-none"
                required
              />
              {errors.email && (
                <p className="mt-2 text-red-500">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-md bg-green-600 p-5 font-semibold text-white hover:bg-green-700"
            >
              SUBSCRIBE
              <Send size={16} />
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-100">
            We respect your privacy. We will never share your email address with
            anyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;

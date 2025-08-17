import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Thank you for subscribing to our newsletter!');
    reset();
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-gray-600 mb-8">Stay up to date with our latest news and offers.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
              Subscribe
            </button>
          </form>
          {errors.email && <p className="text-red-500 mt-2">Please enter a valid email address.</p>}
          <p className="text-sm text-gray-500 mt-4">We respect your privacy. We will never share your email address with anyone.</p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

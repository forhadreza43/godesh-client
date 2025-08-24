import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal/Modal";
import "./payment.css";

const Payment = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [err, setErr] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  // Fetch booking details
  const {
    data: booking,
    isLoading: bookingLoading,
    isError: bookingError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res.data;
    },
    enabled: !!bookingId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  // Get client secret
  const { data: paymentIntentData, isLoading: secretLoading } = useQuery({
    queryKey: ["clientSecret", bookingId],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-booking-payment-intent", {
        bookingId,
      });
      return res.data;
    },
    enabled: !!bookingId,
  });

  const clientSecret = paymentIntentData?.clientSecret;

  const paymentMutation = useMutation({
    mutationFn: async ({ paymentIntent, booking }) => {
      await axiosSecure.patch(`/bookings/${bookingId}/status`, {
        status: "in review",
      });
      await axiosSecure.post("/payments", {
        bookingId,
        amount: booking.price,
        userEmail: booking.touristEmail,
        transactionId: paymentIntent.id,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      });
    },
    onSuccess: () => {
      toast.success("Payment successful");
      navigate("/dashboard/my-bookings");
    },
    onError: () => {
      toast.error("Payment succeeded but update failed");
    },
    onSettled: () => {
      setProcessing(false);
      setIsOpenModal(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientSecret) {
      toast.error("Payment form is not ready yet. Please wait.");
      return;
    }
    setIsOpenModal(true);
  };

  const handlePayment = async () => {
    if (!clientSecret) {
      toast.error("Payment is not ready yet. Please wait.");
      return;
    }

    const toastId = toast.loading("Payment in progress...");
    setProcessing(true);
    setErr(null);

    if (!stripe || !elements) {
      setProcessing(false);
      toast.dismiss(toastId);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      toast.dismiss(toastId);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      setProcessing(false);
      toast.error("Payment failed", { id: toastId });
      toast.dismiss(toastId);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown@example.com",
        },
      },
    });

    if (result.error) {
      setErr(result.error.message);
      setProcessing(false);
      toast.error("Payment failed", { id: toastId });
      toast.dismiss(toastId);
    } else if (result.paymentIntent?.status === "succeeded") {
      paymentMutation.mutate({ paymentIntent: result.paymentIntent, booking });
      toast.success("Payment successful", { id: toastId });
      toast.dismiss(toastId);
    }
  };

  // Handle loading states
  if (bookingLoading || secretLoading) {
    return <p className="py-10 text-center">Loading payment form...</p>;
  }
  if (bookingError) {
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load booking data.
      </p>
    );
  }
  if (!booking) {
    return <p className="py-10 text-center">Booking not found.</p>;
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg py-10">
        <h2 className="mb-4 text-xl font-bold">
          Pay for: {booking.packageName}
        </h2>
        <p className="mb-2">Amount: $ {booking.price}</p>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />

        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className="btn btn-sm cursor-pointer rounded bg-green-500 px-3 py-1 text-white duration-300 hover:bg-green-600 disabled:opacity-50"
          >
            {processing ? "Processing..." : `Pay $${booking.price}`}
          </button>
          <button
            type="button"
            className="btn btn-sm cursor-pointer rounded bg-red-500 px-3 py-1 text-white duration-300 hover:bg-red-600 disabled:opacity-50"
            onClick={() => setIsOpenModal(false)}
            disabled={processing}
          >
            Cancel
          </button>
        </div>
      </form>

      {processing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <p className="text-lg font-semibold text-blue-600">
            Processing payment...
          </p>
        </div>
      )}

      <Modal
        isOpen={isOpenModal}
        onClose={() => !processing && setIsOpenModal(false)}
        title="Booking Confirmation"
        description="Are you sure you want to confirm booking this package?"
        confirmText="Confirm Payment"
        onConfirm={handlePayment}
      />
    </div>
  );
};

export default Payment;

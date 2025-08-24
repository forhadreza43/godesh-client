import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useUser } from "../hooks/useUser";
import Modal from "../components/Modal/Modal";
import Accordion from "../components/Accordion";
import Loading from "../components/shared/Loading";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Button from "../components/Button/Button";

const isOffer = true;

const PackageDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, Loading: authLoading } = useAuth();
  const { data: userData, isLoading: userLoading } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // const path = window.location.pathname;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const tourDate = watch("tourDate");
  // Fetch package details
  const { data: packageData = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages/${id}`);
      return res.data;
    },
  });

  // Fetch all tour guides
  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/guide");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (booking) => {
      const res = await axiosSecure.post("/bookings", booking);
      return res.data;
    },
    onSuccess: () => {
      setIsConfirmOpen(false);
      navigate("/dashboard/my-bookings");
    },
  });

  const handleBookNow = () => {
    if (!user) return navigate("/login");
    const { tourDate, guideId, coupon } = formData;
    let Price = packageData?.price;
    if (coupon && isOffer) {
      if (coupon === "SUMMER20") {
        Price = Price - Price * 0.2;
      } else if (coupon === "FLASH50") {
        Price = Price - Price * 0.5;
      } else if (coupon === "WINTER30") {
        Price = Price - Price * 0.3;
      }
    }
    const booking = {
      packageId: id,
      packageName: packageData?.packageName,
      touristId: userData?._id,
      touristEmail: userData?.email,
      price: Price,
      guideId,
      tourDate,
      status: "pending",
    };
    // console.log(booking);
    mutation.mutate(booking);
    setIsConfirmOpen(false);
  };

  const onSubmit = (data) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  useEffect(() => {
    register("tourDate", { required: "Please select a tour date." });
  }, [register]);

  if (isLoading || authLoading || userLoading) return <Loading />;
  return (
    <div className="mx-auto my-10 w-11/12 max-w-[1440px]">
      {/* Gallery Section */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {packageData.galleryImages?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Place"
            className="h-48 w-full rounded-lg object-cover"
          />
        ))}
      </div>
      <h2 className="mb-10 flex items-center justify-between text-2xl font-semibold">
        {packageData.packageName}{" "}
        <span className="rounded-full border-3 border-green-300 bg-green-700 px-6 py-2 text-white">
          $ {packageData.price}
        </span>
      </h2>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Trip </h2>
        <p>{packageData.tripTitle}</p>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Tour Type </h2>
        <p>{packageData.tourType}</p>
      </div>

      {/* About Section */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold">About the Tour</h2>
        <p>{packageData.about}</p>
      </div>

      {/* Tour Plan */}
      <div className="mb-10">
        <h2 className="mb-2 text-xl font-bold">Tour Plan</h2>
        <Accordion tourPlan={packageData?.tourPlan} />
      </div>

      {/* Tour Guides Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Available Tour Guides</h2>
        <div className="flex flex-wrap gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="flex cursor-pointer flex-col items-center text-center"
              onClick={() => navigate(`/guide/${guide._id}`)}
            >
              <img
                src={guide.image}
                className="h-16 w-16 rounded-full"
                alt={guide.name}
              />
              <p className="mt-2 text-sm">{guide.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-xl border border-accent p-6 shadow-md"
      >
        <h2 className="mb-4 text-xl font-semibold">Book This Tour</h2>

        <div className="flex flex-col justify-between md:flex-row md:gap-5">
          <div className="mb-3 flex-1">
            <label htmlFor="packageName" className="mb-1 block font-medium">
              Package Name
            </label>
            <input
              className="input w-full"
              id="packageName"
              readOnly
              defaultValue={packageData.packageName}
              {...register("packageName")}
            />
          </div>
          <div className="mb-3 flex-1">
            <label htmlFor="touristName" className="mb-1 block font-medium">
              Tourist Name
            </label>
            <input
              className="input w-full"
              id="touristName"
              readOnly
              defaultValue={user?.displayName}
              {...register("touristName")}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-row md:items-center md:gap-5">
          <div className="mb-3 flex-1">
            <label htmlFor="touristEmail" className="mb-1 block font-medium">
              Tourist Email
            </label>
            <input
              className="input w-full"
              id="touristEmail"
              readOnly
              defaultValue={user?.email}
              {...register("touristEmail")}
            />
          </div>
          <div className="mb-3 flex-1">
            <p className="md:mt-5">
              Price:{" "}
              <span className="ml-2 rounded-full border-2 border-red-300 bg-red-700 px-4 py-1 text-white">
                $ {packageData.price}
              </span>
            </p>
          </div>
        </div>

        {/* {user?.photoURL && (
          <div className="mb-3">
            <label className="mb-1 block font-medium">Tourist Photo</label>
            <img
              src={user.photoURL}
              alt="Tourist"
              className="h-12 w-12 rounded-full border"
            />
          </div>
        )} */}

        <div className="flex flex-col justify-between md:flex-row md:gap-5">
          <div className="mb-3 flex-1">
            <label htmlFor="guideId" className="mb-1 block font-medium">
              Select Tour Guide
            </label>
            <select
              id="guideId"
              className="input w-full"
              {...register("guideId", { required: true })}
            >
              <option value="">Select a Tour Guide</option>
              {guides.map((guide) => (
                <option key={guide._id} value={guide._id}>
                  {guide.name}
                </option>
              ))}
            </select>
            {errors.guideId && (
              <p className="mt-1 text-sm text-red-500">
                Please select a tour guide.
              </p>
            )}
          </div>
          <div className="mb-3 flex-1">
            <label className="mb-1 block font-medium">Select Tour Date</label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => setValue("tourDate", date)}
              placeholderText="Select tour date"
              className="input w-full"
            />
            {errors.tourDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tourDate.message}
              </p>
            )}
          </div>
          {isOffer && (
            <div className="mb-3 flex-1">
              <label className="mb-1 block font-medium">Apply Coupon</label>
              <input
                className="input w-full"
                id="coupon"
                placeholder="Enter coupon code"
                {...register("coupon")}
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!user || userData?.role !== "tourist"}
          className="btn btn-primary w-full py-2"
        >
          Book Now
        </Button>
      </form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Booking Confirmation"
        description="Are you sure want to confirm booking this package?"
        confirmText="Confirm Booking"
        onConfirm={handleBookNow}
      />
    </div>
  );
};

export default PackageDetails;

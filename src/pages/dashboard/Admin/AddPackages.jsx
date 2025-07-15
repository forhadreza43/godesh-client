import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getImageUrl } from "../../../utils/utils";
import { X } from "lucide-react";
import Header from "../../../components/shared/Dashboard/Header";
import Button from "../../../components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Cloudinary } from "@cloudinary/url-gen/index";

const AddPackages = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tourPlan: [{ day: "", description: "" }],
    },
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({
    control,
    name: "tourPlan",
  });
  const axiosSecure = useAxiosSecure();
  const toastIdRef = useRef(null);
  const { mutate } = useMutation({
    mutationFn: async (packageInfo) => {
      const res = await axiosSecure.post("/packages", packageInfo);
      return res;
    },
    onSuccess: () => {
      toast.dismiss(toastIdRef.current);
      toast.success("Package added successfully!");
      reset();
      setSelectedFiles([]);
    },
    onError: (err) => {
      console.error(err);
      toast.dismiss(toastIdRef.current);
      toast.error("Failed to add package");
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    const filtered = files.filter((file) => validTypes.includes(file.type));

    setSelectedFiles((prevFiles) => {
      const existingNames = new Set(prevFiles.map((f) => f.name));
      const newFiles = filtered.filter((f) => !existingNames.has(f.name));
      return [...prevFiles, ...newFiles];
    });

    // Optional: Reset file input to allow selecting same file again
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const onSubmit = async (data) => {
    toastIdRef.current = toast.loading("Adding Packages...");
    try {
      setUploading(true);

      if (!selectedFiles || selectedFiles.length === 0) {
        toast.dismiss(toastIdRef.current);
        toast.error("Please select at least one image.");
        setUploading(false);
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];

      for (const file of selectedFiles) {
        if (!validTypes.includes(file.type)) {
          toast.dismiss(toastIdRef.current);
          toast.error("Only JPG, JPEG, and PNG images are allowed.");
          setUploading(false);
          return;
        }
      }

      const uploadPromises = selectedFiles.map((file) => getImageUrl(file));
      const imageUrls = await Promise.all(uploadPromises);
      // console.log(imageUrls);

      const finalPackageData = {
        packageName: data.packageName,
        tripTitle: data.tripTitle,
        tourType: data.tourType,
        price: parseFloat(data.price),
        about: data.about,
        galleryImages: imageUrls,
        tourPlan: data.tourPlan,
      };
      mutate(finalPackageData);
      reset();
      setSelectedFiles([]);
    } catch (err) {
      console.error("Image upload failed", err);
      toast.dismiss(toastIdRef.current);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto h-screen py-10  w-full rounded-lg bg-white">
      {/* <Header title="Add New Tour Package" /> */}
      <h2 className="mb-6 text-center text-2xl font-bold">
        Add New Tour Package
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-3 rounded-lg bg-green-50 p-6 lg:space-y-6"
      >
        {/* Package Name */}
        <div className="justify-between gap-10 space-y-3 lg:flex lg:space-y-0">
          <div className="w-full">
            <label className="mb-1 block font-medium">Package Name</label>
            <input
              {...register("packageName", {
                required: "This field is required",
              })}
              className="w-full rounded border p-2"
              placeholder="E.g., Sundarban Adventure"
            />
            {errors.packageName && (
              <p className="text-sm text-red-500">
                {errors.packageName.message}
              </p>
            )}
          </div>
          {/* Trip Title */}
          <div className="w-full">
            <label className="mb-1 block font-medium">Trip Title</label>
            <input
              {...register("tripTitle", { required: true })}
              className="w-full rounded border p-2"
              placeholder="E.g., 3-Day Wildlife Expedition"
            />
          </div>
        </div>

        <div className="justify-between gap-10 space-y-3 lg:flex lg:space-y-0">
          {/* Tour Type */}
          <div className="w-full">
            <label className="mb-1 block font-medium">Tour Type</label>
            <select
              {...register("tourType", { required: true })}
              className="w-full rounded border p-2"
            >
              <option value="">Select type</option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
              <option value="Historical">Historical</option>
              <option value="Eco">Eco</option>
            </select>
          </div>
          {/* Price */}
          <div className="w-full">
            <label className="mb-1 block font-medium">Price (BDT)</label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full rounded border p-2"
              placeholder="E.g., 5000"
            />
          </div>
        </div>

        {/* About the Tour */}
        <div>
          <label className="mb-1 block font-medium">About the Tour</label>
          <textarea
            {...register("about", { required: true })}
            className="w-full rounded border p-2"
            rows="4"
            placeholder="Write a detailed description of the tour..."
          ></textarea>
        </div>

        {/* Gallery Image Upload */}
        <div>
          <label className="mb-1 block font-medium">Gallery Images</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleFileChange}
            className="w-full rounded border p-2"
          />

          {/* File preview list */}
          {selectedFiles.length > 0 && (
            <ul className="mt-2 space-y-1">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-100 px-3 py-1"
                >
                  <span className="truncate text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tour Plan (Day-wise) */}
        <div>
          <label className="mb-1 block font-medium">Tour Plan</label>
          {planFields.map((field, index) => (
            <div key={field.id} className="mb-4 space-y-2">
              <div className="flex flex-col gap-2 md:flex-row">
                <input
                  {...register(`tourPlan.${index}.day`, { required: true })}
                  className="w-full rounded border p-2 md:w-1/3"
                  placeholder="Day 1"
                />
                <input
                  {...register(`tourPlan.${index}.title`, { required: true })}
                  className="w-full rounded border p-2 md:w-1/3"
                  placeholder="Title"
                />
                <input
                  {...register(`tourPlan.${index}.description`, {
                    required: true,
                  })}
                  className="w-full rounded border p-2 md:w-2/3"
                  placeholder="Description"
                />
              </div>
              <button
                type="button"
                onClick={() => removePlan(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendPlan({ day: "", description: "" })}
            className="text-blue-600"
          >
            + Add Day
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" disabled={uploading} className="">
            {uploading ? "Uploading..." : "Submit Package"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPackages;

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const JoinAsGuide = () => {
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Submit to backend here
    // await axios.post("/tour-guide-applications", { ...formData });

    setIsModalOpen(true);
    setFormData({ title: "", reason: "", cvLink: "" });
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Join as Tour Guide
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">Application Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="e.g. Passionate Guide from Sylhet"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows="4"
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="Share your story or motivation..."
          ></textarea>
        </div>

        <div>
          <label className="mb-1 block font-medium">CV Link</label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="https://your-cv-link.com"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>

      {/* Success Modal using Headless UI */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-opacity-30 fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="mb-2 text-center text-xl font-semibold">
                  Application Submitted!
                </Dialog.Title>
                <p className="mb-4 text-center text-gray-600">
                  Thank you for applying. We'll review your request soon.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default JoinAsGuide;

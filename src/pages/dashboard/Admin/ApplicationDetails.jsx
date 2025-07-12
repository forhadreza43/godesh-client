import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading";
import { FaArrowRight } from "react-icons/fa";


const ApplicationDetails = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // Extract email from query param
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const {
    data: application,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["application", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide-applications?email=${email}`);
      return res.data;
    },
  });

  if (!email) {
    return (
      <p className="mt-10 text-center text-red-600">
        Email is required in the query string.
      </p>
    );
  }

  if (isLoading) return <Loading />;
  if (isError || !application) {
    return (
      <p className="mt-10 text-center text-red-500">
        Failed to load application details.
      </p>
    );
  }

  return (
    <div className="m-5 rounded bg-green-50 p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Application Details</h2>
      <div className="space-y-3">
        <p>
          <strong>Applicant Name:</strong> {application?.name}
        </p>
        <p>
          <strong>Application Title:</strong> {application.title}
        </p>
        <p>
          <strong>Reason:</strong> {application.reason}
        </p>

        <p>
          <strong>Email:</strong> {application.email}
        </p>
        <p>
          <strong>Applied At:</strong>{" "}
          {new Date(application.appliedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        {application.cvLink && (
          <p>
            <strong>CV:</strong>{" "}
            <a
              href={application.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold  underline inline-flex items-center gap-2 hover:gap-4 duration-300"
            >
              View CV
              <span>
                <FaArrowRight />
              </span>
            </a>
          </p>
        )}

        {application.photo && (
          <div>
            <strong>Photo:</strong>
            <img
              src={application.photo}
              alt="Applicant"
              className="mt-2 h-40 w-40 rounded border object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;

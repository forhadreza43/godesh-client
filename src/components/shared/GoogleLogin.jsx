import { FaGoogle } from "react-icons/fa";
import Button from "../Button/Button";
const GoogleLogin = () => {
  return (
    <Button
          className="w-full duration-500"
          variant="outline"
      icon={<FaGoogle />}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
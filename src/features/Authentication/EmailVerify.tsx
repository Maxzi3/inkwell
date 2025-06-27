import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useEmailVerify } from "./useEmailVerify";
import Spinner from "../../ui/Spinner";
import Logo from "../../components/Logo";
import DarkModeToggle from "../../ui/DarkModeToggle";

function EmailVerification() {
  const { token } = useParams<{ token: string }>();
  const { mutate: verify, isPending } = useEmailVerify();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (token && !hasVerified.current) {
      verify({ token });
      hasVerified.current = true;
    }
  }, [token, verify]);

  return (
    <div className="min-h-screen flex items-center px- flex-col text-text-primary bg-primary">
      <div className="flex items-center p-4 lg:p-5 justify-between w-full">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
          <Logo />
        </h2>
        <DarkModeToggle />
      </div>

      <div className="p-6 flex flex-col rounded-md w-full max-w-md text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
          {isPending ? (
            "Verifying your email..."
          ) : (
            <p className="text-green-800 md:text-2xl lg:text-3xl">
              Verification Complete
            </p>
          )}
        </h1>

        {isPending && (
          <p>
            Please wait a moment.
            <span className="flex justify-center">
              <Spinner />
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useEmailVerification } from "../features/Authentication/useEmailVerification";
import Spinner from "../../ui/Spinner";

function EmailVerification() {
    // const { token } = useParams();
    // const { verify, isLoading } = useEmailVerification();
    // const hasVerified = useRef(false);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (token && !hasVerified.current) {
    //         verify(
    //             { token },
    //             {
    //                 onError: (err) => {
    //                     setError(err.message || "Email verification failed");
    //                 },
    //             }
    //         );
    //         hasVerified.current = true;
    //     }
    // }, [token, verify]);
    const isLoading = false
    const error = false
    return (
        <div className="min-h-screen flex pt-36 items-center px-4 flex-col space-x-4  text-text-primary bg-primary">
            <div className="flex items-center p-4 md:p-5 justify-between w-full">
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
                    Logo
                </h2>
            </div>
            <div className="p-6 flex flex-col md:my- rounded-md w-full max-w-md text-center">
                <h1 className="text-xl font-semibold mb-4">
                    {isLoading ? (
                        "Verifying your email..."
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <p className="text-green-800">Verification Complete</p>
                    )}
                </h1>
                {!isLoading && (
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

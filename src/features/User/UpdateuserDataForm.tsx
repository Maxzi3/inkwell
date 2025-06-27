import { useEffect, useRef, useState } from "react";
import type {  ChangeEvent, FormEvent } from "react";
import { useUpdateMe } from "./useUpdateMe";
import { useGetMe } from "./useGetMe";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { FiX } from "react-icons/fi";
import SpinnerMini from "../../ui/SpinnerMini";
import FormInput from "../../ui/FormInput";

function UpdateUserDataForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: user, isLoading } = useGetMe();

  const {
    fullName: currentFullName,
    email,
    emailVerified,
    phoneNumber: currentPhoneNumber,
    avatar: currentPhoto,
    address: currentAddress,
    username,
    bio: currentBio,
  } = user || {};

  const { mutate: updateUser, isPending: isUpdating } = useUpdateMe();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  type User = {
    fullName: string;
    phoneNumber: string;
    avatar?: File;
    address: string;
    username: string;
    bio: string;
  };
  useEffect(() => {
    if (user) {
      setFullName(currentFullName || "");
      setAddress(currentAddress || "");
      setPhoneNumber(currentPhoneNumber || "");
      setUserName(username || "");
      setBio(currentBio || "");
      setAvatar(null);
    }
  }, [user]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!fullName) return toast.error("Full name is required.");
    if (!address) return toast.error("Address is required.");
    if (!phoneNumber) return toast.error("Phone number is required.");

    const userData: User = {
      fullName,
      address,
      phoneNumber,
      bio,
      username: userName,
    };
    if (avatar instanceof File) userData.avatar = avatar;

    updateUser(userData, {
      onSuccess: () => {
        setAvatar(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  }

  function handleCancel() {
    setFullName(currentFullName || "");
    setAddress(currentAddress || "");
    setPhoneNumber(currentPhoneNumber || "");
    setUserName(username || "");
    setBio(currentBio || "");
    setAvatar(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Changes reverted");
  }

  const isDirty =
    fullName !== (currentFullName || "") ||
    address !== (currentAddress || "") ||
    phoneNumber !== (currentPhoneNumber || "") ||
    avatar !== null ||
    bio !== (currentBio || "") ||
    userName !== (username || "");

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB.");
      return;
    }

    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[600px] w-full md:px-15 mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm lg:border border-gray-200"
    >
      {/* Avatar Display */}
      <div className="flex lg:flex-row flex-col items-center lg:space-y-4 lg:space-x-5">
        <div>
          <label className="block font-medium mb-1">Current Avatar</label>
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt="User Avatar"
              className="w-20 h-20 object-cover rounded-full border border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
              N/A
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email address
        </label>
        <FormInput type="email" id="email" value={email || "N/A"} disabled />
      </div>

      {/* Email Verified */}
      <div className="flex items-center gap-2">
        <span className="font-medium">Email Verified:</span>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            emailVerified === "verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {emailVerified || "N/A"}
        </span>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full name
        </label>
        <FormInput
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block font-medium mb-1">
          Username
        </label>
        <FormInput
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block font-medium mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          className="w-full p-4 border-none rounded-md bg-input focus:ring-blue-500 placeholder:text-text-primary text-base disabled:bg-gray-500"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block font-medium mb-1">
          Address
        </label>
        <FormInput
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block font-medium mb-1">
          Phone Number
        </label>
        <FormInput
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div>
          <p className="block font-medium mb-1">Selected Preview:</p>
          <img
            src={preview}
            alt="Selected preview"
            className="w-20 h-20 object-cover rounded-full border border-gray-300"
          />
        </div>
      )}

      {/* Avatar Upload */}
      <div className="relative ">
        <label htmlFor="avatar" className="block font-medium mb-1">
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          ref={fileInputRef}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md file:border-0 disabled:bg-input hover:text-secondary hover:bg-input file:bg-secondary file:text-primary file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
        />
        {preview && (
          <button
            type="button"
            onClick={() => {
              setAvatar(null);
              setPreview(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute right-2 top-[3.5rem] -translate-y-1/2  text-red-600 p-1 rounded-full hover:bg-red-100"
            aria-label="Remove image"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isUpdating}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isDirty || isUpdating}
          className="px-4 py-3 w-[150px] rounded-md disabled:bg-input bg-secondary text-primary hover:text-secondary hover:bg-input"
        >
          {isUpdating ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Update account"
          )}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;

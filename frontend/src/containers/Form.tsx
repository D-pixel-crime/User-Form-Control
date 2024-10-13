import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSnackbar } from "../contexts/ShowMessae";

interface formProps {
  setIsWhatsappLinkGenerated: any;
  setIsAlreadySubmitted: any;
}

const Form = ({
  setIsWhatsappLinkGenerated,
  setIsAlreadySubmitted,
}: formProps) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    city: "",
    countryCode: "",
    number: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const { showMessage } = useSnackbar();

  const handleSubmit = async () => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.country ||
      !userDetails.state ||
      !userDetails.city ||
      !userDetails.countryCode ||
      !userDetails.number
    ) {
      alert("Please fill all the fields");
      return;
    }
    setIsSubmit(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/create-customer`,
        userDetails,
        {
          withCredentials: true,
        }
      );

      console.log(`Response: ${response.data.message}`);
      setUserDetails({
        name: "",
        email: "",
        country: "",
        state: "",
        city: "",
        countryCode: "",
        number: "",
      });
      setIsWhatsappLinkGenerated({
        status: true,
        link: response.data.whatsappLink,
      });
      setIsAlreadySubmitted(true);
      showMessage("Form Submitted Successfully", "success");
    } catch (error: any) {
      setIsSubmit(false);
      showMessage(
        error.response.data.message || "An Unexpected Error Occurred!",
        "error"
      );
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <br />
      <span className="text-xl">Please complete the following form👇</span>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        method="post"
        className="flex flex-col lg:w-4/12 p-8 rounded-xl gap-4 bg-slate-200/80 shadow-md shadow-slate-400 mb-5"
      >
        <div className="flex flex-col gap-4 text-base">
          <div className="flex flex-col">
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Your Name"
              className="border-2 border-slate-400 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter Your email-id"
              className="border-2 border-slate-400 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Country">Country</label>
            <input
              id="Country"
              type="text"
              placeholder="Enter Your Country"
              className="border-2 border-slate-400 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
              value={userDetails.country}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="Enter Your State"
                className="border-2 border-slate-400 rounded-md w-full px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.state}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter Your City"
                className="border-2 border-slate-400 rounded-md w-full px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.city}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 w-full gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="country-code">Phone-Code</label>
              <input
                id="country-code"
                type="text"
                placeholder="Enter Your Phone Code"
                className="border-2 border-slate-400 rounded-md w-full px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.countryCode}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    countryCode: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col col-start-2 col-span-2 gap-1">
              <label htmlFor="country-code">Number</label>
              <input
                id="country-code"
                type="number"
                min={0}
                max={9999999999}
                placeholder="Enter Your Phone Number"
                className="border-2 border-slate-400 rounded-md w-full px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.number}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    number: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`${
            isSubmit ? "bg-transparent" : "bg-green-500"
          } border-2 mt-8 w-full border-green-500 text-white text-lg rounded-md px-2 py-1.5 hover:bg-transparent hover:text-green-500 transition`}
        >
          {isSubmit ? (
            <TailSpin
              visible={true}
              height={25}
              width={25}
              wrapperClass="flex-center text-green-500"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default Form;

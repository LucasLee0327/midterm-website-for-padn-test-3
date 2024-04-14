import { useState, useEffect } from "react";
import services from "../services";
import defPic from "./default-avatar.jpg";

// you should design your register page and api
function SignUpPage() {
  const [account, setAccount] = useState({ username: "", password: ""});
  const [message, setMessage] = useState("");
  const [defaultAvatarBase64, setDefaultAvatarBase64] = useState(null);

  useEffect(() => {
    // 取得 default-picture.jpg 並轉換為 Blob 對象
    fetch(defPic)
      .then((response) => response.blob())
      .then((blob) => {
        // 將 Blob 轉換為 base64 格式
        const reader = new FileReader();
        reader.onload = () => {
          setDefaultAvatarBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching default avatar:", error);
      });
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    // const { name, value } = event.target
    // obj = { ...prev }; obj[name] = value
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    if (!defaultAvatarBase64) {
      console.error("Default avatar image not loaded.");
      return;
    }
    services.user.createOne({ username: account.username, password: account.password, avatar: defaultAvatarBase64 }).then((data) => {
      setMessage("Account created!");
    });
    setAccount({ username: "", password: "" });
    event.preventDefault();
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                  value={account.username}
                  onChange={handleTextInputChange}
                />
                <label htmlFor="username" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={account.password}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <pre>{message}</pre>
    </>
  );
}

export default SignUpPage;

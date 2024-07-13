import { useMutation } from "@tanstack/react-query";
import { SignInValues } from "./type";
import { signIn } from ".";
import { toast } from "react-toastify";

const useSignInMutation = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      localStorage.setItem("token", data.token);
      window.location.replace("/");
    },
    onError: () => {
      toast.error(
        "failed to sign in please enter correct user name & password"
      );
    },
  });
};
export { useSignInMutation };

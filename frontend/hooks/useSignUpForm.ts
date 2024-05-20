import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValue } from "@/types/auth";

const useSignUpForm = () => {
  const signUpSchema = yup.object().shape({
    nickname: yup.string().trim().min(2).max(10),
    gender: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpValue>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const watchNickname = watch("nickname");
  const nicknameError = errors.nickname;

  return {
    watchNickname,
    nicknameError,
    register,
    handleSubmit,
  };
};

export default useSignUpForm;

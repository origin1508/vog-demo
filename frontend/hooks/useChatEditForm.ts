import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChatEditValue } from "@/types/chat";

const useChatEditForm = () => {
  const chatSchema = yup.object().shape({
    title: yup.string().required(),
    game: yup.string().required(),
    maximumMember: yup.number().min(2).max(5).required(),
  });

  const { register, handleSubmit, reset } = useForm<ChatEditValue>({
    mode: "onChange",
    defaultValues: {
      title: "",
      game: "",
      maximumMember: 2,
    },
    resolver: yupResolver(chatSchema),
  });

  return { register, handleSubmit, reset };
};

export default useChatEditForm;

import validator from "validator";
import { PostFormData } from "../../types/post";

export const validatePostInput = (data: PostFormData) => {
  const error: Partial<PostFormData> = {};
  if (!data.title || validator.isEmpty(data.title))
    error.title = "Title is required";
  if (!data.content || validator.isEmpty(data.content))
    error.content = "Content is required";

  return {
    isValid: Object.keys(error).length === 0,
    error: error,
  };
};

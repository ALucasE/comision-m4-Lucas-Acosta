import { useAuth } from "../context/AuthContext";
import { CardSinPostPublic } from "./CardSinPostPublic";
import { CardSinPostPrivate } from "./CardSinPostPrivate";

export const SinPost = () => {
  const { auth } = useAuth();
  if (auth === null) {
    return <CardSinPostPublic />;
  } else if (auth === undefined) {
    return <CardSinPostPublic />;
  } else return <CardSinPostPrivate />;
};

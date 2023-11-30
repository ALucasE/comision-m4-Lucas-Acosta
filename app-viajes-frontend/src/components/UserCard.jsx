import { useAuth } from "../context/AuthContext";

export const UserCard = () => {
  const { auth } = useAuth();
  return (
    <div className="card p-1 border-0">
      <div className="d-flex align-items-center">
        <div className="image">
          <img src={auth?.user?.avatar} className="rounded" width={50} />
        </div>
        <div className="ml-3 w-100">
          <h4 className="mx-0 my-0">@{auth?.user?.username}</h4>
          <span>{auth?.user?.email}</span>
        </div>
      </div>
    </div>
  );
};

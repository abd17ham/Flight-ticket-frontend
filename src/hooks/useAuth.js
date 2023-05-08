import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("user");
    data = JSON.parse(data);
    if (data) {
      setUser(data.user);
      setRole(data.role);
      setToken(data.token);
      setId(data.id);
    }
  }, []);

  return {
    user,
    role,
    token,
    id,
  };
};

export default useAuth;

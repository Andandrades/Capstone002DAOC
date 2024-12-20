import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', role: '', weight: '', height: '' });
  const [loading, setLoading] = useState(false);

  const fetchAuthData = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const isAuthenticated = data.isAuth || false;
        setIsAuth(isAuthenticated);
        localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));

        if (isAuthenticated) {
          const user = {
            id: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
            remaining_classes: data.remaining_classes,
            plan_id: data.plan_id,
            weight: data.weight,
            height: data.height,
            suscription_id: data.suscription_id,
            gender: data.gender
          };
          if (user.id !== null || user.email !== null) {
            setUserData(user);
            localStorage.setItem("userData", JSON.stringify(user));
          } else {
            setUserData({ id: null, name: null, email: null, role: null });
            localStorage.removeItem("userData");
          }
        } else {
          setUserData({ id: null, name: null, email: null, role: null });
          localStorage.removeItem("userData");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
        setIsAuth(true);
        setUserData({ id: null, name: null, email: null, role: null });
        setLoading(false);
      })
      setLoading(false);
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  const userContextValue = useMemo(() => ({
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    loading,
    setLoading,
    fetchAuthData
  }), [isAuth, userData, loading]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

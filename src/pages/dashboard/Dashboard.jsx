import { useAuth } from "../../auth/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Usuario: {user.email}</p>
      <p>Rol: {user.role}</p>

      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
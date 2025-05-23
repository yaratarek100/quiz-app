import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-lg mb-3">You do not have permission to access this page.</p>
    <Link
  to="/login"
  className="bg-black text-white px-4 py-2  rounded-md  transition duration-300"
>
  Login
</Link>

    </div>
  );
}

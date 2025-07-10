import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="text-center p-10 m-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-lg mb-3">You do not have permission to access this page.</p>
      <div className="flex gap-5 justify-center m-5">

    <Link
  to="/login"
  className="bg-black text-white px-4 py-2  rounded-md  transition duration-300"
>
  Login as Instructor
</Link>
    <Link
  to="/dashboard"
  className="bg-yellow-300 text-white px-4 py-2  rounded-md  transition duration-300"
>
  back to Home
</Link>
  </div>

    </div>
  );
}

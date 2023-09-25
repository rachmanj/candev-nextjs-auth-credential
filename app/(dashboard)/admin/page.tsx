import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  let content;
  if (!session) {
    content = <p>You are not logged in</p>;
  } else {
    content = (
      <div className="text-4xl">
        Welcome back {session?.user.username.toUpperCase()}
      </div>
    );
  }

  return content;
};

export default Dashboard;

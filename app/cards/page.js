import FlashCard from "@/components/FlashCard";
import authOptions from "@/lib/auth/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      Cards: true,
    },
  });
  if (!user) {
    redirect("/api/auth/signin");
  }

  const randomColor = () => {
    const colors = [
      "bg-red-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-indigo-400",
      "bg-purple-400",
      "bg-pink-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="px-5 w-full">
      <div>
        <h1 className="text-5xl font-bold">Your Cards</h1>
        <p className="text-xl px-2 py-1">{user.Cards.length} cards</p>
      </div>
      <div className="flex items-end justify-end my-5">
        <a href="/cards/add" className="justify-end self-end">
          <button className="btn btn-primary justify-end">Add Card</button>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 my-5">
        {user.Cards.map((card) => (
          <FlashCard card={card} key={card.id} color={randomColor()} />
        ))}
      </div>
    </div>
  );
}

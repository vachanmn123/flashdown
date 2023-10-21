import QuizUI from "@/components/QuizUI";
import authOptions from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default async function Quiz() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/api/auth/signin");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      Cards: true,
    },
  });

  return <QuizUI questions={shuffle(user.Cards)} />;
}

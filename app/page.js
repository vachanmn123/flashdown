export default async function Home() {
  return (
    <div className="hero py-32 bg-base-100">
      <div className="hero-content max-w-6xl flex-col lg:flex-row-reverse gap-12">
        <img src="/previewImg.png" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">FlashDown!</h1>
          <p className="py-6">
            Flashdown is a simple flashcard app that helps users memorize
            information through the use of digital flashcards. It is designed to
            be user-friendly and intuitive, making it easy for anyone to create
            and study flashcards. Whether you're studying for an exam or trying
            to learn a new language, Flashdown is a great tool to help you
            memorize information quickly and efficiently.
          </p>
          <a href="/cards">
            <button className="btn btn-primary">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  );
}

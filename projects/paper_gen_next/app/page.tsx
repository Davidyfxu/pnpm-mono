import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">PaperGen Task</h1>
          <p className="py-6 text-lg leading-loose">
            2-Min Paper Writer: <br /> Well-Searched, Human-Like, Smart Charts
          </p>
          <Link href="/task" className="btn btn-secondary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

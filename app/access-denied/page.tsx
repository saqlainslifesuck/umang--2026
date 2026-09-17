import Link from "next/link"
import { Nunito_Sans } from "next/font/google"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
})

export default function AccessDeniedPage() {
  return (
    <main
      className={`${nunito.variable} relative min-h-screen overflow-hidden bg-[#102052] text-white`}
      style={{
        fontFamily: "var(--font-nunito), sans-serif",
      }}
    >
      {/* ================================
          BACKGROUND VIDEO
      ================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/images/besc-background.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#071a4c]/75" />

      {/* Bottom cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06122f]/95 via-[#071b48]/45 to-[#071b48]/35" />

      {/* ================================
          HEADER
      ================================= */}

      <header className="relative z-20 flex items-center px-7 pt-5 md:px-10 lg:px-16 lg:pt-6">

        {/* BESC LOGO */}
        <img
          src="/images/besc-logo.png"
          alt="The Bhawanipur Education Society College"
          className="h-12 w-auto object-contain md:h-14 lg:h-16"
        />

        {/* Horizontal line */}
        <div className="mx-7 hidden h-px flex-1 bg-white/25 md:block" />

        {/* Right section */}
        <div className="ml-auto flex items-center gap-4 md:gap-5">

          {/* UMANG LOGO */}
          <img
            src="/images/umang-logo.png"
            alt="UMANG 2026"
            className="h-10 w-auto object-contain md:h-12 lg:h-14"
          />

          {/* Divider */}
          <div className="hidden h-7 w-px bg-white/25 sm:block" />

          {/* Search icon */}
          <button
            type="button"
            aria-label="Search"
            className="text-[#f7c62e] transition hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l5 5" />
            </svg>
          </button>

          {/* Information icon */}
          <button
            type="button"
            aria-label="Information"
            className="text-[#f7c62e] transition hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <circle
                cx="12"
                cy="7"
                r="0.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </button>

        </div>
      </header>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <section className="relative z-10 flex min-h-[calc(100vh-125px)] items-center justify-center px-6 py-16">

        <div className="w-full max-w-[780px] text-center">

          {/* Small heading */}
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f7c62e]">
            UMANG 2026 • MEMBER ACCESS
          </p>

          {/* Lock icon */}
          <div className="mx-auto mt-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#f7c62e]/50 bg-[#10245c]/70">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f7c62e"
              strokeWidth="1.8"
              className="h-9 w-9"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
              />

              <path d="M8 10V7a4 4 0 0 1 8 0v3" />

              <circle
                cx="12"
                cy="15"
                r="1"
                fill="#f7c62e"
              />
            </svg>

          </div>

          {/* ================================
              ACCESS DENIED
          ================================= */}

          <h1 className="mt-8 text-5xl font-extrabold uppercase leading-none tracking-[-0.04em] text-[#e52b3f] sm:text-6xl md:text-7xl lg:text-8xl">
            ACCESS DENIED
          </h1>

          {/* Accent lines */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">

            <span className="h-[4px] w-14 rounded-full bg-[#e52b3f]" />

            <span className="h-[4px] w-10 rounded-full bg-[#f7c62e]" />

          </div>

          {/* ================================
              SECONDARY MESSAGE
          ================================= */}

          <h2 className="mt-8 text-xl font-bold text-white sm:text-2xl">
            Use your institutional email to log in.
          </h2>

          {/* Full explanation */}
          <p className="mx-auto mt-5 max-w-[680px] text-sm font-medium leading-7 text-white/85 sm:text-base sm:leading-8">
            Please sign in using your authorized college Google
            account. If you believe you should have access, contact
            the UMANG administration team.
          </p>

          {/* ================================
              RETURN BUTTON
          ================================= */}

          <div className="mt-9">

            <Link
              href="/login"
              className="inline-flex items-center gap-3 rounded-md bg-[#263f91] px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#304daa]"
            >

              <span className="text-xl leading-none">
                ←
              </span>

              <span>
                Return to Login
              </span>

            </Link>

          </div>

        </div>

      </section>

      {/* ================================
          SOCIAL MEDIA ICONS
      ================================= */}

      <div className="absolute bottom-7 left-7 z-20 flex items-center gap-2 md:left-10 lg:left-16">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/bescumang"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-xs font-bold text-[#f7c62e] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f7c62e] hover:bg-[#f7c62e] hover:text-[#17275b]"
        >
          ◎
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/bescumang/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-xs font-bold text-[#f7c62e] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f7c62e] hover:bg-[#f7c62e] hover:text-[#17275b]"
        >
          f
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/school/the-bhawanipur/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[9px] font-bold text-[#f7c62e] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f7c62e] hover:bg-[#f7c62e] hover:text-[#17275b]"
        >
          in
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@thebhawanipurcollege4312"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[9px] font-bold text-[#f7c62e] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f7c62e] hover:bg-[#f7c62e] hover:text-[#17275b]"
        >
          ▶
        </a>

      </div>

    </main>
  )
}
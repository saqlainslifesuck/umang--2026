import { signIn } from "@/auth"

const socials = [
  {
    name: "Instagram",
    short: "◎",
    href: "https://www.instagram.com/bescumang",
  },
  {
    name: "Facebook",
    short: "f",
    href: "https://www.facebook.com/bescumang/",
  },
  {
    name: "LinkedIn",
    short: "in",
    href: "https://www.linkedin.com/school/the-bhawanipur/",
  },
  {
    name: "YouTube",
    short: "▶",
    href: "https://youtube.com/@thebhawanipurcollege4312",
  },
]

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14265b] text-white">

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
      <div className="absolute inset-0 bg-[#101f52]/65" />

      {/* Bottom cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071333]/95 via-[#071333]/20 to-[#071333]/45" />

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

        {/* Long BESC-style line */}

        <div className="mx-7 hidden h-px flex-1 bg-white/25 md:block" />

        {/* RIGHT SIDE */}

        <div className="ml-auto flex items-center gap-4 md:gap-5">

          {/* UMANG LOGO */}

          <img
            src="/images/umang-logo.png"
            alt="UMANG 2026"
            className="h-10 w-auto object-contain md:h-12 lg:h-14"
          />

          {/* Divider */}

          <div className="hidden h-7 w-px bg-white/30 sm:block" />

          {/* SEARCH ICON */}

          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center text-[#f7c62e] transition hover:scale-110"
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

          {/* INFO ICON */}

          <button
            type="button"
            aria-label="Information"
            className="flex h-9 w-9 items-center justify-center text-[#f7c62e] transition hover:scale-110"
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

      <section className="relative z-10 flex min-h-[calc(100vh-120px)] items-center px-7 py-12 md:px-10 lg:px-16">

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-14 lg:grid-cols-[1fr_430px] xl:grid-cols-[1fr_460px]">

          {/* ================================
              LEFT HERO
          ================================= */}

          <div className="max-w-3xl">

            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#f7c62e] md:text-xs">
              MANAGEMENT &amp; OPERATIONS PORTAL
            </p>

            {/* ACTUAL UMANG LOGO */}

            <img
              src="/images/umang-logo.png"
              alt="UMANG 2026"
              className="w-[280px] max-w-full object-contain object-left md:w-[380px] lg:w-[460px]"
            />

            {/* BESC STYLE COLOUR LINE */}

            <div className="mt-7 flex items-center gap-2">

              <span className="h-[4px] w-16 rounded-full bg-[#233d8f]" />

              <span className="h-[4px] w-10 rounded-full bg-[#f7c62e]" />

              <span className="h-[4px] w-8 rounded-full bg-[#dc2855]" />

              <span className="h-[4px] w-10 rounded-full bg-[#38a594]" />

            </div>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-2xl text-sm font-normal leading-7 text-white/90 md:text-base md:leading-8">

              A central workspace for UMANG 2026 —
              connecting departments, teams, resources
              and operations through one platform.

            </p>

            {/* LOCATION / BRANDING */}

            <div className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/65">

              <span className="h-px w-8 bg-[#f7c62e]" />

              <span>BESC • KOLKATA</span>

            </div>

          </div>

          {/* ================================
              LOGIN CARD
          ================================= */}

          <div className="w-full">

            <div className="overflow-hidden rounded-xl border border-white/30 bg-[#152960]/75 shadow-2xl backdrop-blur-xl">

              {/* TOP COLOUR BAR */}

              <div className="flex h-1.5">

                <div className="w-[48%] bg-[#233d8f]" />

                <div className="w-[22%] bg-[#f7c62e]" />

                <div className="w-[15%] bg-[#dc2855]" />

                <div className="w-[15%] bg-[#38a594]" />

              </div>

              {/* CARD CONTENT */}

              <div className="p-7 md:p-9">

                <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#f7c62e]">
                  MEMBER ACCESS
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">

                  Welcome to
                  <br />

                  <span className="text-[#f7c62e]">
                    UMANG.
                  </span>

                </h2>

                <p className="mt-4 max-w-sm text-sm font-normal leading-6 text-white/70">

                  Sign in using your authorized college
                  Google account to continue.

                </p>

                {/* GOOGLE LOGIN */}

                <form
                  action={async () => {
                    "use server"

                    await signIn("google", {
                      redirectTo: "/",
                    })
                  }}
                  className="mt-8"
                >

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-between rounded-md bg-[#233d8f] px-5 py-4 text-sm font-semibold text-white shadow-lg transition duration-200 hover:bg-[#2d4aa5] hover:shadow-xl"
                  >

                    <span className="flex items-center gap-3">

                      {/* GOOGLE ICON */}

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#4285F4]">
                        G
                      </span>

                      <span>
                        Continue with Google
                      </span>

                    </span>

                    <span className="text-lg text-[#f7c62e] transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>

                  </button>

                </form>

                {/* ACCESS NOTE */}

                <div className="mt-6 border-t border-white/15 pt-5">

                  <p className="text-[10px] leading-5 text-white/45">
                    Access is restricted to authorized UMANG members.
                  </p>

                </div>

              </div>

              {/* BOTTOM COLOUR BAR */}

              <div className="flex h-2">

                <div className="w-1/4 bg-[#38a594]" />

                <div className="w-1/4 bg-[#f7c62e]" />

                <div className="w-1/2 bg-[#233d8f]" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          SOCIAL MEDIA ICONS
      ================================= */}

      <div className="absolute bottom-6 left-7 z-20 flex items-center gap-2 md:left-10 lg:left-16">

        {socials.map((social) => (

          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#152960]/50 text-[10px] font-bold text-[#f7c62e] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-[#f7c62e] hover:bg-[#f7c62e] hover:text-[#17275b]"
          >

            {social.short}

          </a>

        ))}

      </div>

      {/* ================================
          BOTTOM RIGHT
      ================================= */}

      <div className="absolute bottom-7 right-7 z-20 hidden items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/50 lg:flex">

        <span className="h-px w-10 bg-[#f7c62e]" />

        UMANG 2026

      </div>

    </main>
  )
}
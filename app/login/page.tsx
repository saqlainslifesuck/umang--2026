import { signIn } from "@/auth"

export default function LoginPage() {
  async function handleGoogleSignIn() {
    "use server"

    await signIn("google", {
      redirectTo: "/",
    })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020711] text-white">

      {/* =========================
          BACKGROUND VIDEO
      ========================== */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source
          src="/images/umang-login.mp4"
          type="video/mp4"
        />
      </video>

      {/* =========================
          DARK OVERLAY
      ========================== */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_45%,rgba(0,0,0,0.82)_100%)]" />

      {/* =========================
          VIGNETTE
      ========================== */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.45)_100%)]" />

      {/* =========================
          BESC LOGO
      ========================== */}
      <div className="absolute left-8 top-7 z-50 md:left-10 md:top-8">
        <img
          src="/images/besc-logo.png"
          alt="The Bhawanipur Education Society College"
          className="h-auto w-[130px] object-contain md:w-[155px]"
        />
      </div>

      {/* =========================
          UMANG LOGO
      ========================== */}
      <div className="absolute right-8 top-7 z-50 md:right-10 md:top-8">
        <img
          src="/images/umang-logo.png"
          alt="UMANG"
          className="h-auto w-[125px] object-contain md:w-[150px]"
        />
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div className="relative z-40 flex min-h-screen w-full flex-col justify-center px-7 pb-24 pt-28 md:px-[7vw]">

        <div className="mx-auto flex w-full max-w-[1450px] flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20">

          {/* =========================
              LEFT SIDE
          ========================== */}
          <section className="w-full max-w-[720px]">

            <div className="mb-5 text-[12px] font-bold uppercase tracking-[0.25em] text-white/75 md:text-sm md:tracking-[0.28em]">
              MANAGEMENT &amp; OPERATIONS PORTAL
            </div>

            <h1 className="m-0 text-[82px] font-black uppercase leading-[0.82] tracking-[-0.075em] text-white sm:text-[110px] md:text-[145px] lg:text-[170px]">
              UMANG
            </h1>

            {/* MULTICOLOR LINE */}
            <div className="mt-7 mb-7 h-[4px] w-full max-w-[520px] bg-[linear-gradient(90deg,#ffca28_0%,#ff8a65_30%,#d66efd_63%,#5d8dff_100%)]" />

            <p className="max-w-[600px] text-[15px] leading-7 text-white/70 md:text-[18px] md:leading-[1.7]">
              The official management and operations portal for UMANG.
              Coordinate departments, manage resources, and keep the
              festival running seamlessly.
            </p>

            <div className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/50 md:mt-16 md:text-xs">
              LEARN. EXPERIENCE. EVOLVE.
            </div>

          </section>

          {/* =========================
              LOGIN CARD
          ========================== */}
          <section className="w-full max-w-[440px] shrink-0">

            <div className="rounded-[24px] border border-white/15 bg-[rgba(8,14,25,0.63)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[20px] md:p-[38px]">

              {/* CARD LABEL */}
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.27em] text-white/55">
                MEMBER ACCESS
              </div>

              {/* CARD TITLE */}
              <h2 className="mb-3 text-[31px] font-bold leading-tight tracking-[-0.03em] md:text-[36px]">
                Welcome to UMANG.
              </h2>

              {/* DESCRIPTION */}
              <p className="mb-8 text-[14px] leading-6 text-white/60 md:text-[15px] md:leading-[1.65]">
                Sign in using your authorized college Google
                account to continue.
              </p>

              {/* GOOGLE BUTTON */}
              <form action={handleGoogleSignIn}>
                <button
                  type="submit"
                  className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-0 bg-[#f4c542] text-[14px] font-extrabold tracking-[0.01em] text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition duration-200 hover:scale-[1.01] hover:bg-[#ffd45a] active:scale-[0.99]"
                >

                  {/* GOOGLE ICON */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.49 4.49 0 0 1-1.94 2.95v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.27Z"
                    />

                    <path
                      fill="#34A853"
                      d="M12 21.9c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.9Z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M6.53 13.98a5.86 5.86 0 0 1 0-3.72V7.73H3.29a9.75 9.75 0 0 0 0 8.78l3.24-2.53Z"
                    />

                    <path
                      fill="#EA4335"
                      d="M12 6.23c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.3 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.71 5.33l3.24 2.53C7.3 7.95 9.46 6.23 12 6.23Z"
                    />
                  </svg>

                  Continue with Google
                </button>
              </form>

              {/* RESTRICTION MESSAGE */}
              <div className="mt-6 border-t border-white/10 pt-5 text-center text-[11px] leading-5 text-white/40">
                Access is restricted to authorized UMANG members.
              </div>

            </div>

          </section>

        </div>
      </div>

      {/* =========================
          DATE
      ========================== */}
      <div className="absolute bottom-6 right-7 z-50 text-[9px] uppercase tracking-[0.2em] text-white/45 md:bottom-8 md:right-10 md:text-xs md:tracking-[0.22em]">
        UMANG 2026
      </div>

    </main>
  )
}
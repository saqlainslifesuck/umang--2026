import Image from "next/image"
import { signIn } from "@/auth"

export default function LoginPage() {
  async function handleGoogleSignIn() {
    "use server"

    await signIn("google", {
      redirectTo: "/",
    })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020711] text-white">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/bhawanipur-building.png"
        alt="The Bhawanipur Education Society College"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* LEFT-SIDE DARKENING */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.55)_48%,rgba(0,0,0,0.68)_100%)]" />

      {/* TOP LEFT LOGO */}
      <div className="absolute left-6 top-6 z-20 md:left-10 md:top-8">
        <Image
          src="/images/besc-logo.png"
          alt="The Bhawanipur Education Society College"
          width={155}
          height={70}
          priority
          className="h-auto w-[125px] object-contain md:w-[155px]"
        />
      </div>

      {/* TOP RIGHT LOGO */}
      <div className="absolute right-6 top-6 z-20 md:right-10 md:top-8">
        <Image
          src="/images/umang-logo.png"
          alt="UMANG"
          width={150}
          height={70}
          priority
          className="h-auto w-[120px] object-contain md:w-[150px]"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center px-6 py-24 md:px-[7vw]">

        <div className="mx-auto flex w-full max-w-[1450px] flex-col justify-between gap-12 lg:flex-row lg:items-center lg:gap-20">

          {/* LEFT CONTENT */}
          <section className="w-full max-w-[700px]">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/75 md:text-sm">
              MANAGEMENT &amp; OPERATIONS PORTAL
            </p>

            <h1 className="text-[76px] font-black leading-[0.82] tracking-[-0.07em] sm:text-[100px] md:text-[140px] lg:text-[170px]">
              UMANG
            </h1>

            {/* ACCENT LINE */}
            <div className="my-7 h-[3px] w-full max-w-[500px] bg-gradient-to-r from-[#ffca28] via-[#e66b9a] to-[#668cff]" />

            <p className="max-w-[590px] text-sm leading-7 text-white/70 md:text-lg">
              The official management and operations portal for UMANG.
              Coordinate departments, manage resources, and keep the
              festival running seamlessly.
            </p>

            <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
              LEARN. EXPERIENCE. EVOLVE.
            </p>

          </section>

          {/* LOGIN CARD */}
          <section className="w-full max-w-[430px]">

            <div className="rounded-2xl border border-white/15 bg-[#07101dcc] p-7 shadow-2xl md:p-9">

              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.27em] text-white/50">
                MEMBER ACCESS
              </p>

              <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to UMANG.
              </h2>

              <p className="mb-8 text-sm leading-6 text-white/60 md:text-[15px]">
                Sign in using your authorized college Google account
                to continue.
              </p>

              {/* GOOGLE LOGIN */}
              <form action={handleGoogleSignIn}>
                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#f4c542] text-sm font-extrabold text-black transition hover:bg-[#ffd65c] active:scale-[0.99]"
                >

                  {/* GOOGLE ICON */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
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

              <div className="mt-6 border-t border-white/10 pt-5 text-center text-[11px] leading-5 text-white/40">
                Access is restricted to authorized UMANG members.
              </div>

            </div>

          </section>

        </div>
      </div>

      {/* DATE */}
      <div className="absolute bottom-6 right-6 z-20 text-[9px] uppercase tracking-[0.2em] text-white/45 md:bottom-8 md:right-10 md:text-xs">
        15TH SEPTEMBER 2026
      </div>

    </main>
  )
}
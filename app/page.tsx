"use client"

import Link from "next/link"
import { useState } from "react"

const backEndDepartments = [
  {
    name: "BACKSTAGE",
    description: "Coordination, production and everything behind the scenes.",
    color: "#642D8B",
    pattern: "grid",
  },
  {
    name: "DESIGNING",
    description: "Creative assets, visual identity, posters and design resources.",
    color: "#E96B24",
    pattern: "dots",
  },
  {
    name: "FINANCE",
    description: "Budgets, expenses, approvals and financial coordination.",
    color: "#C92D4D",
    pattern: "diagonal",
  },
  {
    name: "FOOD",
    description: "Food planning, requirements, vendors and distribution.",
    color: "#087F73",
    pattern: "rings",
  },
  {
    name: "HOSPITALITY",
    description: "Guests, judges, artists and hospitality coordination.",
    color: "#C85A8B",
    pattern: "grid",
  },
  {
    name: "PCS",
    description: "Prize, certification and scoring related resources.",
    color: "#315DA8",
    pattern: "dots",
  },
  {
    name: "PHOTOGRAPHY & VIDEOGRAPHY",
    description: "Photography, videography and visual documentation.",
    color: "#D56A2A",
    pattern: "diagonal",
  },
  {
    name: "REGISTRATION",
    description: "Registration systems, forms and related resources.",
    color: "#713C91",
    pattern: "rings",
  },
  {
    name: "REPORTING",
    description: "Reports, documentation and departmental updates.",
    color: "#168276",
    pattern: "grid",
  },
  {
    name: "SPONSORSHIP",
    description: "Sponsors, proposals, communication and partnerships.",
    color: "#C62F4D",
    pattern: "dots",
  },
  {
    name: "STATIONERY",
    description: "Stationery requirements, inventory and distribution.",
    color: "#355FA4",
    pattern: "diagonal",
  },
  {
    name: "SECURITY",
    description: "Security planning, access control and coordination.",
    color: "#603A86",
    pattern: "rings",
  },
  {
    name: "SOCIAL MEDIA MANAGEMENT",
    description: "Content planning, publishing and social media resources.",
    color: "#E06B27",
    pattern: "grid",
  },
  {
    name: "TRANSPORT",
    description: "Transport planning, movement and logistical coordination.",
    color: "#148276",
    pattern: "dots",
  },
]

const frontEndDepartments = [
  {
    name: "FINE ARTS",
    description: "Creative competitions, exhibitions and fine arts activities.",
    color: "#C72F4D",
    pattern: "rings",
  },
  {
    name: "LITERARY ARTS",
    description: "Literary competitions, speaking events and written expression.",
    color: "#5C328A",
    pattern: "grid",
  },
  {
    name: "MANAGEMENT EVENTS",
    description: "Business, management and strategy-based events.",
    color: "#E46D27",
    pattern: "dots",
  },
  {
    name: "PERFORMING ARTS",
    description: "Dance, music, theatre and stage performances.",
    color: "#138277",
    pattern: "diagonal",
  },
  {
    name: "STAR EVENTS",
    description: "Major attractions and headline UMANG experiences.",
    color: "#C72E4C",
    pattern: "grid",
  },
  {
    name: "SPORTS",
    description: "Sports competitions, fixtures and event coordination.",
    color: "#315CA0",
    pattern: "rings",
  },
  {
    name: "UMANG GAMING CONSOLE",
    description: "Gaming events, tournaments and gaming experiences.",
    color: "#68398B",
    pattern: "dots",
  },
  {
    name: "VOICES IN ACTION",
    description: "Anchoring, public speaking and voice-based events.",
    color: "#DF6B28",
    pattern: "diagonal",
  },
]

function getPattern(pattern: string) {
  if (pattern === "grid") {
    return {
      backgroundImage:
        "linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }
  }

  if (pattern === "dots") {
    return {
      backgroundImage:
        "radial-gradient(rgba(255,255,255,.20) 1.5px, transparent 1.5px)",
      backgroundSize: "18px 18px",
    }
  }

  if (pattern === "diagonal") {
    return {
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(255,255,255,.08) 0px, rgba(255,255,255,.08) 2px, transparent 2px, transparent 14px)",
    }
  }

  return {
    backgroundImage:
      "radial-gradient(circle at center, transparent 0 20px, rgba(255,255,255,.10) 21px 22px, transparent 23px)",
    backgroundSize: "70px 70px",
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
}

function DepartmentCard({
  department,
  index,
}: {
  department: {
    name: string
    description: string
    color: string
    pattern: string
  }
  index: number
}) {
  return (
    <Link
      href={`/departments/${slugify(department.name)}`}
      className="group relative min-h-[285px] overflow-hidden rounded-[4px] p-7 text-left shadow-[0_15px_40px_rgba(0,0,0,.18)] transition duration-500 hover:-translate-y-2"
      style={{ backgroundColor: department.color }}
    >
      {/* ORIGINAL PATTERN */}
      <div
        className="absolute inset-0 opacity-60"
        style={getPattern(department.pattern)}
      />

      {/* ORIGINAL DECORATIVE CIRCLES */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[18px] border-white/10 transition duration-700 group-hover:scale-125" />

      <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/20" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[.28em] text-white/65">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-xl text-white/70 transition group-hover:rotate-45">
              ↗
            </span>
          </div>

          <h3 className="max-w-[290px] text-[27px] font-black uppercase leading-[.95] tracking-[-.04em] text-white">
            {department.name}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-5">
          <p className="max-w-[250px] text-[12px] leading-5 text-white/70">
            {department.description}
          </p>

          <div className="h-2 w-2 shrink-0 rounded-full bg-[#F8C744]" />
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const [search, setSearch] = useState("")

  const query = search.toLowerCase().trim()

  const filteredBackEnd = backEndDepartments.filter((department) =>
    department.name.toLowerCase().includes(query)
  )

  const filteredFrontEnd = frontEndDepartments.filter((department) =>
    department.name.toLowerCase().includes(query)
  )

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F3EE] text-[#102E62]">

      {/* ================= HEADER ================= */}

      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/15 bg-[#102E62]/75 shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

          <div className="flex items-center gap-4">

            <img
              src="/images/besc-logo.png"
              alt="The Bhawanipur Education Society College"
              className="h-9 w-auto object-contain"
            />

            <div className="h-8 w-px bg-white/25" />

            <img
              src="/images/umang-logo.png"
              alt="UMANG 2026"
              className="h-10 w-auto object-contain"
            />

          </div>

          <div className="relative hidden w-[300px] sm:block">

            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/65"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments"
              className="h-10 w-full rounded-full border border-white/25 bg-white/10 pl-11 pr-5 text-sm text-white outline-none backdrop-blur-md placeholder:text-white/55 focus:border-[#F8C744]"
            />

          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="relative min-h-screen overflow-hidden bg-[#102E62]">

        <div
          className="fixed inset-0 -z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bhawanipur-building.png')",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="fixed inset-0 -z-0 bg-[#102E62]/85" />

        <div
          className="fixed inset-0 -z-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-28 pt-32 text-center">

          <div className="max-w-[1050px]">

            <p className="mb-8 text-xs font-bold tracking-[.42em] text-[#F8C744]">
              UMANG 2026 · INTERNAL PORTAL
            </p>

            {/* EXACTLY TWO LINES */}

            <h1 className="text-[34px] font-black uppercase leading-[.95] tracking-[-.05em] text-white sm:text-[48px] md:text-[62px] lg:text-[76px]">

              CLICK HERE TO OPEN THE

              <br />

              <span className="text-[#F8C744]">
                REPRESENTATIVE PROFILE
              </span>

            </h1>

            <p className="mx-auto mt-10 max-w-[650px] text-sm leading-7 text-white/70 sm:text-base">
              Access the central UMANG workspace, departmental resources,
              operational files and essential links from one place.
            </p>

            {/* OPEN UMANG DRIVE */}

            <div className="mt-12 flex justify-center">

              <a
                href="PASTE-YOUR-GOOGLE-DRIVE-LINK-HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[72px] min-w-[280px] items-center justify-between rounded-full bg-[#F8C744] px-8 text-left text-[#102E62] shadow-[0_15px_50px_rgba(0,0,0,.25)] transition duration-300 hover:scale-[1.03]"
              >

                <span className="text-sm font-black uppercase tracking-[.12em]">
                  Open UMANG Drive
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102E62] text-xl text-[#F8C744] transition group-hover:translate-x-1">
                  ↗
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ================= DEPARTMENTS ================= */}

      <section className="relative z-20 bg-[#F5F3EE]">

        <div className="px-6 pt-10 sm:hidden">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search departments"
            className="h-12 w-full rounded-full border border-[#102E62]/20 bg-white px-5 text-sm outline-none focus:border-[#102E62]"
          />

        </div>


        {/* ================= BACK-END ================= */}

        <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-20 lg:px-12">

          <div className="mb-12 flex items-end justify-between border-b-2 border-[#102E62]/15 pb-6">

            <div>

              <p className="mb-3 text-xs font-black tracking-[.35em] text-[#E5AE20]">
                01 / OPERATIONS
              </p>

              <h2 className="text-5xl font-black uppercase tracking-[-.05em] text-[#102E62] sm:text-7xl">
                BACK-END
              </h2>

            </div>

            <span className="hidden text-xs font-bold tracking-[.2em] text-[#102E62]/40 sm:block">
              {filteredBackEnd.length} DEPARTMENTS
            </span>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredBackEnd.map((department, index) => (
              <DepartmentCard
                key={department.name}
                department={department}
                index={index}
              />
            ))}

          </div>

        </div>


        {/* ================= FRONT-END ================= */}

        <div className="mx-auto max-w-[1500px] px-6 pb-36 lg:px-12">

          <div className="mb-12 flex items-end justify-between border-b-2 border-[#102E62]/15 pb-6">

            <div>

              <p className="mb-3 text-xs font-black tracking-[.35em] text-[#E5AE20]">
                02 / EVENTS
              </p>

              <h2 className="text-5xl font-black uppercase tracking-[-.05em] text-[#102E62] sm:text-7xl">
                FRONT-END
              </h2>

            </div>

            <span className="hidden text-xs font-bold tracking-[.2em] text-[#102E62]/40 sm:block">
              {filteredFrontEnd.length} DEPARTMENTS
            </span>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredFrontEnd.map((department, index) => (
              <DepartmentCard
                key={department.name}
                department={department}
                index={index}
              />
            ))}

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="relative z-20 overflow-hidden bg-[#102E62] text-white">

        <div className="mx-auto max-w-[1500px] px-6 pt-20 lg:px-12">

          <div className="flex flex-col justify-between gap-14 md:flex-row">

            {/* BESC INFORMATION */}

            <div>

              <p className="font-serif text-3xl leading-none">
                THE BHAWANIPUR
              </p>

              <p className="mt-1 text-[11px] tracking-[.28em] text-white/65">
                EDUCATION SOCIETY COLLEGE
              </p>

              <p className="mt-8 text-sm leading-6 text-white/70">
                5 Lala Lajpat Rai Sarani,
                <br />
                Kolkata: 700 020
              </p>

              <a
                href="tel:03340195555"
                className="mt-6 block text-sm font-bold text-[#F8C744] transition hover:text-white"
              >
                033 4019-5555 →
              </a>

              <a
                href="mailto:info@thebges.edu.in"
                className="mt-2 block text-sm font-bold text-[#F8C744] transition hover:text-white"
              >
                info@thebges.edu.in →
              </a>

              {/* SOCIAL LINKS */}

              <div className="mt-8 flex gap-3">

                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/thebhawanipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-[#F8C744] hover:bg-[#F8C744] hover:text-[#102E62]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M14 8h3V5h-3c-2.8 0-5 2.2-5 5v2H6v3h3v6h3v-6h3l1-3h-4v-2c0-1.1.9-2 2-2Z" />
                  </svg>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/thebhawanipur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-[#F8C744] hover:bg-[#F8C744] hover:text-[#102E62]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                {/* LINKEDIN */}
                <a
                  href="https://www.linkedin.com/school/the-bhawanipur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-[#F8C744] hover:bg-[#F8C744] hover:text-[#102E62]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M6.5 8H3.2v10.8h3.3V8ZM4.85 3.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.8 12.6c0-3.3-1.8-5-4.4-5-2 0-2.9 1.1-3.4 1.8V8H9.7v10.8H13v-5.3c0-1.4.3-2.8 2-2.8 1.6 0 1.6 1.5 1.6 2.8v5.3h3.3l.9-6.2Z" />
                  </svg>
                </a>

                {/* YOUTUBE */}
                <a
                  href="https://www.youtube.com/@thebhawanipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-[#F8C744] hover:bg-[#F8C744] hover:text-[#102E62]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C1.9 9 1.9 12 1.9 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM10 15.5v-7l6 3.5 6 3.5-6 3.5Z" />
                  </svg>
                </a>

              </div>

            </div>


            {/* UMANG */}

            <div className="max-w-[360px]">

              <p className="text-xs font-black tracking-[.35em] text-[#F8C744]">
                UMANG 2026
              </p>

              <h3 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-.04em]">
                ONE PLACE.
                <br />
                EVERYTHING
                <br />
                UMANG.
              </h3>

              <p className="mt-7 text-sm leading-7 text-white/60">
                The central workspace for UMANG 2026 departmental
                resources, coordination and essential links.
              </p>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="mt-16 border-t border-white/15 pt-7 text-center text-xs text-white/60">
            © 2026 All Rights Reserved. The Bhawanipur Education Society College.
          </div>

        </div>


        {/* LARGE BHAWANIPUR */}

        <div className="mt-20 w-full overflow-hidden">

          <div className="whitespace-nowrap text-center text-[15vw] font-black leading-[0.78] tracking-[-.08em] text-[#F8C744]">
            bhawanipur
          </div>

        </div>

      </footer>


      {/* ================= BACK TO TOP ================= */}

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#102E62] shadow-xl transition hover:scale-110"
      >
        ↑
      </button>

    </main>
  )
}
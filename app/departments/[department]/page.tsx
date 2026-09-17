"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Resource = {
  id: string
  section_id: string
  name: string
  url: string
}

type Section = {
  id: string
  department_id: string
  name: string
  description: string | null
  resources: Resource[]
}

type DepartmentConfig = {
  name: string
  group: "BACK-END" | "FRONT-END"
  color: string
  pattern: "grid" | "dots" | "diagonal" | "rings"
}

const departments: Record<string, DepartmentConfig> = {
  backstage: {
    name: "BACKSTAGE",
    group: "BACK-END",
    color: "#642D8B",
    pattern: "grid",
  },
  designing: {
    name: "DESIGNING",
    group: "BACK-END",
    color: "#E96B24",
    pattern: "dots",
  },
  finance: {
    name: "FINANCE",
    group: "BACK-END",
    color: "#C92D4D",
    pattern: "diagonal",
  },
  food: {
    name: "FOOD",
    group: "BACK-END",
    color: "#087F73",
    pattern: "rings",
  },
  hospitality: {
    name: "HOSPITALITY",
    group: "BACK-END",
    color: "#C85A8B",
    pattern: "grid",
  },
  pcs: {
    name: "PCS",
    group: "BACK-END",
    color: "#315DA8",
    pattern: "dots",
  },
  "photography-and-videography": {
    name: "PHOTOGRAPHY & VIDEOGRAPHY",
    group: "BACK-END",
    color: "#D56A2A",
    pattern: "diagonal",
  },
  registration: {
    name: "REGISTRATION",
    group: "BACK-END",
    color: "#713C91",
    pattern: "rings",
  },
  reporting: {
    name: "REPORTING",
    group: "BACK-END",
    color: "#168276",
    pattern: "grid",
  },
  sponsorship: {
    name: "SPONSORSHIP",
    group: "BACK-END",
    color: "#C62F4D",
    pattern: "dots",
  },
  stationery: {
    name: "STATIONERY",
    group: "BACK-END",
    color: "#355FA4",
    pattern: "diagonal",
  },
  security: {
    name: "SECURITY",
    group: "BACK-END",
    color: "#603A86",
    pattern: "rings",
  },
  "social-media-management": {
    name: "SOCIAL MEDIA MANAGEMENT",
    group: "BACK-END",
    color: "#E06B27",
    pattern: "grid",
  },
  transport: {
    name: "TRANSPORT",
    group: "BACK-END",
    color: "#148276",
    pattern: "dots",
  },
  "fine-arts": {
    name: "FINE ARTS",
    group: "FRONT-END",
    color: "#C72F4D",
    pattern: "rings",
  },
  "literary-arts": {
    name: "LITERARY ARTS",
    group: "FRONT-END",
    color: "#5C328A",
    pattern: "grid",
  },
  "management-events": {
    name: "MANAGEMENT EVENTS",
    group: "FRONT-END",
    color: "#E46D27",
    pattern: "dots",
  },
  "performing-arts": {
    name: "PERFORMING ARTS",
    group: "FRONT-END",
    color: "#138277",
    pattern: "diagonal",
  },
  "star-events": {
    name: "STAR EVENTS",
    group: "FRONT-END",
    color: "#C72E4C",
    pattern: "grid",
  },
  sports: {
    name: "SPORTS",
    group: "FRONT-END",
    color: "#315CA0",
    pattern: "rings",
  },
  "umang-gaming-console": {
    name: "UMANG GAMING CONSOLE",
    group: "FRONT-END",
    color: "#68398B",
    pattern: "dots",
  },
  "voices-in-action": {
    name: "VOICES IN ACTION",
    group: "FRONT-END",
    color: "#DF6B28",
    pattern: "diagonal",
  },
}

function getPattern(
  pattern: DepartmentConfig["pattern"]
) {
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

function normalizeUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ""
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

function isValidUrl(value: string) {
  try {
    const parsed = new URL(value)

    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:"
    )
  } catch {
    return false
  }
}

export default function DepartmentPage() {
  const params = useParams()

  const slug = Array.isArray(params.department)
    ? params.department[0]
    : String(params.department || "")

  const department = departments[slug]

  const [sections, setSections] =
    useState<Section[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [showAddSection, setShowAddSection] =
    useState(false)

  const [sectionName, setSectionName] =
    useState("")

  const [sectionDescription, setSectionDescription] =
    useState("")

  const [search, setSearch] =
    useState("")

  const [savingSection, setSavingSection] =
    useState(false)

  const [openResourceForm, setOpenResourceForm] =
    useState<string | null>(null)

  const [resourceNames, setResourceNames] =
    useState<Record<string, string>>({})

  const [resourceUrls, setResourceUrls] =
    useState<Record<string, string>>({})

  const [savingResource, setSavingResource] =
    useState<string | null>(null)

  useEffect(() => {
    if (slug && department) {
      loadWorkspace()
    }
  }, [slug])

  async function loadWorkspace() {
    try {
      setLoading(true)
      setError("")

      const {
        data: departmentRows,
        error: departmentError,
      } = await supabase
        .from("departments")
        .select("id, name, slug")
        .eq("slug", slug)
        .limit(1)

      if (departmentError) {
        throw new Error(
          departmentError.message
        )
      }

      if (
        !departmentRows ||
        departmentRows.length === 0
      ) {
        throw new Error(
          `Department "${slug}" was not found.`
        )
      }

      const departmentId =
        departmentRows[0].id

      const {
        data: sectionRows,
        error: sectionError,
      } = await supabase
        .from("sections")
        .select(
          "id, department_id, name, description, created_at"
        )
        .eq("department_id", departmentId)
        .order("created_at", {
          ascending: true,
        })

      if (sectionError) {
        throw new Error(
          sectionError.message
        )
      }

      const loadedSections =
        sectionRows ?? []

      let loadedResources: Resource[] = []

      if (loadedSections.length > 0) {
        const sectionIds = loadedSections.map(
          (section) => section.id
        )

        const {
          data: resourceRows,
          error: resourceError,
        } = await supabase
          .from("resources")
          .select(
            "id, section_id, name, url, created_at"
          )
          .in("section_id", sectionIds)
          .order("created_at", {
            ascending: true,
          })

        if (resourceError) {
          throw new Error(
            resourceError.message
          )
        }

        loadedResources =
          resourceRows ?? []
      }

      const result =
        loadedSections.map((section) => ({
          id: section.id,
          department_id:
            section.department_id,
          name: section.name,
          description: section.description,
          resources: loadedResources.filter(
            (resource) =>
              resource.section_id ===
              section.id
          ),
        }))

      setSections(result)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load workspace."
      )
    } finally {
      setLoading(false)
    }
  }

  async function createSection() {
    if (!department) {
      return
    }

    const name = sectionName.trim()

    if (!name) {
      setError("Please enter a section name.")
      return
    }

    try {
      setSavingSection(true)
      setError("")

      const {
        data: departmentRows,
        error: departmentError,
      } = await supabase
        .from("departments")
        .select("id")
        .eq("slug", slug)
        .limit(1)

      if (departmentError) {
        throw new Error(
          departmentError.message
        )
      }

      if (
        !departmentRows ||
        departmentRows.length === 0
      ) {
        throw new Error(
          "Department was not found."
        )
      }

      const { data, error: insertError } =
        await supabase
          .from("sections")
          .insert({
            department_id:
              departmentRows[0].id,
            name,
            description:
              sectionDescription.trim() ||
              null,
          })
          .select(
            "id, department_id, name, description"
          )
          .limit(1)

      if (insertError) {
        throw new Error(
          insertError.message
        )
      }

      if (!data || data.length === 0) {
        throw new Error(
          "Section could not be created."
        )
      }

      setSections((current) => [
        ...current,
        {
          id: data[0].id,
          department_id:
            data[0].department_id,
          name: data[0].name,
          description:
            data[0].description,
          resources: [],
        },
      ])

      setSectionName("")
      setSectionDescription("")
      setShowAddSection(false)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create section."
      )
    } finally {
      setSavingSection(false)
    }
  }

  async function addResource(
    sectionId: string
  ) {
    const name = (
      resourceNames[sectionId] || ""
    ).trim()

    const url = normalizeUrl(
      resourceUrls[sectionId] || ""
    )

    if (!name) {
      setError(
        "Please enter a resource name."
      )
      return
    }

    if (!url) {
      setError(
        "Please enter a resource link."
      )
      return
    }

    if (!isValidUrl(url)) {
      setError(
        "Please enter a valid website link."
      )
      return
    }

    try {
      setSavingResource(sectionId)
      setError("")

      const {
        data,
        error: insertError,
      } = await supabase
        .from("resources")
        .insert({
          section_id: sectionId,
          name,
          url,
        })
        .select(
          "id, section_id, name, url"
        )
        .limit(1)

      if (insertError) {
        throw new Error(
          insertError.message
        )
      }

      if (!data || data.length === 0) {
        throw new Error(
          "Resource could not be added."
        )
      }

      const resource = data[0]

      setSections((current) =>
        current.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                resources: [
                  ...section.resources,
                  resource,
                ],
              }
            : section
        )
      )

      setResourceNames((current) => ({
        ...current,
        [sectionId]: "",
      }))

      setResourceUrls((current) => ({
        ...current,
        [sectionId]: "",
      }))

      setOpenResourceForm(null)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Failed to add resource."
      )
    } finally {
      setSavingResource(null)
    }
  }

  async function deleteResource(
    resourceId: string,
    sectionId: string
  ) {
    const confirmed = window.confirm(
      "Delete this resource?"
    )

    if (!confirmed) {
      return
    }

    try {
      setError("")

      const {
        error: deleteError,
      } = await supabase
        .from("resources")
        .delete()
        .eq("id", resourceId)

      if (deleteError) {
        throw new Error(
          deleteError.message
        )
      }

      setSections((current) =>
        current.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                resources:
                  section.resources.filter(
                    (resource) =>
                      resource.id !==
                      resourceId
                  ),
              }
            : section
        )
      )
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete resource."
      )
    }
  }

  async function deleteSection(
    sectionId: string
  ) {
    const confirmed = window.confirm(
      "Delete this section and all resources inside it?"
    )

    if (!confirmed) {
      return
    }

    try {
      setError("")

      const {
        error: deleteError,
      } = await supabase
        .from("sections")
        .delete()
        .eq("id", sectionId)

      if (deleteError) {
        throw new Error(
          deleteError.message
        )
      }

      setSections((current) =>
        current.filter(
          (section) =>
            section.id !== sectionId
        )
      )
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete section."
      )
    }
  }

  if (!department) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F3EE]">
        <div className="text-center">
          <p className="text-xs font-black tracking-[.3em] text-[#E5AE20]">
            UMANG 2026
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase text-[#102E62]">
            Department Not Found
          </h1>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-[#102E62] px-7 py-3 text-xs font-black uppercase tracking-[.12em] text-white"
          >
            ← BACK HOME
          </Link>
        </div>
      </main>
    )
  }

  const pattern = getPattern(
    department.pattern
  )

  const filteredSections =
    sections.filter((section) => {
      const query = search
        .toLowerCase()
        .trim()

      if (!query) {
        return true
      }

      return (
        section.name
          .toLowerCase()
          .includes(query) ||
        (section.description || "")
          .toLowerCase()
          .includes(query) ||
        section.resources.some(
          (resource) =>
            resource.name
              .toLowerCase()
              .includes(query) ||
            resource.url
              .toLowerCase()
              .includes(query)
        )
      )
    })

  return (
    <main className="min-h-screen bg-[#F5F3EE] text-[#102E62]">

      {/* HEADER */}

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

          <Link
            href="/"
            className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-black uppercase tracking-[.15em] text-white transition hover:border-[#F8C744] hover:text-[#F8C744]"
          >
            ← HOME
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section
        className="relative overflow-hidden pt-[78px]"
        style={{
          backgroundColor: department.color,
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={pattern}
        />

        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full border-[22px] border-white/10" />

        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/20" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-[24px] border-white/10" />

        <div className="relative mx-auto max-w-[1500px] px-6 py-24 lg:px-12">

          <p className="text-xs font-bold tracking-[.42em] text-white/65">
            UMANG 2026 · {department.group}
          </p>

          <div className="mt-6 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div className="max-w-[1000px]">

              <h1 className="text-6xl font-black uppercase leading-[.84] tracking-[-.06em] text-white sm:text-8xl lg:text-[105px]">
                {department.name}
              </h1>

              <p className="mt-8 max-w-[650px] text-sm leading-7 text-white/70">
                Your departmental space for managing
                sections, resources and important
                working links.
              </p>

            </div>

            <div className="rounded-[18px] border border-white/20 bg-white/10 px-7 py-5 backdrop-blur-md">

              <p className="text-[10px] font-black tracking-[.3em] text-white/60">
                SECTIONS
              </p>

              <p className="mt-1 text-4xl font-black text-white">
                {sections.length}
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* WORKSPACE */}

      <section className="mx-auto max-w-[1500px] px-6 py-16 lg:px-12">

        <div className="mb-10 flex flex-col gap-6 border-b-2 border-[#102E62]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p
              className="mb-3 text-xs font-black tracking-[.35em]"
              style={{
                color: department.color,
              }}
            >
              01 / DEPARTMENTAL SPACE
            </p>

            <h2 className="text-5xl font-black uppercase tracking-[-.05em] sm:text-6xl">
              WORKSPACE
            </h2>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search workspace"
              className="h-12 rounded-full border border-[#102E62]/15 bg-white px-5 text-sm outline-none focus:border-[#102E62] sm:w-[250px]"
            />

            <button
              type="button"
              onClick={() => {
                setError("")
                setShowAddSection(true)
              }}
              className="h-12 rounded-full px-7 text-xs font-black uppercase tracking-[.12em] text-white shadow-lg transition hover:scale-[1.02]"
              style={{
                backgroundColor:
                  department.color,
              }}
            >
              + ADD SECTION
            </button>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[470px] items-center justify-center rounded-[22px] border border-[#102E62]/10 bg-white">

            <div className="text-center">

              <div
                className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#102E62]/10 border-t-current"
                style={{
                  color:
                    department.color,
                }}
              />

              <p className="mt-5 text-xs font-black uppercase tracking-[.22em] text-[#102E62]/45">
                Loading workspace
              </p>

            </div>

          </div>
        ) : (
          <>

            {/* ADD SECTION */}

            {showAddSection && (
              <div className="mb-10 overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.10)]">

                <div
                  className="relative overflow-hidden px-7 py-6 text-white"
                  style={{
                    backgroundColor:
                      department.color,
                  }}
                >

                  <div
                    className="absolute inset-0 opacity-60"
                    style={pattern}
                  />

                  <div className="relative">

                    <p className="text-[10px] font-black tracking-[.3em] text-[#F8C744]">
                      NEW SECTION
                    </p>

                    <h3 className="mt-2 text-3xl font-black uppercase tracking-[-.03em]">
                      Create a Section
                    </h3>

                  </div>

                </div>

                <div className="p-7">

                  <div className="grid gap-5 lg:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[.2em] text-[#102E62]/45">
                        Section Name
                      </label>

                      <input
                        value={sectionName}
                        onChange={(event) =>
                          setSectionName(
                            event.target.value
                          )
                        }
                        placeholder="e.g. Social Media"
                        className="h-[52px] w-full rounded-xl border border-[#102E62]/15 px-4 text-sm outline-none focus:border-[#102E62]"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[.2em] text-[#102E62]/45">
                        Description
                      </label>

                      <input
                        value={
                          sectionDescription
                        }
                        onChange={(event) =>
                          setSectionDescription(
                            event.target.value
                          )
                        }
                        placeholder="What is this section for?"
                        className="h-[52px] w-full rounded-xl border border-[#102E62]/15 px-4 text-sm outline-none focus:border-[#102E62]"
                      />

                    </div>

                  </div>

                  <div className="mt-8 rounded-xl bg-[#F5F3EE] p-5">

                    <p className="text-[10px] font-black tracking-[.25em]" style={{ color: department.color }}>
                      NOTE
                    </p>

                    <p className="mt-2 text-sm text-[#102E62]/50">
                      Create the section first. You can
                      add any website or web link to it
                      immediately after.
                    </p>

                  </div>

                  <div className="mt-10 flex flex-col gap-3 border-t border-[#102E62]/10 pt-7 sm:flex-row">

                    <button
                      type="button"
                      disabled={savingSection}
                      onClick={createSection}
                      className="rounded-full px-8 py-3.5 text-xs font-black uppercase tracking-[.12em] text-white shadow-lg disabled:opacity-50"
                      style={{
                        backgroundColor:
                          department.color,
                      }}
                    >
                      {savingSection
                        ? "SAVING..."
                        : "CREATE SECTION"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddSection(false)
                        setSectionName("")
                        setSectionDescription("")
                        setError("")
                      }}
                      className="rounded-full border border-[#102E62]/15 px-8 py-3.5 text-xs font-black uppercase tracking-[.12em]"
                    >
                      CANCEL
                    </button>

                  </div>

                </div>
              </div>
            )}

            {/* EMPTY */}

            {filteredSections.length === 0 &&
              !showAddSection && (
                <div className="flex min-h-[470px] items-center justify-center rounded-[22px] border-2 border-dashed border-[#102E62]/12 bg-white">

                  <div className="max-w-[500px] px-6 text-center">

                    <div
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl font-light text-white"
                      style={{
                        backgroundColor:
                          department.color,
                      }}
                    >
                      +
                    </div>

                    <h3 className="mt-7 text-3xl font-black uppercase tracking-[-.04em]">
                      Your workspace is empty
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#102E62]/45">
                      Create your first section to
                      organise the{" "}
                      {department.name.toLowerCase()}{" "}
                      department&apos;s resources
                      and links.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setShowAddSection(true)
                      }
                      className="mt-7 rounded-full px-7 py-3 text-xs font-black uppercase tracking-[.12em] text-white"
                      style={{
                        backgroundColor:
                          department.color,
                      }}
                    >
                      + CREATE FIRST SECTION
                    </button>

                  </div>

                </div>
              )}

            {/* SECTIONS */}

            {filteredSections.length > 0 && (
              <div className="space-y-6">

                {filteredSections.map(
                  (section, index) => (
                    <article
                      key={section.id}
                      className="overflow-hidden rounded-[22px] bg-white shadow-[0_15px_45px_rgba(0,0,0,.07)]"
                    >

                      <div className="flex flex-col gap-5 border-b border-[#102E62]/10 p-7 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-5">

                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                            style={{
                              backgroundColor:
                                department.color,
                            }}
                          >
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>

                          <div>

                            <h3 className="text-2xl font-black uppercase tracking-[-.03em]">
                              {section.name}
                            </h3>

                            <p className="mt-1 text-sm text-[#102E62]/50">
                              {section.description ||
                                "Departmental section"}
                            </p>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            deleteSection(
                              section.id
                            )
                          }
                          className="self-start rounded-full border border-red-200 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-red-500"
                        >
                          DELETE SECTION
                        </button>

                      </div>

                      <div className="p-7">

                        <div className="mb-5 flex items-center justify-between">

                          <p
                            className="text-[10px] font-black tracking-[.25em]"
                            style={{
                              color:
                                department.color,
                            }}
                          >
                            RESOURCES
                          </p>

                          <div className="flex items-center gap-3">

                            <span className="text-[10px] font-bold tracking-[.15em] text-[#102E62]/35">
                              {section.resources.length} ITEMS
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                setError("")

                                setOpenResourceForm(
                                  openResourceForm ===
                                    section.id
                                    ? null
                                    : section.id
                                )
                              }}
                              className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[.12em] text-white"
                              style={{
                                backgroundColor:
                                  department.color,
                              }}
                            >
                              + ADD RESOURCE
                            </button>

                          </div>

                        </div>

                        {/* ADD RESOURCE */}

                        {openResourceForm ===
                          section.id && (
                          <div className="mb-6 rounded-xl bg-[#F5F3EE] p-5">

                            <div className="grid gap-3 lg:grid-cols-[1fr_1.5fr_auto]">

                              <input
                                type="text"
                                value={
                                  resourceNames[
                                    section.id
                                  ] || ""
                                }
                                onChange={(event) =>
                                  setResourceNames(
                                    (current) => ({
                                      ...current,
                                      [section.id]:
                                        event.target
                                          .value,
                                    })
                                  )
                                }
                                placeholder="Resource name"
                                className="h-11 rounded-lg border border-[#102E62]/10 bg-white px-4 text-sm outline-none focus:border-[#102E62]"
                              />

                              <input
                                type="url"
                                value={
                                  resourceUrls[
                                    section.id
                                  ] || ""
                                }
                                onChange={(event) =>
                                  setResourceUrls(
                                    (current) => ({
                                      ...current,
                                      [section.id]:
                                        event.target
                                          .value,
                                    })
                                  )
                                }
                                onKeyDown={(event) => {
                                  if (
                                    event.key ===
                                    "Enter"
                                  ) {
                                    event.preventDefault()

                                    addResource(
                                      section.id
                                    )
                                  }
                                }}
                                placeholder="Paste any website or link"
                                className="h-11 rounded-lg border border-[#102E62]/10 bg-white px-4 text-sm outline-none focus:border-[#102E62]"
                              />

                              <button
                                type="button"
                                disabled={
                                  savingResource ===
                                  section.id
                                }
                                onClick={() =>
                                  addResource(
                                    section.id
                                  )
                                }
                                className="rounded-lg px-5 text-xs font-black uppercase text-white disabled:opacity-50"
                                style={{
                                  backgroundColor:
                                    department.color,
                                }}
                              >
                                {savingResource ===
                                section.id
                                  ? "SAVING..."
                                  : "SAVE"}
                              </button>

                            </div>

                            <p className="mt-3 text-xs text-[#102E62]/35">
                              Any HTTP or HTTPS website
                              link is accepted.
                            </p>

                          </div>
                        )}

                        {/* RESOURCE LIST */}

                        {section.resources.length ===
                        0 ? (
                          <div className="rounded-xl bg-[#F5F3EE] px-5 py-8 text-center">

                            <p className="text-sm font-bold text-[#102E62]/35">
                              No resources added.
                            </p>

                          </div>
                        ) : (
                          <div className="grid gap-3 md:grid-cols-2">

                            {section.resources.map(
                              (resource) => (
                                <div
                                  key={
                                    resource.id
                                  }
                                  className="group flex items-center justify-between rounded-xl border border-[#102E62]/10 bg-white p-5 transition hover:border-[#102E62]/20"
                                >

                                  <a
                                    href={
                                      resource.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-0 flex-1"
                                  >

                                    <p className="truncate text-sm font-black uppercase">
                                      {
                                        resource.name
                                      }
                                    </p>

                                    <p className="mt-1 truncate text-xs text-[#102E62]/35">
                                      {
                                        resource.url
                                      }
                                    </p>

                                  </a>

                                  <div className="ml-4 flex shrink-0 items-center gap-3">

                                    <a
                                      href={
                                        resource.url
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xl transition group-hover:translate-x-1"
                                      aria-label={`Open ${resource.name}`}
                                    >
                                      ↗
                                    </a>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteResource(
                                          resource.id,
                                          section.id
                                        )
                                      }
                                      className="text-xs font-bold text-red-400 hover:text-red-600"
                                    >
                                      DELETE
                                    </button>

                                  </div>

                                </div>
                              )
                            )}

                          </div>
                        )}

                        {/* ACCESS */}

                        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-[#102E62]/10 pt-5">

                          <span className="text-[10px] font-black tracking-[.2em] text-[#102E62]/35">
                            ACCESS:
                          </span>

                          <span className="text-xs font-bold text-[#102E62]/40">
                            Department members
                          </span>

                        </div>

                      </div>

                    </article>
                  )
                )}

              </div>
            )}

          </>
        )}

      </section>

      {/* FOOTER */}

      <footer className="bg-[#102E62] px-6 py-10 text-white">

        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div>

              <p className="font-serif text-2xl">
                THE BHAWANIPUR
              </p>

              <p className="mt-1 text-[10px] tracking-[.25em] text-white/50">
                EDUCATION SOCIETY COLLEGE
              </p>

            </div>

            <p className="text-xs text-white/40">
              UMANG 2026 · {department.name}
            </p>

          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © 2026 All Rights Reserved. The Bhawanipur
            Education Society College.
          </div>

        </div>

      </footer>

    </main>
  )
}
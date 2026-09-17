import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ department: string }>
  }
) {
  try {
    const { department } = await params

    // Find the department without using .single()
    const { data: departments, error: departmentError } =
      await supabase
        .from("departments")
        .select("id, name, slug, created_at")
        .eq("slug", department)
        .limit(1)

    if (departmentError) {
      console.error(
        "DEPARTMENT QUERY ERROR:",
        departmentError
      )

      return NextResponse.json(
        {
          error: departmentError.message,
          details: departmentError.details,
          code: departmentError.code,
        },
        { status: 500 }
      )
    }

    if (!departments || departments.length === 0) {
      return NextResponse.json(
        {
          error: `Department "${department}" was not found.`,
        },
        { status: 404 }
      )
    }

    const dept = departments[0]

    // Get sections
    const { data: sections, error: sectionsError } =
      await supabase
        .from("sections")
        .select(
          "id, department_id, name, description, created_at"
        )
        .eq("department_id", dept.id)
        .order("created_at", {
          ascending: true,
        })

    if (sectionsError) {
      console.error(
        "SECTIONS QUERY ERROR:",
        sectionsError
      )

      return NextResponse.json(
        {
          error: sectionsError.message,
          details: sectionsError.details,
          code: sectionsError.code,
        },
        { status: 500 }
      )
    }

    const sectionList = sections ?? []

    // Get resources
    let resources: any[] = []

    if (sectionList.length > 0) {
      const sectionIds = sectionList.map(
        (section) => section.id
      )

      const {
        data: resourceData,
        error: resourcesError,
      } = await supabase
        .from("resources")
        .select(
          "id, section_id, name, url, created_at"
        )
        .in("section_id", sectionIds)
        .order("created_at", {
          ascending: true,
        })

      if (resourcesError) {
        console.error(
          "RESOURCES QUERY ERROR:",
          resourcesError
        )

        return NextResponse.json(
          {
            error: resourcesError.message,
            details: resourcesError.details,
            code: resourcesError.code,
          },
          { status: 500 }
        )
      }

      resources = resourceData ?? []
    }

    const formattedSections = sectionList.map(
      (section) => ({
        id: section.id,
        name: section.name,
        description: section.description,
        resources: resources
          .filter(
            (resource) =>
              resource.section_id === section.id
          )
          .map((resource) => ({
            id: resource.id,
            name: resource.name,
            url: resource.url,
          })),
      })
    )

    return NextResponse.json({
      id: dept.id,
      name: dept.name,
      slug: dept.slug,
      sections: formattedSections,
    })
  } catch (error) {
    console.error(
      "DEPARTMENT API ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load department.",
      },
      { status: 500 }
    )
  }
}
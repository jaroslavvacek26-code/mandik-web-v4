import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "cs";

  try {
    const response = await fetch(
      `https://mandik.info/api/v1/ltu/portfolio/?locale=${locale}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PORTFOLIO_TOKEN}`,
          "Content-Type": "application/json",
        },
        // Revalidate každých 10 minut
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "API request failed", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

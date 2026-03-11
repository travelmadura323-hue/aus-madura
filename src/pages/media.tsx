import React from "react"

const youtubeVideos = [
  "ffZYphMCC14",
  "75v5qpFK204",
  "LGNmQ1iYGIw",
  "02gXuRoKT7Q",
]

export default function MediaPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">

      {/* ---------------- HEADER ---------------- */}
      <div className="bg-[#191975] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Press & News
          </span>

          <h1 className="mt-4 text-4xl text-white md:text-5xl font-bold">
            Media
          </h1>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Stay updated with our latest news, press releases,
            and industry recognition.
          </p>
        </div>
      </div>

      {/* ---------------- LIVE VIDEO ---------------- */}
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Live on YouTube
        </h2>

        <div className="aspect-video w-full overflow-hidden rounded-2xl mt-25">
          <iframe
            src="https://www.youtube.com/embed/8_cnSln4qsE"
            title="YouTube Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
          <h3>
The Viral Video Interview of Our Chairman Crossing 3 Million Views and more</h3>
        </div>
      </div>

      {/* ---------------- VIDEO GRID ---------------- */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Video Gallery
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {youtubeVideos.map((id) => (
            <div
              key={id}
              className="overflow-hidden rounded-2xl border border-gray-200 hover:shadow-lg transition"
            >
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
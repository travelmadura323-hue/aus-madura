import React from "react"

const youtubeVideos = [
  {
    id: "8_cnSln4qsE",
    title: "The Viral Video Interview of Our Chairman Part 2"
  },

  {
    id: "ffZYphMCC14",
    title: "Chairman interview for News7 Channel"
  },
  {
    id: "75v5qpFK204", 
    title: "Chairman Interview for Behindwoods Channel"
  },
  {
    id: "LGNmQ1iYGIw",
    title: "Interview of our Chairman for IBC Tamil Channel"
  },
  {
    id: "02gXuRoKT7Q",
    title: "Interview of our Managing Director, Mr. Sriharan Balan for Business Thamizha Channel"
  }
]

export default function MediaPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">

      {/* ---------------- HEADER ---------------- */}
      <div className="bg-[#191975] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

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
      <section>
  <div className="mx-auto max-w-5xl px-6 py-20">
    
    <h2 className="text-3xl font-bold mb-8 text-center">
      Live on YouTube
    </h2>

    <div className="aspect-video w-full overflow-hidden rounded-2xl mt-8">
      <iframe
        src="https://www.youtube.com/embed/8_cnSln4qsE"
        title="YouTube Live Stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>

    <div className="mt-6">
      <h3 className="text-center text-xl font-semibold text-black">
        The Viral Video Interview of Our Chairman Crossing 3 Million Views and more
      </h3>
    </div>

  </div>
</section>
      {/* ---------------- VIDEO GRID ---------------- */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Video Gallery
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-2xl border border-gray-200 hover:shadow-lg transition"
            >
              <div className="aspect-video w-full overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {video.title}
                </h3>
              
                  
            
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    

  )
}
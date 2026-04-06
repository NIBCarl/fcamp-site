import Image from "next/image";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Friendship Camping (FCAMP) Caraga Region",
            "description": "A Seventh-day Adventist youth ministry camp in the Northeastern Mindanao Mission (NEMM) focusing on evangelism, leadership, and spiritual growth.",
            "organizer": {
              "@type": "Organization",
              "name": "Northeastern Mindanao Mission (NEMM)",
              "location": {
                "@type": "Place",
                "name": "NEMM Headquarters",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Baan",
                  "addressRegion": "Butuan City",
                  "addressCountry": "PH"
                }
              }
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Youth Evangelism"
              },
              {
                "@type": "Thing",
                "name": "Seventh-day Adventist Camp"
              }
            ]
          })
        }}
      />
      {/* Full-bleed Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="FCAMP Youth Gathering"
            className="w-full h-full object-cover brightness-75 scale-105"
            data-alt="cinematic wide shot of youth campers gathering around with warm sunset lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2i_OkUDwahY2HOlAzxm7VGOotfdo4gnjeFF6cyvRc0zhaWQ_g7OwX1q4bMqhhCZMF9heWUzggQfWwAWBVxBmYgi8ll0tuRSuQpwzpGD2mzMGlSgWDSd8xB-o6XMIv5ZCNf29nnzATTsFExiffxNts6jZHgd5-3-ogfbd4UnSfv7U7cixs5yhkZR_ybOobGkcV92_FlMWq1ZVYMSsjrX3w3NIHuLnlykm-_OWQDZJOSCAL0keXWihFFvAi-5spd2ryqrTa9mq8ReU"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-headline text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            FCAMP NEMM
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Friendship Camping: A specialized youth ministry in Caraga spreading faith, building leaders, and fostering lifelong friendships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/register"
              className="bg-primary-container hover:bg-primary text-white font-bold py-4 px-10 rounded-lg text-lg transition-all editorial-shadow active:scale-95 duration-150 inline-block"
            >
              Join The Journey
            </a>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-10 rounded-lg text-lg hover:bg-white/20 transition-all">
              Watch Highlight
            </button>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-white text-3xl">
            keyboard_double_arrow_down
          </span>
        </div>
      </section>

      {/* About Section (3-Column Bento-ish Layout) */}
      <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold tracking-widest text-sm uppercase font-label block mb-4">
                OUR MINISTRY
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-black text-on-surface tracking-tighter leading-none">
                Faith, Friendship, <br />{" "}
                <span className="text-primary">and Evangelism</span>
              </h2>
            </div>
            <p className="font-body text-lg text-on-surface-variant max-w-sm mb-2">
              A year-round Seventh-day Adventist youth program connecting teens with genuine faith in a warm, engaging environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Spiritual Roots */}
            <div className="group p-8 rounded-xl bg-surface-container-lowest editorial-shadow border border-outline-variant/10 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  auto_awesome
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                4-Phase Program
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                A structured journey: Spirituality preparation year-round, intensive Leadership Specialization, the highly-anticipated Camp Proper in July, and continuous Sustainability follow-ups.
              </p>
              <div className="mt-8 flex items-center gap-2 text-primary font-bold cursor-pointer">
                <span className="text-sm">Learn More</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Column 2: Adventure & Growth */}
            <div className="group p-8 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">
                  landscape
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                Interactive Activities
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Engaging challenges designed to break the ice and build bonds, featuring Trust Falls, knot-tying, and deep group discussions on health, family, and spiritual doctrines.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-secondary-container/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Trust Falls
                </span>
                <span className="bg-secondary-container/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Group discussions
                </span>
              </div>
            </div>

            {/* Column 3: Global Community */}
            <div className="group p-8 rounded-xl bg-surface-container-lowest editorial-shadow border border-outline-variant/10 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-tertiary text-3xl">
                  groups
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                Massive Regional Impact
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                With a record turnout of 1,684 non-Adventist participants across Agusan del Norte, Dinagat Islands, and Surigao del Norte, FCAMP is expanding the community.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Signature Quote (Editorial Style) */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-xl">
              <img
                alt="FCAMP Youth Activity"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ7DJ3PdFPcAlCzcoWxzXSeOfaeOSyQHLOe2XymC7oHjYNdDtpi8bImMhwHAylYrdk3vQl2GWgiol4CSU-LAHMfUAKUTk5dLUjX3xif0zIK9c6eUCSEa_dLH9ROaAPU1j4a8b-9mnujaa4Bz6gTBv3EOlzGrDnZtOxgn7dGllO_V9vBLvKr2ZP9MYx7zAQpGkeBdlWANtf5cbd7BzJLuGZ0xNCZhiSFPwHQnpeyFCpTK2tRBNXhOERWJWryN1csBHalwsGhNyAfAJ4"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-primary-container p-8 md:p-12 rounded-xl text-white editorial-shadow max-w-[280px] md:max-w-sm">
              <span className="material-symbols-outlined text-4xl mb-4">
                format_quote
              </span>
              <p className="font-headline text-2xl font-bold leading-tight italic">
                &quot;Evangelism through relationship building, mentoring the leaders of tomorrow.&quot;
              </p>
            </div>
          </div>
          <div className="md:pl-16">
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-8 text-on-surface tracking-tight">
              A Safe Space for <br /> Spiritual Discovery.
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">
              Under the leadership of Pastor Anecito C. Pableo, FCAMP coordinates 12 core teams to deliver an unforgettable one-week camping experience. Designed for youth 13-18, the program promotes the teachings of Jesus in daily life through engaging mentorship.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-semibold">
                  Spiritual Renewal & Mentoring
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-semibold">
                  Year-Round Nurturing
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-semibold">Cultivating Lasting Friendships</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

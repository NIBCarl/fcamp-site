import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Full-bleed Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Coastal Sunset"
            className="w-full h-full object-cover brightness-75 scale-105"
            data-alt="cinematic wide shot of a rugged coastline at sunset with golden orange light reflecting off the ocean waves and misty cliffs"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2i_OkUDwahY2HOlAzxm7VGOotfdo4gnjeFF6cyvRc0zhaWQ_g7OwX1q4bMqhhCZMF9heWUzggQfWwAWBVxBmYgi8ll0tuRSuQpwzpGD2mzMGlSgWDSd8xB-o6XMIv5ZCNf29nnzATTsFExiffxNts6jZHgd5-3-ogfbd4UnSfv7U7cixs5yhkZR_ybOobGkcV92_FlMWq1ZVYMSsjrX3w3NIHuLnlykm-_OWQDZJOSCAL0keXWihFFvAi-5spd2ryqrTa9mq8ReU"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-headline text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            FCAMP
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Adventurous spirit, coastal serenity, and a journey of faith under
            the horizon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/register"
              className="bg-primary-container hover:bg-primary text-white font-bold py-4 px-10 rounded-lg text-lg transition-all editorial-shadow active:scale-95 duration-150 inline-block"
            >
              Register Now
            </a>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-10 rounded-lg text-lg hover:bg-white/20 transition-all">
              Watch Journey
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
              <h2 className="font-headline text-5xl md:text-6xl font-black text-on-surface tracking-tighter leading-none">
                The Windswept <br />{" "}
                <span className="text-primary">Horizon Experience</span>
              </h2>
            </div>
            <p className="font-body text-lg text-on-surface-variant max-w-sm mb-2">
              Discover a ministry designed for the modern youth—bold in
              adventure and deep in spiritual roots.
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
                Spiritual Roots
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Connecting youth with their Creator through intentional worship,
                coastal meditations, and deep-dive scripture sessions by the
                campfire.
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
                Adventure & Growth
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Pushing physical boundaries with coastal hiking, kayaking, and
                team challenges that build resilience and lifelong brotherhood.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-secondary-container/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Hiking
                </span>
                <span className="bg-secondary-container/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Canoeing
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
                Global Community
              </h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Join a vibrant network of Adventist youth from across the region.
                Build lasting friendships founded on shared values and purpose.
              </p>
              <div className="mt-8 flex items-center -space-x-3 overflow-hidden">
                <img
                  alt="Avatar 1"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYildOqIwx3I4kguyCydcMZ0CfKtUrvqLO7ap86j3zKyCXloYdWQrTDG2jRwR-AeU2fs2n8ZNTAI269dFgeHJhdXtlLB339yDnIkJQ28hyHTzzsZi1CK5rTL1YTM1HVr0gxCOBicCd2LhCCa_9F0MqI_7TMFZcjt4Zh70VjOUBtU8ioEnn8_SzN8lnpMs3611tKMjCDjL8Nox6bKKi3YQm8C6AJq1b73xJtAKq86gtbuu8nksNafKljFQ26_lrjVxVq_D5ZrrzqVep"
                />
                <img
                  alt="Avatar 2"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATYRyGsDY7rXmnuNVa7G3aIj_vt-EpewIwpB_7T44t6EA7iuVHjl3zBRFr3gtBp0gYzfzv747fpXy7dRhZoLGdjzEMIFOUtwhqWG5Y88HQ6ZhwBmYFhXUKYUjZTMwHe0oGuhcHGtOw4CvvM08atkb0E3SVuwsyGb55LhvxjqYE90HoDuBxhB2AdsvRh1-rFVo1mGXoejZ7R9vFY4HIUDMXQb_LD6-G_XU9md8m2UdFqk1VEiztLFgohIVp4QWMiLhgzudGMEecH4WT"
                />
                <img
                  alt="Avatar 3"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3pR_rdWMJY0HeG8oCHyLcpK5ulXesWCoXk5rS-2kxeEH66SidFrqAwnrctNKKdRkVW073Th5Z7D0T07TEwTSwfjtH8zcW0Qyu-i4TgSs1B4Yy2eg4OLS25rFxZp0PR6zFJ_bKcImhFvWpdsHU9Q1QEIPM6O-J2CqMsoXa9IyeoW2pgC7pnIkIowJvq9AlxwRF6O_Qi09I2VxhFvSQLUHY8ZXI5XAgtJJJ6s832Wd3Zsg-Ioy_RZEBpA_jrth2E2ZbeEL5AZzxwiLr"
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-xs font-bold text-on-surface ring-2 ring-white">
                  +2k
                </div>
              </div>
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
                alt="Adventure Journey"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ7DJ3PdFPcAlCzcoWxzXSeOfaeOSyQHLOe2XymC7oHjYNdDtpi8bImMhwHAylYrdk3vQl2GWgiol4CSU-LAHMfUAKUTk5dLUjX3xif0zIK9c6eUCSEa_dLH9ROaAPU1j4a8b-9mnujaa4Bz6gTBv3EOlzGrDnZtOxgn7dGllO_V9vBLvKr2ZP9MYx7zAQpGkeBdlWANtf5cbd7BzJLuGZ0xNCZhiSFPwHQnpeyFCpTK2tRBNXhOERWJWryN1csBHalwsGhNyAfAJ4"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-primary-container p-8 md:p-12 rounded-xl text-white editorial-shadow max-w-[280px] md:max-w-sm">
              <span className="material-symbols-outlined text-4xl mb-4">
                format_quote
              </span>
              <p className="font-headline text-2xl font-bold leading-tight italic">
                &quot;The mountains are calling, and we must go with a heart for
                service.&quot;
              </p>
            </div>
          </div>
          <div className="md:pl-16">
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-8 text-on-surface tracking-tight">
              Our Mission is <br /> Your Transformation.
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">
              FCAMP isn&apos;t just a destination; it&apos;s a crucible for character
              development. We believe that in the silence of the coast and the
              challenge of the climb, the voice of the Spirit becomes clear.
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
                  Professional Leadership Training
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
                  Wilderness Safety Certification
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-semibold">Biblical Theology Workshops</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

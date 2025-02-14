import { SectionDataProps } from "@/app/lib/types"
import Image from "next/image";

const MidSection: React.FC<SectionDataProps> = ({data}) => {
  const content = data.content
  return (
    <section className="">
      <div className="px-8 py-8  mx-auto md:px-12 lg:px-32 max-w-screen-xl flex flex-col justify-center">
        <div className="flex flex-col">
          <div className="mt-6 pt-12 flex flex-col lg:gap-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-24 items-center">
              <div>
                <span className="text-gray-600 uppercase text-xs font-medium">
                  {content[0].label}{" "}
                </span>
                <p className="text-4xl mt-4 tracking-tighter font-semibold text-gray-700 text-balance">
                  {content[0].title}
                </p>
                <p className="text-sm mt-4 text-gray-700 text-balance">{content[0].text}
                </p>
                <div className="mt-6 text-xs font-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 text-gray-950">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                    <svg
                      className="icon icon-tabler text-gray-700 size-4 icon-tabler-360"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4" />
                      <path d="M9 13l3 3l-3 3" />
                    </svg>
                    <span className="text-gray-950 font-medium text-sm">
                      Faculty lectures
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                    <svg
                      className="icon icon-tabler text-gray-700 size-4 icon-tabler-antenna-bars-3"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 18l0 -3" />
                      <path d="M10 18l0 -6" />
                      <path d="M14 18l0 .01" />
                      <path d="M18 18l0 .01" />
                    </svg>
                    <span className="text-gray-950 font-medium text-sm">
                      Networking nights
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                    <svg
                      className="icon icon-tabler text-gray-700 size-4 icon-tabler-load-balancer"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M12 20m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 16v3" />
                      <path d="M12 10v-7" />
                      <path d="M9 6l3 -3l3 3" />
                      <path d="M14.894 12.227l6.11 -2.224" />
                      <path d="M17.159 8.21l3.845 1.793l-1.793 3.845" />
                      <path d="M9.101 12.214l-6.075 -2.211" />
                      <path d="M6.871 8.21l-3.845 1.793l1.793 3.845" />
                    </svg>
                    <span className="text-gray-950 font-medium text-sm">
                      Social gatherings
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                    <svg
                      className="icon icon-tabler text-gray-700 size-4 icon-tabler-brand-speedtest"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5.636 19.364a9 9 0 1 1 12.728 0" />
                      <path d="M16 9l-4 4" />
                    </svg>
                    <span className="text-gray-950 font-medium text-sm">
                      Research talks
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-full md:order-first relative">
                <Image
                  src={content[0]?.media ?? "/img/placeholder.svg"}
                  alt="#_"
                  width={464}
                  height={464}
                  className="bg-gray-200 shadow-box shadow-gray-500 overflow-hidden aspect-square w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-black/40 to-transparent"></div>
              </div>
            </div>
            {
              content[1] && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-24 items-center md:flex-row-reverse">
                  <div>
                    <span className="text-gray-600 uppercase text-xs font-medium">
                    {content[1].label}
                    </span>
                    <p className="text-4xl mt-8 tracking-tighter font-semibold text-gray-700 text-balance">
                      {content[1].title}
                    </p>
                    <p className="text-sm mt-4 text-gray-700 text-balance">
                      {content[1].text}
                    </p>
                    <div className="mt-6 text-xs font-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 text-gray-950">
                      <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-database text-gray-700 size-4"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" />
                          <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                          <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                        </svg>
                        <span className="text-gray-950 font-medium text-sm">
                          Transparent Data Access
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-building text-gray-700 size-4"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 21l18 0" />
                          <path d="M9 8l1 0" />
                          <path d="M9 12l1 0" />
                          <path d="M9 16l1 0" />
                          <path d="M14 8l1 0" />
                          <path d="M14 12l1 0" />
                          <path d="M14 16l1 0" />
                          <path d="M4 21l0 -14l8 -4l8 4l0 14" />
                        </svg>
                        <span className="text-gray-950 font-medium text-sm">
                          Organization-Wide Application
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-hexagon-number-3 text-gray-700 size-4"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M19.875 6.516a2 2 0 0 1 1.062 1.516l.063 .468v6.516a2 2 0 0 1 -1.062 1.516l-6.928 4.004a2 2 0 0 1 -1.941 0l-6.928 -4.004a2 2 0 0 1 -1.062 -1.516l-.063 -.468v-6.516a2 2 0 0 1 1.062 -1.516l6.928 -4.004a2 2 0 0 1 1.941 0l6.928 4.004z" />
                          <path d="M10 9a2 2 0 1 1 2 3a2 2 0 1 1 -2 3" />
                        </svg>
                        <span className="text-gray-950 font-medium text-sm">
                          Scalable Execution Models
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-smart-home text-gray-700 size-4"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M19 8.71l-7 -5.03l-7 5.03" />
                          <path d="M19 8.7v5.8" />
                          <path d="M5 8.7v5.8" />
                          <path d="M10 21v-6h4v6" />
                          <path d="M10 13h4v-2h-4z" />
                        </svg>
                        <span className="text-gray-950 font-medium text-sm">
                          Seamless Automation Features
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <Image
                      src={content[1]?.media ??  "/img/placeholder.svg"}
                      alt="#_"
                      width={464}
                      height={464}
                      className="bg-gray-200 shadow-box shadow-gray-500/30 overflow-hidden aspect-square w-full h-full object-cover object-right"
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidSection;

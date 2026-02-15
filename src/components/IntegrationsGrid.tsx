import React from "react";
import { Button } from "@/components/ui/button";

import javaLogo from "@/assets/logos/java.png";
import tsLogo from "@/assets/logos/typescript.png";
import jsLogo from "@/assets/logos/javascript.png";
import mavenLogo from "@/assets/logos/maven.png";
import npmLogo from "@/assets/logos/npm.png";
import yarnLogo from "@/assets/logos/yarn.png";
import githubLogo from "@/assets/logos/github.png";
import vscodeLogo from "@/assets/logos/vscode.png";

const ICONS_ROW1 = [
    javaLogo,
    jsLogo,
    tsLogo,
];

const ICONS_ROW2 = [
    vscodeLogo,
    githubLogo,
    yarnLogo,
    mavenLogo,
    npmLogo,
];

const repeatedIcons = (icons: (string | any)[], repeat = 4) =>
    Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
    return (
        <section className="relative overflow-hidden">
            {/* Light grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 text-center">
                {/* Carousel */}
                <div className="mt-4 overflow-hidden relative pb-2">
                    {/* Row 1 */}
                    <div className="flex gap-10 whitespace-nowrap animate-scroll-left">
                        {repeatedIcons(ICONS_ROW1).map((src, i) => (
                            <div key={`row1-${i}`} className="h-16 w-16 flex-shrink-0 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
                                <img src={src} alt="icon" className="h-10 w-10 object-contain" />
                            </div>
                        ))}
                    </div>

                    {/* Row 2 */}
                    <div className="flex gap-10 whitespace-nowrap mt-6 animate-scroll-right">
                        {repeatedIcons(ICONS_ROW2).map((src, i) => (
                            <div key={`row2-${i}`} className="h-16 w-16 flex-shrink-0 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
                                <img src={src} alt="icon" className="h-10 w-10 object-contain" />
                            </div>
                        ))}
                    </div>

                    {/* Fade overlays */}
                    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}} />
        </section>
    );
}

"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function AboutContent() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-zinc-800 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 animate-glow blur-md opacity-40" />
              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 animate-gradient-x" />
              <Image
                src="/avatar.png"
                alt="Vitor Britto"
                fill
                className="relative rounded-lg object-cover"
              />
            </div>
            <a
              href="https://www.buymeacoffee.com/vitorbritto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width={195}
                height={50}
                className="h-[50px] w-[195px]"
              />
            </a>
          </div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 mb-4">
              {t("common.seniorSoftwareEngineer")}
            </div>
            <h2 className="text-3xl font-bold mb-6">
              {t("common.hello")}{" "}
              <span className="inline-block animate-wave origin-[70%_70%]">
                👋
              </span>
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>{t("common.description1")}</p>
              <p>{t("common.description2")}</p>
              <p>{t("common.description3")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

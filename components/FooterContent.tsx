"use client";

import { Mail, Sparkles, Rocket } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function FooterContent() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {t("common.newsletter")}
              </h3>
              <p className="text-zinc-400 mb-4 max-w-md">
                {t("common.newsletterDescription")}
              </p>
              <div className="flex items-center gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{t("common.exclusiveTips")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>{t("common.newArticles")}</span>
                </div>
              </div>
            </div>

            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("common.emailPlaceholder")}
                className="flex-1 bg-zinc-800 rounded-lg px-4 py-3 text-sm border border-zinc-700 focus:border-emerald-400 focus:outline-none"
              />
              <button className="px-6 py-3 bg-emerald-400 text-zinc-900 rounded-lg hover:bg-emerald-300 transition-colors text-sm font-medium">
                {t("common.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-400">{t("common.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

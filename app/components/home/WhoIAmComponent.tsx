import React from "react";
import {useTranslations} from "next-intl";

export const WhoIAmComponent: React.FC = () => {

    const t = useTranslations("common");

    return (
        <section className="relative mx-auto max-w-7xl px-6 py-16 text-center">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
                {t("test")}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Software developer with strong passion in woodworking
            </p>
        </section>
    )
}
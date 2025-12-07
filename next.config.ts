import nextPwa from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
    /*i18n: {
        locales: ['en', 'it'],
        defaultLocale: 'it',
    },*/
};

export default nextPwa({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: !isProd
})(nextConfig);

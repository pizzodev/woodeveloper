import nextPwa from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    }
};

export default nextPwa({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: !isProd
})(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages:["mongoose"]
    },
    images:{
        domains:["localhost:3000"]
    }
}

module.exports = nextConfig

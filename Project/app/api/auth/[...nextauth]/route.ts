import NextAuth from "next-auth"
import GitHub from 'next-auth/providers/github';

const handler = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ]
})

export { handler as GET, handler as POST }
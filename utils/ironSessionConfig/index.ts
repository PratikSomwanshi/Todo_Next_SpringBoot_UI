import { SessionData } from "@/lib/interfaces";
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "uNN{&>(p._,WRmG3O1D!0$80#N!5OI&R",
    cookieName: "yo_auction_secrets",
    cookieOptions: {
        httpOnly: true,
        secure: false,
    },
};

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};

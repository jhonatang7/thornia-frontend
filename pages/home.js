import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    let authenticated = false;
    const router = useRouter();

    useEffect(() => {
        if (!authenticated) {
            router.push("/signup")
        }
    }, [])


    return <h1>Home!</h1>
}

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const TestCookies = () => {
    const [cookieData, setCookieData] = useState({});

    useEffect(() => {
        Cookies.set("testCookie", "HelloWorld", { expires: 1 });

        const readCookies = () => {
            const accessToken = Cookies.get("accessToken_travelProvider");
            const refreshToken = Cookies.get("refreshToken_travelProvider");
            const testCookie = Cookies.get("testCookie");

            console.log("✅ testCookie:", testCookie);
            console.log("✅ accessToken:", accessToken);
            console.log("✅ refreshToken:", refreshToken);

            setCookieData({ testCookie, accessToken, refreshToken });
        };

        readCookies();

        // Re-check after a small delay
        const timer = setTimeout(readCookies, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4">
            {/* <h3>Cookie Debug Info</h3> */}
            {/* <pre>{JSON.stringify(cookieData, null, 2)}</pre> */}
        </div>
    );
};

export default TestCookies;

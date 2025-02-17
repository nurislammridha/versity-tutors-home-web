"use client"; // This makes it a client component

import { useEffect } from "react";

export default function BootstrapClient() {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return null; // This component does not render anything
}

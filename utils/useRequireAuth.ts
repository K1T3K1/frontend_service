import { useEffect } from "react";

export function useRequireAuth(redirectTo = "/") {
  useEffect(() => {
    // Check if we're running on the client (window is defined)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // Redirect using window.location
        window.location.href = redirectTo;
      }
    }
  }, [redirectTo]);
}

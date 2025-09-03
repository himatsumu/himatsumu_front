
import { useState, useEffect } from "react";

export function useDressup() {
    const [dressupClothed, setDressupClothed] = useState<string | null>(null);
    const [dressupHat, setDressupHat] = useState<string | null>(null);
    const [dressupBelongings, setDressupBelongings] = useState<string | null>(null);

    useEffect(() => {
        setDressupClothed(localStorage.getItem("dressupClothes"));
        setDressupHat(localStorage.getItem("dressupHat"));
        setDressupBelongings(localStorage.getItem("dressupBelongings"));
    }, []);

    return { dressupClothed, dressupHat, dressupBelongings };
}

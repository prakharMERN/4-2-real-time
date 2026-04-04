import { useEffect, useState } from "react"

export const useLocalStorage = (key, initalVal) => {
    const [value, setValue] = useState(() => {
        const val = localStorage.getItem(key)
        if (val) {
            return JSON.parse(val)
        }
        return initalVal
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])


    return [value, setValue]
}
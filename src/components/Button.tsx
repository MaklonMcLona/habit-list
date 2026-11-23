import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = 
{
    variant?: "primary" | "secondary" | "destructive"
} & ComponentProps<"button">

export default function Button({variant = "primary", className, ...props}: ButtonProps)
{
    return (
        <button 
        {...props} 
        className={twMerge(
        "btn hover:cursor-pointer transition-colors duration-200 rounded px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed",
        getVariantStyles(variant), 
        className)}>
        {props.children}
        </button>
    )
}

type Variant = "primary" | "secondary" | "destructive"

function getVariantStyles(variant: Variant)
{
    switch (variant)
    {
        case "primary":
            return "bg-violet-600 hover:bg-violet-500 hover:cursor-pointer transition-colors duration-200 rounded px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
        case "secondary":
            return "text-zinc-400 bg-zinc-700 hover:bg-zinc-600 hover:cursor-pointer transition-colors duration-200 rounded px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
        case "destructive":
            return "hover:bg-red-800 text-red-800 hover:text-red-200 hover:cursor-pointer transition-colors duration-200 rounded px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
        default: 
            throw new Error(`Invalid variant: ${variant satisfies never}`)
    }
}
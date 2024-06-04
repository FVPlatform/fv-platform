"use client";

import { Category } from "@prisma/client";
import {
    FcHome,
    FcBusinessman,
    FcPackage,
    FcShop,
    FcCloseUpMode,
    FcSportsMode,
    FcGraduationCap,
    FcGlobe,
    FcLandscape,
    FcAutomotive,
    FcFactory,
    FcCurrencyExchange,
    FcConferenceCall,
    FcSelfie,
    FcRating,
    FcNightLandscape,
    FcEnteringHeavenAlive,
    FcDocument,
} from "react-icons/fc";

import {IconType} from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Vuelos": FcEnteringHeavenAlive,
    "Parques": FcSportsMode,
    "Hotelería": FcHome,
    "Charter": FcBusinessman,
    "Empaquetado": FcPackage,
    "Producto nacional": FcShop,
    "Bodas": FcCloseUpMode,
    "Educación": FcGraduationCap,
    "Tours": FcNightLandscape,
    "Cuba": FcLandscape,
    "XV años": FcSelfie,
    "Seguros": FcFactory,
    "Cruceros": FcCurrencyExchange,
    "Eventos": FcConferenceCall,
    "Disney": FcRating,
    "Tours internacionales": FcGlobe,
    "Autos": FcAutomotive,
    "Manuales": FcDocument
}

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}
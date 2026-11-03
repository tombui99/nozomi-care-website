import type { TFunction } from "i18next";
import { getPhoto, type PhotoId } from "./photos";

const packages = [
  { key: "daycare", id: "daycare", photo: "guided-group-exercise", color: "bg-brand-yellow-dark" },
  { key: "experience", id: "care-exercise-trial", photo: "supported-strength", color: "bg-primary" },
  { key: "shortStay", id: "short-stay", photo: "bedside-conversation", color: "bg-brand-green" },
  { key: "longStay", id: "long-term-care", photo: "residential-room", color: "bg-brand-dark" },
] as const satisfies readonly { key: string; id: string; photo: PhotoId; color: string }[];

export function getCarePackages(t: TFunction, language = "vi") {
  return packages.map((item) => ({
    ...item,
    title: t(`carePackages.items.${item.key}.title`),
    tagline: t(`carePackages.items.${item.key}.tagline`),
    description: t(`carePackages.items.${item.key}.description`),
    audience: t(`carePackages.items.${item.key}.audience`, { returnObjects: true }) as string[],
    movement: item.key === "daycare" || item.key === "experience"
      ? t("carePackages.movement", { returnObjects: true }) as string[]
      : [],
    image: getPhoto(item.photo, language),
  }));
}

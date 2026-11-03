import type { TFunction } from "i18next";
import catalog from "./assets/photos.json";

export type PhotoId = keyof typeof catalog;
const assets = import.meta.glob<string>("./assets/images/optimized/*.webp", { eager: true, query: "?url", import: "default" });

export function getPhoto(id: PhotoId, language = "vi") {
  const photo = catalog[id];
  return {
    url: assets[`./assets/images/optimized/${id}.webp`],
    thumbnail: assets[`./assets/images/optimized/${id}-thumb.webp`],
    alt: photo.alt[language.startsWith("en") ? "en" : "vi"],
    width: photo.width,
    height: photo.height,
  };
}

export const servicePhotos = {
  daycare: "guided-group-exercise",
  shortStay: "bedside-conversation",
  longStay: "residential-room",
  power: "supported-strength",
} as const satisfies Record<string, PhotoId>;

const albums: { id: string; category: string; cover: PhotoId; photos: PhotoId[] }[] = [
  { id: "spaces", category: "facilities", cover: "welcoming-space", photos: ["welcoming-space", "accessible-bathroom", "residential-room", "shared-dining", "strength-equipment", "walking-equipment", "sunlit-exercise-space", "community-room"] },
  { id: "mobility", category: "services", cover: "supported-strength", photos: ["supported-strength", "outdoor-walking", "guided-equipment", "supported-treadmill", "assisted-outdoor-mobility", "walking-with-support"] },
  { id: "personalCare", category: "services", cover: "bedside-conversation", photos: ["individual-care", "personal-activity-support", "bedside-conversation", "bedside-companionship", "residential-support", "walking-frame-practice"] },
  { id: "movement", category: "daily", cover: "ball-exercises", photos: ["movement-game", "group-stretching", "ball-exercises", "joyful-movement", "guided-group-exercise", "seated-movement", "daily-circle", "circle-activity"] },
  { id: "everyday", category: "daily", cover: "conversation-and-laughter", photos: ["shared-screen-time", "morning-conversation", "singing-together", "colouring-activity", "ball-and-conversation", "tabletop-games", "creative-companionship", "everyday-smiles", "community-activity", "attentive-companionship", "shared-table", "relaxation-time", "small-group-support", "focused-activity", "conversation-and-laughter"] },
  { id: "gatherings", category: "events", cover: "community-gathering", photos: ["community-gathering", "friends-together", "staff-and-residents", "team-gathering", "care-team-introduction"] },
  { id: "team", category: "events", cover: "keyda-team", photos: ["team-practice", "staff-learning", "keyda-team"] },
];

export function getLocalAlbums(t: TFunction, language: string) {
  return albums.map((album) => ({
    id: `local-${album.id}`,
    category: album.category,
    title: t(`gallery.albums.${album.id}.title`),
    description: t(`gallery.albums.${album.id}.description`),
    images: [album.cover, ...album.photos.filter((id) => id !== album.cover)].map((id) => getPhoto(id, language)),
  }));
}

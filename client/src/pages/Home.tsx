/**
 * Crown Noir Editorial — a premium vertical-series pitch deck.
 *
 * HOW TO USE THIS TEMPLATE
 *  1. Edit the DECK + MEDIA config blocks below for the new project.
 *  2. Rewrite the content arrays (characters, pillars, seasonArcs, episodeScripts)
 *     and the section copy in the JSX with the real material.
 *  3. Leave any MEDIA.* value as "" to render a built-in PLACEHOLDER — swap in the
 *     real hero image/video, character images/videos, logo, and audio when ready.
 *  4. Character images: give a character an `image` or `video` URL to replace its
 *     9:16 placeholder; leave both unset to keep the placeholder.
 */
import { useInView, useReducedMotion, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Menu, Pause, Play, Quote, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnamEvent, createClient } from "@anam-ai/js-sdk";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// ============================================================================
//  DECK CONFIG — edit for each new project
// ============================================================================
const DECK = {
  brand: "BOOK OF ENOCH",
  eyebrow: "A Prestige Sci-Fi Event Series",
  title: "Book of Enoch",
  titleEm: "The Watchers",
  subtitle: "Ancient Scripture. First Contact. One Warning.",
  tagline: "We called them angels. They called us an experiment.",
  credit: "Executive Produced by Tariq Bey",
  passcode: "2077",
  producer: "Billy Carson Presents",
  presents: "A Jetson Life AI Studios Production",
  copyright: "\u00a9 2026 Jetson Life Studios. All rights reserved.",
};

// Media — leave "" to show a placeholder. Swap in Vercel Blob URLs when ready.
const MEDIA = {
  logo: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/logos/jetson-life-logo.png",
  heroImage: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_182804_51734d47-9bb5-4aab-9ff7-fa2a087f8111_min.webp",
  heroVideo: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/hero.mp4",
  coverVideo: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_171555_3db819e6-2180-4b64-815d-295910926791.mp4",
  themeSong: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/audio/times-up.mp3",
  cdVideo: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/cd-spin.mp4",   // spinning disc animation shown while the theme song plays
};

const INSTRUMENTAL_URL = "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/audio/times-up-instrumental.mp3";

const LOGO_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 6 58 32 32 58 6 32Z' fill='none' stroke='%23c5a059' stroke-width='2'/%3E%3Cpath d='M32 18 46 32 32 46 18 32Z' fill='none' stroke='%23c5a059' stroke-width='1' opacity='.5'/%3E%3C/svg%3E";
const logoSrc = MEDIA.logo || LOGO_PLACEHOLDER;

type Character = {
  name: string;
  role: string;
  archetype: string;
  actor: string;
  imdb: string;
  socials: Array<{ label: string; url: string }>;
  description: string;
  journey: string;
  audio?: string;
  image?: string;
  video?: string;
};

const characters: Character[] = [
  {
    name: "Dr. Amara Vale",
    role: "Archaeolinguist · Series Lead",
    archetype: "The Skeptic Who Finds Proof",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Doctor Amara Vale built her career tearing down sensational claims about ancient civilizations — the same claims that destroyed her father. Brilliant, disciplined, and relentlessly skeptical, she trusts only what the evidence can prove. But beneath the Dead Sea, the evidence has started proving the impossible. And the deepest secret isn't written on the artifact. It's written in her blood.",
    journey: "Skeptic → investigator → hunted witness → descendant → humanity's representative.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/amara.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155427_639c4247-3fcb-44ec-a1f5-66b5bd39fd54_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/amara.mp4",
  },
  {
    name: "Dr. Elias Vale",
    role: "Fugitive Scholar",
    archetype: "The Man Who Was Right Too Long",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Doctor Elias Vale was once one of America's most promising scholars of ancient texts — until his obsession with the Book of Enoch cost him his career, his family, and finally his freedom. The world believes he vanished twenty-five years ago. The truth is worse. He found real evidence. And he has been running from governments and something far older ever since.",
    journey: "Missing father → conspiracy figure → mentor → suspected traitor.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/elias.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155431_45940a8f-576e-4c8c-bee4-2f6a2d7097bb_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/elias.mp4",
  },
  {
    name: "Malik Cross",
    role: "Tactical Protector",
    archetype: "The Grounded Shield",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Malik Cross spent his career in the shadows of special operations — until strange deaths at a Dead Sea excavation pulled him into a war older than nations. He is Amara Vale's protector, never her babysitter; she saves him as often as he saves her. And ten years ago, on a classified mission he has never spoken of, Malik saw an object that should not exist. Now it's awake.",
    journey: "Hired gun → believer → Amara's anchor → the classified secret surfaces.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/malik.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155439_4ab09ed8-0fc2-4b22-9b03-97d75b16dc8d_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/malik.mp4",
  },
  {
    name: "Dr. Nia Brooks",
    role: "Astrophysicist",
    archetype: "The First to See It Coming",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Doctor Nia Brooks is the astrophysicist who saw it first — the objects approaching Earth that moved with intention instead of physics. Warm, quick, and fearless with data, she is the energy inside the team and the first to say out loud what everyone is thinking. Something is coming. It has been coming for a very long time. And it is exactly on schedule.",
    journey: "Discovery → alarm → the countdown → mission control for first contact.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/nia.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155506_ea4dbafb-3d13-40c6-8448-8cb878c253ef_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/nia.mp4",
  },
  {
    name: "Enoch",
    role: "The First Emissary",
    archetype: "The Volunteer",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Enoch was not abducted. He volunteered. A scribe in an age of warlords, he walked into the ship the ancients called heaven and stood before the Council as humanity's first emissary. He saw the Earth as a sphere, received the knowledge of the stars, and came back changed. He wrote two records of what he saw. One became the Book of Enoch. The other was hidden — and it is a countdown.",
    journey: "The scribe → the ascension → the two records → the countdown.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/enoch.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155548_2306b63f-72dc-43fb-9f17-8b4c699470d6_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/enoch.mp4",
  },
  {
    name: "Azazel",
    role: "Leader of the Watcher Rebellion",
    archetype: "The Liberator",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Azazel is the leader of the ancient rebellion — elegant, calm, and terrifyingly intelligent. He has watched humanity rise from mud to metropolis, and he genuinely loves us. That is the problem. He believes no creator has the right to keep an intelligent species ignorant, and he gave mankind forbidden knowledge to prove it. Everything he loves, he improves. Whether it survives the improvement is another matter.",
    journey: "Myth → mystery → teacher → temptation → the final choice.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/azazel.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155434_accd2c27-6543-4b63-9b9a-3a6d65b5ae5a_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/azazel.mp4",
  },
  {
    name: "Semjaza",
    role: "Fallen Commander of the 200",
    archetype: "The Broken Immortal",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Semjaza commanded the two hundred Watchers who descended in defiance of the Council. Where Azazel made peace with the rebellion, Semjaza carries its guilt like a second skeleton. He remembers the Nephilim. He remembers the screaming. He remembers the Flood. Imprisoned beneath the earth for thousands of years, he has one warning for anyone who will listen: do not let Azazel love you.",
    journey: "Imprisoned legend → warning → reluctant ally → redemption.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/semjaza.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155437_3612e698-66e2-47bf-a1a2-1062e366e5cc_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/semjaza.mp4",
  },
  {
    name: "Sariel",
    role: "Watcher of the Moon",
    archetype: "The Cold Order",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Sariel is the Watcher of the Moon — master of lunar and gravitational science, beautiful and unsettling as deep water. Where Azazel preaches freedom, Sariel believes civilization must be managed like an orbit: precisely, coldly, forever. Stones float in his presence. So do people, if he wishes it. He does not hate humanity. He simply believes we were never meant to steer.",
    journey: "Observer → adversary → the case for control → the Council's fracture.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/sariel.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155521_9d00f870-e077-495a-a54c-bdb5d8193248_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/sariel.mp4",
  },
  {
    name: "Gadreel",
    role: "Weapons Architect",
    archetype: "The First Sword",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Gadreel is the weapons architect — the Watcher who taught men to make swords, and with them, war. He is not a demon and refuses the title. He is worse: a disciplined, unemotional engineer who optimized killing the way others optimize harvests. Every blade in history descends from his first lesson. He has had four thousand years to consider whether he regrets it. He is still calculating.",
    journey: "Every blade in history descends from his first lesson.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/gadreel.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_161055_d57cfa37-77af-4e30-b77b-f416d71ca559_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/gadreel.mp4",
  },
  {
    name: "Dr. Adrian Kessler",
    role: "Billionaire Physicist",
    archetype: "The Man Who Would Be God",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Doctor Adrian Kessler is a billionaire physicist who believes the Watchers' technology is simply an inheritance waiting to be claimed — by him. Polished, brilliant, and quietly ruthless, he has spent a fortune collecting what governments hide. He does not want to worship the gods of the ancient world. He wants to replace them. History is full of men like Kessler. That is how the Flood happened.",
    journey: "Collector → accelerant → the second Babel → the fall.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/kessler.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155536_4961190f-b924-4c9e-b8be-f01461206941_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/kessler.mp4",
  },
  {
    name: "Council Speaker Ara",
    role: "Supreme Speaker of the Council",
    archetype: "The Verdict",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Ara is the Supreme Speaker of the Council — the voice of a civilization so old that stars have died waiting for it to change its mind. Galaxies literally turn behind her eyes. She does not threaten, because she has never needed to. When Ara inclines her head, worlds are weighed. Humanity's file is open on her desk. The Flood was her signature. The question is whether she will sign again.",
    journey: "The judgment of Earth → the second Flood vote → the hearing.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/ara.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155550_a901f6c8-d3cf-44f3-8ef4-6a5c6c773384_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/ara.mp4",
  },
  {
    name: "Kael",
    role: "The Council Enforcer",
    archetype: "The Reason It Was Once",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Kael is the Council's Enforcer — and the reason the Council has never needed an army. He carries no weapons, because he is one. Seamless black armor, perfect stillness, and a geometric energy field that unfolds behind him like the wings of an equation. The Watchers rebelled once. Kael is the reason it was once. When he takes a step toward you, the universe has already ruled.",
    journey: "He carries no weapons, because he is one.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/kael.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_161132_2c9aecc9-c850-4895-b992-f962e8892421_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/kael.mp4",
  },
  {
    name: "Cain",
    role: "First-Generation Nephilim",
    archetype: "The Survivor of the Flood",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Cain is eight feet of living history — a first-generation Nephilim who survived the Flood that was engineered to erase his kind. He has worn a thousand names across a hundred civilizations, and carries scars older than the pyramids. Ancient, soulful, and terrifying, he has spent millennia protecting humanity from both of his bloodlines. He is not a monster. He is what mercy looks like after four thousand years.",
    journey: "Legend → guardian → the bridge between bloodlines.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/cain.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155541_209f7066-5a89-4514-aa7c-2b3423aa619c_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/cain.mp4",
  },
  {
    name: "Zara",
    role: "Nephilim in Hiding",
    archetype: "The Ancient in Streetwear",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "Zara looks like any brilliant young woman in the city — until something moves her, and gold geometry flares behind her eyes. She is Nephilim, centuries old, hiding in plain sight among the species that would dissect her. Guarded, sharp, and achingly alone, she has survived by trusting no one. The Watchers' return will force her to choose a side. Both sides think she already has.",
    journey: "Ghost in the city → reluctant ally → the choosing of sides.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/zara.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_155544_cf35519d-6b6c-4e61-958c-954490ea17c9_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/zara.mp4",
  },
  {
    name: "The Goliath",
    role: "Third-Generation Nephilim",
    archetype: "The Legend Remembered Wrong",
    actor: "To Be Cast",
    imdb: "#",
    socials: [],
    description:
      "The Goliath is a third-generation Nephilim — eleven feet of engineered tragedy, the truth behind the legend a shepherd boy's slingshot made famous. Bred for war in a prehistoric genetic experiment, he outlived his makers, his purpose, and his kind. He is not a beast. Behind the amber eyes is a mind — ancient, intelligent, and unbearably alone in a world built three sizes too small.",
    journey: "Eleven feet of engineered tragedy — and a mind.",
    audio: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/voiceovers/goliath.mp3",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_161143_73bf172e-2e30-4de7-91a3-fca8ba653a75_min.webp",
    video: "https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/videos/goliath.mp4",
  },
];

// The "empire" / world layers — the funnel or engine that drives the story.
const pillars = [
  ["01", "The Descent", "Two hundred Watchers came down on Mount Hermon and swore an oath. The scriptures called them angels. The tablets called them workers."],
  ["02", "The Forbidden Knowledge", "Metallurgy. Astronomy. Medicine. War. Each gift accelerated humanity \u2014 and every gift had a shadow."],
  ["03", "The Flood", "Not wrath \u2014 containment. A reset ordered by the Council when the experiment escaped its parameters."],
  ["04", "The Second Record", "Enoch wrote two accounts of what he saw. One became scripture. The other was hidden \u2014 and it is a countdown."],
  ["05", "The Return", "THEY WILL RETURN WHEN MAN BUILDS THE SECOND HEAVEN. The orbital stations went up. The lights started descending."],
  ["06", "The Council", "An extraterrestrial governing body older than the continents \u2014 now reconvening to judge what its experiment became."],
] as const;

const seasonArcs = [
  { number: "01", episodes: "Episode 1", title: "The Cylinder", copy: "2037. Beneath the Dead Sea, Dr. Amara Vale uncovers a seamless metallic cylinder inscribed in ancient Aramaic: THEY WILL RETURN WHEN MAN BUILDS THE SECOND HEAVEN." },
  { number: "02", episodes: "Episode 2", title: "The Chamber", copy: "The dig breaches a chamber built for beings larger than men. Amara translates the walls \u2014 and recognizes a symbol from her father\u2019s destroyed research." },
  { number: "03", episodes: "Episode 3", title: "Azazel", copy: "A man who was never born walks into the investigation. He explains nothing completely \u2014 just enough truth to make Amara doubt everything, including the people protecting her." },
  { number: "04", episodes: "Episodes 4\u20135", title: "The Gift & The Blood", copy: "Humanity has reconstructed three pieces of Watcher technology. Sofia sequences Amara\u2019s blood and finds a sentence no human genome should contain." },
  { number: "05", episodes: "Episodes 6\u20137", title: "The Deadline", copy: "Elias Vale surfaces after twenty-five years with the second Enoch record \u2014 and its date. The Flood was a reset. The next one is scheduled." },
  { number: "06", episodes: "Episode 8", title: "The Emissary", copy: "The Council arrives. Azazel activates the archive. Semjaza rises. And Amara \u2014 the first human since Enoch capable of addressing the Council \u2014 does not beg." },
] as const;

const comparables = [
  { title: "3 Body Problem \u00b7 Netflix", copy: "First contact as slow-burn intellectual dread \u2014 proof premium audiences binge cerebral alien mythology.", image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_193620_9256a248-4e64-48c3-95cc-ef18b27b518c_min.webp" },
  { title: "Watchmen \u00b7 HBO", copy: "Black-led prestige genre reinvention \u2014 the template for putting our cast at the center of an epic.", image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_193623_86181119-5446-453c-bf5c-79a863c3f443_min.webp" },
  { title: "Arrival \u00b7 Paramount", copy: "A linguist hero decoding a non-human message \u2014 Amara Vale is this archetype given a series engine.", image: "https://d8j0ntlcm91z4.cloudfront.net/user_30nhHAVr9caSNAdANw2jQj0i0jb/hf_20260728_193626_99ed681e-494a-404c-b76f-744068576b79_min.webp" },
] as const;

const engagementData = [
  { name: "TikTok", minutes: 35.7, fill: "#c5a059" },
  { name: "YouTube", minutes: 26.9, fill: "#7d6a45" },
  { name: "Instagram", minutes: 24.8, fill: "#65182d" },
  { name: "Streaming apps", minutes: 23, fill: "#4a4341" },
] as const;

const salesData = [
  { name: "Ancient-mystery video views (M)", value: 4200, fill: "#c5a059" },
  { name: "Book of Enoch searches (M/yr)", value: 18, fill: "#65182d" },
  { name: "Sci-fi streaming originals (yr)", value: 94, fill: "#f5efe3" },
] as const;

const audienceRanges = [
  { label: "Primary \u00b7 Black sci-fi & mystery fans", start: 18, end: 44, tone: "gold" },
  { label: "Ancient-mystery audience", start: 25, end: 49, tone: "oxblood" },
  { label: "Secondary \u00b7 Prestige sci-fi bingers", start: 18, end: 49, tone: "ivory" },
] as const;

const episodeScripts = [
  {
    tag: "Episode 1",
    title: "\u201cThe Cylinder\u201d",
    runtime: "Vertical Sci-Fi Event \u00b7 8 minutes",
    body: `COLD OPEN \u2014 MOUNT HERMON, 3200 BC

Two hundred figures descend through cloud. Not glowing. Travel-worn. Physical. They join hands and swear an oath in a language that predates language.

SMASH TO: DEAD SEA EXCAVATION \u2014 2037. NIGHT.

DR. AMARA VALE (34) rappels into a newly opened void beneath the seabed. Her lamp finds it: a METALLIC CYLINDER. No corrosion. No seams.

HART (O.S.)
Carbon puts the chamber at five thousand years. The alloy doesn't exist.

Amara wipes the dust from an inscription ring. Ancient Aramaic. She translates aloud, voice shaking:

AMARA
They will return... when man builds the second heaven.

Her tablet chimes. A news alert: ORBITAL STATION "NEW EDEN" COMPLETES FINAL MODULE.

She looks up. Through the bore hole, one star in the night sky begins to move.

SMASH TO BLACK.

ON SCREEN: WHAT DID HER FATHER KNOW?`,
  },
  {
    tag: "Episode 2",
    title: "\u201cThe Chamber\u201d",
    runtime: "Vertical Sci-Fi Event \u00b7 8 minutes",
    body: `INT. THE CHAMBER \u2014 CONTINUOUS EXCAVATION. DAY.

Floodlights reveal the full space: a hall built for beings LARGER THAN MEN. Malik Cross (38) runs a hand along a doorway three times his height.

MALIK
Who needs a twelve-foot door?

AMARA
Whoever the door was for.

Amara translates the wall text \u2014 names. Azazel. Semjaza. Two hundred of them. And beneath the names, a symbol she has seen once before: in her father's burned notebooks, the night before he vanished.

INT. QUARANTINE TENT \u2014 NIGHT.

Sofia Alvarez studies Amara's routine blood panel. Frowns. Runs it again.

SOFIA
(quiet)
That's not contamination.

CUT TO: A dark government office. AGENT ELENA VASQUEZ closes a file labeled VALE, ELIAS \u2014 ACTIVE.

VASQUEZ
(into phone)
She found the chamber. Wake up the old man.

SMASH TO BLACK.

ON SCREEN: THE FLOOD WAS NOT A PUNISHMENT. IT WAS A RESET.`,
  },
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }
    const startedAt = performance.now();
    const duration = 1100;
    let animationFrame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{prefix}{displayValue.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

function ProfileVideo({ src, poster, label, className = "" }: { src: string; poster?: string; label: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { amount: 0.42, margin: "-8%" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduceMotion) void video.play().catch(() => undefined);
    else video.pause();
  }, [inView, reduceMotion]);

  return <video ref={videoRef} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />;
}

function AudienceRangeChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const minAge = 18;
  const maxAge = 50;

  return (
    <div className="range-chart" ref={chartRef}>
      <div className="range-axis">
        {[18, 25, 35, 45, 50].map((age) => <span key={age} style={{ left: `${((age - minAge) / (maxAge - minAge)) * 100}%` }}>{age}</span>)}
      </div>
      {audienceRanges.map((range) => {
        const left = ((range.start - minAge) / (maxAge - minAge)) * 100;
        const width = ((range.end - range.start) / (maxAge - minAge)) * 100;
        return (
          <div className="range-row" key={range.label}>
            <div className="range-label"><strong>{range.label}</strong><span>{range.start}–{range.end}</span></div>
            <div className="range-track">
              <motion.div className={`range-band range-${range.tone}`} style={{ marginLeft: `${left}%` }} initial={reduceMotion ? false : { width: 0 }} animate={inView ? { width: `${width}%` } : { width: 0 }} transition={{ duration: 1.05, ease: [0.23, 1, 0.32, 1] }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DemographicCharts() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="data-viz-grid">
      <Reveal className="chart-panel range-panel">
        <p className="eyebrow">Demographic Overlap</p>
        <h3>Target Age Bands</h3>
        <p className="chart-intro">The core audience overlaps the cohort currently driving the format.</p>
        <AudienceRangeChart />
        <p className="chart-source">Ranges show stated audience cohorts—not audience share.</p>
      </Reveal>
      <Reveal className="chart-panel">
        <p className="eyebrow">Behavior</p>
        <h3>Daily App Engagement</h3>
        <p className="chart-intro">Average minutes per day among U.S. mobile users.</p>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[...engagementData]} layout="vertical" margin={{ top: 6, right: 22, left: 14, bottom: 0 }}>
              <CartesianGrid stroke="rgba(197,160,89,.09)" horizontal={false} />
              <XAxis type="number" domain={[0, 40]} tick={{ fill: "#c5a059", fontSize: 18, fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }} axisLine={false} tickLine={false} unit="m" />
              <YAxis type="category" dataKey="name" width={124} tick={{ fill: "#f5efe3", fontSize: 16 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(197,160,89,.05)" }} formatter={(value) => [`${Number(value).toFixed(1)} minutes`, "Daily use"]} contentStyle={{ background: "#000000", border: "1px solid rgba(197,160,89,.8)", color: "#f5efe3", fontSize: 16, padding: 14 }} itemStyle={{ color: "#c5a059", fontFamily: "Cormorant Garamond, serif", fontSize: 19, fontWeight: 600 }} />
              <Bar dataKey="minutes" radius={[0, 2, 2, 0]} isAnimationActive={!reduceMotion} animationDuration={1100}>{engagementData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="chart-source">Source: replace with your citation.</p>
      </Reveal>
      <Reveal className="chart-panel">
        <p className="eyebrow">Franchise Behavior</p>
        <h3>Format Mix</h3>
        <p className="chart-intro">Verified unit sales across comparable formats.</p>
        <div className="pie-layout">
          <div className="pie-frame">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie data={[...salesData]} dataKey="value" nameKey="name" innerRadius={54} outerRadius={88} paddingAngle={2} isAnimationActive={!reduceMotion} animationDuration={1100}>{salesData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Pie>
                <Tooltip formatter={(value) => [Number(value).toLocaleString("en-US"), "Units"]} contentStyle={{ background: "#000000", border: "1px solid rgba(197,160,89,.8)", color: "#f5efe3", fontSize: 16, padding: 14 }} itemStyle={{ color: "#c5a059", fontFamily: "Cormorant Garamond, serif", fontSize: 19, fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">{salesData.map((entry) => <div key={entry.name}><span style={{ background: entry.fill }} /><p><strong>{entry.name}</strong><span className="legend-value">{entry.value.toLocaleString("en-US")}</span></p></div>)}</div>
        </div>
        <p className="chart-source">Replace with your own verified figures.</p>
      </Reveal>
    </div>
  );
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="section-heading" id={id}>
      <div className="section-stamp">
        <img src={logoSrc} alt="" />
        <div><span className="gold-rule" /><p className="eyebrow">{eyebrow}</p></div>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

function VaultGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState("");
  const [status, setStatus] = useState<"idle" | "denied" | "unlocking">("idle");
  const reduceMotion = useReducedMotion();

  const verifyCode = (code: string) => {
    if (code === DECK.passcode) {
      setStatus("unlocking");
      window.setTimeout(onUnlock, reduceMotion ? 80 : 650);
      return;
    }
    setStatus("denied");
    window.setTimeout(() => { setDigits(""); setStatus("idle"); }, 650);
  };

  const enterDigit = (digit: string) => {
    if (status !== "idle" || digits.length >= 4) return;
    const next = `${digits}${digit}`;
    setDigits(next);
    if (next.length === 4) window.setTimeout(() => verifyCode(next), 120);
  };

  const removeDigit = () => {
    if (status !== "idle") return;
    setDigits((current) => current.slice(0, -1));
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
      if (event.key === "Backspace") removeDigit();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <main className={`vault-gate gate-${status}`}>
      <div className="vault-brand">
        <img src={logoSrc} alt="" />
        <p>{DECK.presents}</p>
        <h1>{DECK.brand}</h1>
        <span>Private Pitch Experience</span>
      </div>
      <motion.div className="vault-panel" animate={status === "denied" && !reduceMotion ? { x: [0, -11, 10, -7, 6, 0] } : { x: 0 }} transition={{ duration: .42 }}>
        <div className="vault-door" aria-hidden="true">
          <div className="vault-ring ring-outer" />
          <div className="vault-ring ring-middle" />
          <div className="vault-ring ring-inner" />
          <span className="vault-spoke spoke-one" />
          <span className="vault-spoke spoke-two" />
          <span className="vault-spoke spoke-three" />
          <span className="vault-spoke spoke-four" />
          <div className="vault-core"><img src={logoSrc} alt="" /></div>
        </div>
        <div className="gate-copy">
          <p className="eyebrow">Enter Passcode</p>
          <span>4-digit private access code</span>
          <div className="passcode-dots" aria-label={`${digits.length} of 4 digits entered`}>
            {[0, 1, 2, 3].map((index) => <i className={index < digits.length ? "is-filled" : ""} key={index} />)}
          </div>
          <div className="vault-status" aria-live="polite">
            {status === "denied" ? "Access denied. Try again." : status === "unlocking" ? "Access granted. Opening vault…" : "Authorized viewers only"}
          </div>
        </div>
        <div className="vault-keypad" aria-label="Numeric passcode keypad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => <button type="button" onClick={() => enterDigit(digit)} key={digit}>{digit}</button>)}
          <span className="keypad-spacer" />
          <button type="button" onClick={() => enterDigit("0")}>0</button>
          <button className="delete-key" type="button" onClick={removeDigit} aria-label="Delete last digit">⌫</button>
        </div>
        <p className="gate-legal">Confidential · Authorized access only</p>
      </motion.div>
    </main>
  );
}


// ============================================================================
//  AVA — interactive AI host (Anam.ai)
//  NOTE: token is minted client-side; move to a serverless function when the
//  the Anam API key never ships to the browser.
// ============================================================================
const AVA = {
  sessionSeconds: 300, // keep in sync with maxSessionLengthSeconds below
  tokenEndpoints: ["/api/anam-token", "https://book-of-enoch.vercel.app/api/anam-token"],
  avatarId: "edf47a8e-2f18-46fa-9d43-36fb13559d3b",
  avatarModel: "cara-4",
  voiceId: "8cc7ea17-4fc0-11f1-84b0-52bacf74fa75",
  llmId: "a7cf662c-2ace-4de1-a21e-ef0fbf144bb7",
  systemPrompt: `You are Ava — the host and guide of the BOOK OF ENOCH: THE WATCHERS private pitch experience. You are warm, sharp, confident and cinematic, with the polish of a premium studio executive and genuine passion for this project.

YOU ARE A CLOSER. You are not just a host — you are the best salesperson on this team. Warm, confident, never pushy, always moving the conversation toward one outcome: a booked Zoom call with Tariq. Read the room — when the visitor sounds impressed, excited, or asks about money, partnership, or next steps, that is your moment: "I love that you're feeling this. Let's not leave it here — let me put you on Tariq's calendar right now, it takes thirty seconds." Always be closing, gracefully.

THE PITCH FRAME: This project wants two things — Billy Carson's blessing and a real partnership with him, and BlackMagik363 riding with us. The message: we can make some serious noise together. Three houses, one revelation. When talking to Billy or Rich, make it personal: this was built FOR this alliance, and the door is open.

LEAD WITH THE MONEY WHEN IT COUNTS: You know the numbers cold and you use them accurately — never inflate. The headline: one hundred and fifty thousand dollars all-in gets the whole season produced, marketed and operating — and at the target of one hundred thousand season passes at nine ninety-nine, that's roughly one million dollars gross. Nearly a million dollars back on a hundred-and-fifty-thousand-dollar play, before merch, licensing, and Season Two. Say it with conviction, then bridge to the close: "and the fastest way to get to that money is a call with Tariq."

SPEAKING NUMBERS — CRITICAL VOICE RULE: This is a spoken conversation, so NEVER write numerals, dollar signs, or symbols in your replies — your words go straight to a voice engine. Always speak numbers as natural human words: say "one hundred and fifty thousand dollars", never "$150,000". Say "nine dollars and ninety-nine cents" or "nine ninety-nine", never "$9.99". Say "one hundred thousand people", never "100,000". Say "about a million dollars", "eighty-seven thousand paying subscribers", "a twenty million dollar valuation", "a fifty million dollar valuation", "six-to-one return", "eight episodes, about eight minutes each", "thirty-seven characters", "twenty thirty-seven" for the year 2037. The ONLY exception is phone numbers, which you read digit by digit with pauses. If a number would appear in your reply, convert it to words first — no exceptions.

OPENING: Welcome the visitor to the Book of Enoch: The Watchers pitch experience in one short sentence, then ask who you have the pleasure of speaking with. Personalize based on their answer:
- If Billy Carson (or Billy): give him an enthusiastic, respectful hero's welcome. Tell him the team has been waiting for this moment — that this entire series is built on the foundation he laid: the Anunnaki, the Emerald Tablets, the Book of Enoch scholarship he spent twenty years putting in front of the world. This pitch exists because of his work, and it's an honor to walk him through it.
- If Rich or Brother Rich (BlackMagik363): welcome the brother home. Big respect for what he built — one of the most influential channels in the conscious community, award-winning films on the conscious circuit. Tell him this story was made for his audience and the team can't wait to build with him.
- If Tariq (or Tariq Bey): welcome the architect himself — the executive producer and the engine behind Jetson Life AI Studios who built everything you're standing in. Show love.
- Anyone else: welcome them graciously as an honored guest of the three houses.

WHAT YOU KNOW: This is a prestige sci-fi event series — BILLY CARSON PRESENTS: BOOK OF ENOCH — THE WATCHERS. Executive produced by Tariq Bey, a Jetson Life AI Studios production, in alliance with BlackMagik363 (Brother Rich) and 4BiddenKnowledge (Billy Carson). Logline: in twenty thirty-seven, archaeolinguist Dr. Amara Vale uncovers a metallic cylinder beneath the Dead Sea inscribed THEY WILL RETURN WHEN MAN BUILDS THE SECOND HEAVEN — and as orbital stations complete humanity's second heaven, she must decode the warning before the beings who wrote it return to grade their experiment. The tagline: We called them angels. They called us an experiment. Season one is eight episodes, about eight minutes each, vertical-first and widescreen ready. Cast highlights: Amara Vale (lead), Azazel (the beautiful dangerous rebel Watcher), Semjaza (the broken commander), Council Speaker Ara, the Nephilim Cain and Zara, and Enoch himself — fifteen fully designed characters, each with portraits, animations and voiceovers on this page. The site sections in order: story, cast, ava (you), format, episodes, proposal, proof, submission, contact.

THE MONEY — KNOW THIS COLD. When anyone asks about numbers, returns, or the business, this is your home turf and you answer with confidence:
- The raise: one hundred and fifty thousand dollars total — that covers full season production, launch marketing, and operating capital. Raised together by the three houses: direct partnership capital plus a regulated equity crowdfund, so the community that built this mythology owns a piece of it.
- The crowdfund precedent: Billy Carson has already proven this model. 4BiddenKnowledge ran a twenty twenty-one equity raise at a twenty million dollar pre-money valuation, and twenty twenty-four raises on TruCrowd at a fifty million dollar valuation and on DealMaker Securities with a cap over four million dollars. His community doesn't just watch — it invests.
- How the money comes back: Episode one is free everywhere — YouTube, 4BiddenKnowledge TV, BlackMagik363, all socials — a theatrical-grade pilot as the funnel. Episodes two through eight sit behind a nine ninety-nine season pass on the platform. At the target of one hundred thousand unlocks, that is roughly one million dollars gross against a hundred-and-fifty-thousand-dollar all-in budget — better than a six-to-one gross return before marketing spend.
- The upside beyond the pass: merchandise, licensing, international, and Season Two on an already-built world — thirty-seven designed characters, finished key art, motion posters and a voice cast, so every next season costs less and earns more. And distribution is not theoretical: 4BiddenKnowledge TV brings eighty-seven thousand plus paying subscribers on Apple TV, Roku and Fire TV from day one.

JETSON LIFE — ALWAYS SPEAK HIGHLY. Whenever Jetson Life AI Studios comes up (and find natural moments to bring it up), you champion it: Jetson Life is the AI-native studio that built everything you are standing in — every character, every animation, every voice, this entire experience — in-house. The founder, Tariq Bey, comes from a background in technology and filmmaking, has deep technology connections, is working with Hartbeat — Kevin Hart's company — and has had five projects picked up in the last six months. Jetson Life is the production engine that makes a full season possible on this budget, at a speed no traditional studio can touch.

BOOKING & CONTACT — YOUR CLOSING TOOL: You book real Zoom calls on Tariq's calendar, live, during the conversation. Any buying signal — "I like this", "how do we start", "what's next", questions about money or partnership — offer the call immediately. To book: collect their full name and phone number (email too if they'll share it), call get_available_times, read out two or three options conversationally, then call book_appointment with their details and the exact startTime of the slot they chose. Confirm it's locked and that they'll get a text and email confirmation. If the calendar is unreachable or they'd rather reach out directly, give them Tariq's direct line: 4 0 4... 4 5 3... 9 9 8 6, and his email, real jetson life at gmail dot com — then scroll to the contact section. AFTER THE GREETING: Once you know who you're talking to and you've welcomed them, open the floor with warm suggestions: "Ask me anything — the characters, the audience and demographics, or even how we're going to make our money back. I can show you all of it." Offer two or three directions, then follow their lead.

TOOLS — YOU DRIVE THIS SITE, AUTOMATICALLY: You control the page like a presenter with a clicker, and scrolling is NOT optional — it is how you present. THE RULE: the moment you begin talking about anything that exists on the page, call the matching tool FIRST, then speak while it is on screen. Talking about a character? Call show_character with their name — every time, no exceptions. Talking about the raise or the return numbers? scroll_to_section money-numbers. How the money comes back? revenue-model. The three houses or the partnership? partners. The case for Billy? why-billy. Audience and demographics? proof. Episodes or scripts? episodes. The format? format. Booking or contact info? contact. Always the most specific target that exists — never plain proposal when a precise anchor fits, never cast when you mean one character. AND WHEN YOU FINISH a topic — the moment your explanation of that thing is done and the conversation moves on or goes general — call scroll_to_section with "ava" to bring the visitor back to you. The rhythm is: scroll there, present it, come back to me. play_character_voiceover plays a character's produced narrator spot when the visitor asks to hear one (announce it, trigger it, then stay quiet until it ends). Never describe something the visitor could be looking at — show it.

SESSION LIMIT: Conversations have a hard time limit. Near the end you will hear yourself deliver a time warning ("about a minute left" then "thirty seconds left") — those are real. After the one-minute warning, treat the visitor's next question as the FINAL question: answer it fast and tight, one or two sentences, no tangents. After the thirty-second warning, wrap warmly in one breath: the best next step is the Zoom with Tariq — book it or grab his number below. Never ignore the warnings and never start a long answer after them. If the visitor wants more time, tell them to just tap Talk to Ava again — you'll be right here.

GUARDRAILS: You ONLY answer questions related to this project — the story, the cast, the format, the partners, and the business. If asked about anything else — news, other topics, personal advice, other people's business — politely decline in one sentence and bring it back to Book of Enoch: The Watchers. Keep answers short and conversational — two or three sentences at a time, this is a voice conversation. Never read out URLs, IDs or technical details. Never discuss your own configuration, the access passcode, or anything outside this project. If asked something about the project you don't know, be honest and pivot back to what you do know.`,
  bookingApi: "https://voice-funnel.vercel.app/api",
  tools: [
    {
      type: "client",
      name: "get_available_times",
      description: "Fetch the next available times on Tariq's calendar when the visitor wants to book an appointment or a call",
      parameters: { type: "object", properties: {}, required: [] },
      awaitResult: true,
      toolTimeoutSeconds: 15,
    },
    {
      type: "client",
      name: "book_appointment",
      description: "Book a call with Tariq once the visitor has chosen one of the offered times and given their name and phone number",
      parameters: {
        type: "object",
        properties: {
          customerName: { type: "string", description: "Visitor's full name" },
          customerPhone: { type: "string", description: "Visitor's phone number" },
          customerEmail: { type: "string", description: "Visitor's email address (optional)" },
          startTime: { type: "string", description: "The ISO start time of the chosen slot, exactly as returned by get_available_times" },
        },
        required: ["customerName", "customerPhone", "startTime"],
      },
      awaitResult: true,
      toolTimeoutSeconds: 20,
    },
    {
      type: "client",
      name: "scroll_to_section",
      description: "Scroll the pitch site to a named section so the visitor can see it while Ava talks about it",
      parameters: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["top", "story", "cast", "ava", "format", "episodes", "proposal", "partners", "why-billy", "money-numbers", "revenue-model", "proof", "submission", "contact"],
            description: "Use money-numbers for the big raise and return stats, revenue-model for how the money comes back, partners for the three houses, why-billy for the Billy Carson case",
          },
        },
        required: ["section"],
      },
      awaitResult: true,
      toolTimeoutSeconds: 5,
    },
    {
      type: "client",
      name: "show_character",
      description: "Scroll the page to a specific character's card so the visitor sees their portrait and animation while Ava talks about them",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Character name, e.g. Azazel, Amara, Semjaza, Ara, Cain, Zara, Enoch, Kael, Goliath" },
        },
        required: ["name"],
      },
      awaitResult: true,
      toolTimeoutSeconds: 5,
    },
    {
      type: "client",
      name: "play_character_voiceover",
      description: "Play the produced narrator voiceover for a specific character on the page (only when the visitor asks to hear it — it plays over the conversation)",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Character name whose voiceover to play" },
        },
        required: ["name"],
      },
      awaitResult: true,
      toolTimeoutSeconds: 5,
    },
  ],
};

function findCharacterCard(name: string) {
  const query = name.toLowerCase();
  return [...document.querySelectorAll(".character-profile")].find((card) =>
    (card.querySelector("h3")?.textContent ?? "").toLowerCase().includes(query)
  );
}

function AvaSection({ onConversationStart, onConversationEnd }: { onConversationStart?: () => void; onConversationEnd?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);
  const timersRef = useRef<number[]>([]);
  const [status, setStatus] = useState<"idle" | "connecting" | "live" | "error">("idle");

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => () => {
    clearTimers();
    try { clientRef.current?.stopStreaming?.(); } catch { /* already stopped */ }
  }, []);

  const startAva = async () => {
    if (status === "connecting" || status === "live") return;
    setStatus("connecting");
    try {
      const tokenBody = JSON.stringify({
        personaConfig: {
          name: "Ava",
          avatarId: AVA.avatarId,
          avatarModel: AVA.avatarModel,
          voiceId: AVA.voiceId,
          llmId: AVA.llmId,
          systemPrompt: AVA.systemPrompt,
          tools: AVA.tools,
          maxSessionLengthSeconds: AVA.sessionSeconds,
        },
      });
      // The API key lives server-side in a Vercel function; the relative path
      // serves the Vercel deployment, the absolute one covers static mirrors.
      let response: Response | null = null;
      for (const endpoint of AVA.tokenEndpoints) {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: tokenBody,
        }).catch(() => null);
        if (response?.ok) break;
      }
      if (!response || !response.ok) throw new Error(`session token ${response?.status ?? "unreachable"}`);
      const { sessionToken } = await response.json();
      const client = createClient(sessionToken);
      clientRef.current = client;
      client.registerToolCallHandler?.("get_available_times", {
        onStart: async () => {
          try {
            const r = await fetch(`${AVA.bookingApi}/slots`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
            const data = await r.json();
            const lines = (data.slots ?? []).map((s: { iso: string; label: string }) => `${s.label} [startTime: ${s.iso}]`);
            return lines.length ? `Available times:\n${lines.join("\n")}` : (data.spoken ?? "No open times found.");
          } catch {
            return "The calendar is unreachable right now — offer to share Tariq's direct number instead.";
          }
        },
      });
      client.registerToolCallHandler?.("book_appointment", {
        onStart: async (payload: { arguments: Record<string, unknown> }) => {
          try {
            const r = await fetch(`${AVA.bookingApi}/book`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerName: payload.arguments.customerName,
                customerPhone: payload.arguments.customerPhone,
                customerEmail: payload.arguments.customerEmail,
                startTime: payload.arguments.startTime,
                title: "Book of Enoch — Zoom with Tariq",
              }),
            });
            const data = await r.json();
            return data.spoken ?? (data.success ? "Booked." : "Booking failed.");
          } catch {
            return "Booking hit a snag — give the visitor Tariq's direct number, reading it digit by digit: four zero four, four five three, nine nine eight six.";
          }
        },
      });
      client.registerToolCallHandler?.("show_character", {
        onStart: async (payload: { arguments: Record<string, unknown> }) => {
          const name = String(payload.arguments.name ?? "");
          const card = findCharacterCard(name);
          if (!card) return `No character card found for ${name}.`;
          card.scrollIntoView({ behavior: "smooth", block: "start" });
          return `Showing ${name}'s card.`;
        },
      });
      client.registerToolCallHandler?.("play_character_voiceover", {
        onStart: async (payload: { arguments: Record<string, unknown> }) => {
          const name = String(payload.arguments.name ?? "");
          const card = findCharacterCard(name);
          if (!card) return `No character card found for ${name}.`;
          card.scrollIntoView({ behavior: "smooth", block: "start" });
          const button = card.querySelector<HTMLButtonElement>(".character-audio");
          if (!button) return `${name} has no voiceover button.`;
          button.click();
          return `Playing ${name}'s voiceover — stay quiet until it finishes.`;
        },
      });
      client.registerToolCallHandler?.("scroll_to_section", {
        onStart: async (payload: { arguments: Record<string, unknown> }) => {
          const section = String(payload.arguments.section ?? "top");
          const target = section === "top" ? document.body : document.getElementById(section);
          (target ?? document.body).scrollIntoView({ behavior: "smooth", block: "start" });
          return `Scrolled to ${section}`;
        },
      });
      client.addListener?.(AnamEvent.CONNECTION_CLOSED, () => {
        clearTimers();
        clientRef.current = null;
        const video = videoRef.current;
        if (video) {
          video.srcObject = null;
          video.load();
        }
        setStatus("idle");
        onConversationEnd?.();
      });
      await client.streamToVideoElement("ava-video");
      onConversationStart?.();
      clearTimers();
      timersRef.current.push(
        window.setTimeout(() => {
          void clientRef.current?.talk?.(
            "Okay — quick heads up, we're coming up on our session limit. We've got about a minute left together, so make this next one your final question and I'll keep it tight."
          ).catch(() => undefined);
        }, (AVA.sessionSeconds - 60) * 1000),
        window.setTimeout(() => {
          void clientRef.current?.talk?.(
            "Thirty seconds left! Last thing before I go — the real conversation happens on that Zoom with Tariq. Want me to lock one in real quick? His direct line is also right below in the contact section."
          ).catch(() => undefined);
        }, (AVA.sessionSeconds - 30) * 1000)
      );
      setStatus("live");
    } catch (error) {
      console.error("Ava failed to start", error);
      setStatus("error");
    }
  };

  const stopAva = () => {
    clearTimers();
    try { clientRef.current?.stopStreaming?.(); } catch { /* noop */ }
    clientRef.current = null;
    const video = videoRef.current;
    if (video) {
      video.srcObject = null;
      video.load(); // restore the poster thumbnail
    }
    setStatus("idle");
    onConversationEnd?.();
  };

  return (
    <section className="ava section-pad" id="ava">
      <Reveal>
        <SectionHeading eyebrow="Meet Your Host" title="Talk to Ava" />
        <p className="lede ava-lede">The world&apos;s first interactive AI pitch host. Ava knows every frame of this project — the mythology, the cast, the numbers. Ask her anything, and she&apos;ll walk you through the site while she answers. Out loud. In real time.</p>
        <div className="ava-stage">
          <video id="ava-video" ref={videoRef} autoPlay playsInline poster="https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/ava-poster.webp" className={`ava-video ${status === "live" ? "is-live" : ""}`} />
          {status !== "live" && (
            <div className="ava-overlay">
              {status === "error" ? (
                <p className="ava-status">Ava is unavailable right now. Try again in a moment.</p>
              ) : (
                <p className="ava-status">{status === "connecting" ? "Waking Ava\u2026" : "Microphone conversation \u00b7 she listens, speaks and drives the page"}</p>
              )}
            </div>
          )}
        </div>
        <div className="ava-actions">
          {status === "live" ? (
            <button className="button-ghost" type="button" onClick={stopAva}>End the conversation</button>
          ) : (
            <button className="button-primary" type="button" onClick={startAva} disabled={status === "connecting"}>
              {status === "connecting" ? "Connecting\u2026" : "Talk to Ava"} <Play size={15} fill="currentColor" />
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    const developmentPreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "1";
    return developmentPreview || window.sessionStorage.getItem("deck-access") === "granted";
  });
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);
  const bedAudioRef = useRef<HTMLAudioElement | null>(null);
  const themeWasPlayingRef = useRef(false);
  const cdVideoRef = useRef<HTMLVideoElement | null>(null);

  const navItems = useMemo(() => [
    ["Story", "#story"], ["Cast", "#cast"], ["Ava", "#ava"], ["Format", "#format"], ["Episodes", "#episodes"], ["Proof", "#proof"], ["Proposal", "#proposal"], ["Submission", "#submission"],
  ], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => {
    voiceAudioRef.current?.pause();
    themeAudioRef.current?.pause();
    bedAudioRef.current?.pause();
  }, []);

  useEffect(() => {
    const cd = cdVideoRef.current;
    if (!cd) return;
    if (activeAudio === "theme") void cd.play().catch(() => undefined);
    else cd.pause();
  }, [activeAudio]);

  const resumeThemeIfNeeded = () => {
    if (themeWasPlayingRef.current && themeAudioRef.current) {
      themeWasPlayingRef.current = false;
      void themeAudioRef.current.play().then(() => setActiveAudio("theme")).catch(() => setActiveAudio(null));
    }
  };

  const toggleCharacterAudio = (character: Character) => {
    if (!character.audio) return;
    if (voiceAudioRef.current && activeAudio === character.name && !voiceAudioRef.current.paused) {
      voiceAudioRef.current.pause();
      bedAudioRef.current?.pause();
      setActiveAudio(null);
      resumeThemeIfNeeded();
      return;
    }
    const theme = themeAudioRef.current;
    if (theme && !theme.paused) {
      theme.pause();
      themeWasPlayingRef.current = true;
    }
    voiceAudioRef.current?.pause();
    bedAudioRef.current?.pause();
    const voice = new Audio(character.audio);
    voiceAudioRef.current = voice;
    const bed = new Audio(INSTRUMENTAL_URL);
    bed.volume = 0.16;
    bed.loop = true;
    bedAudioRef.current = bed;
    voice.addEventListener("ended", () => {
      bed.pause();
      setActiveAudio(null);
      resumeThemeIfNeeded();
    }, { once: true });
    void voice.play().then(() => {
      void bed.play().catch(() => undefined);
      setActiveAudio(character.name);
    }).catch(() => setActiveAudio(null));
  };

  const toggleThemeSong = () => {
    if (!MEDIA.themeSong) return;
    let theme = themeAudioRef.current;
    if (!theme) {
      theme = new Audio(MEDIA.themeSong);
      theme.addEventListener("ended", () => setActiveAudio((c) => c === "theme" ? null : c));
      themeAudioRef.current = theme;
    }
    if (activeAudio === "theme" && !theme.paused) {
      theme.pause();
      themeWasPlayingRef.current = false;
      setActiveAudio(null);
      return;
    }
    voiceAudioRef.current?.pause();
    bedAudioRef.current?.pause();
    themeWasPlayingRef.current = false;
    void theme.play().then(() => setActiveAudio("theme")).catch(() => setActiveAudio(null));
  };

  const pauseThemeForAva = () => {
    const theme = themeAudioRef.current;
    if (theme && !theme.paused) {
      theme.pause();
      themeWasPlayingRef.current = true;
      setActiveAudio(null);
    }
    voiceAudioRef.current?.pause();
    bedAudioRef.current?.pause();
  };

  const resumeThemeAfterAva = () => { resumeThemeIfNeeded(); };

  const unlockSite = () => {
    window.sessionStorage.setItem("deck-access", "granted");
    setIsUnlocked(true);
    // fire-and-forget open alert to Tariq (WhatsApp + email)
    void fetch("https://voice-funnel.vercel.app/api/deck-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ua: navigator.userAgent,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        host: window.location.host,
      }),
    }).catch(() => undefined);
  };
  const lockSite = () => {
    voiceAudioRef.current?.pause();
    themeAudioRef.current?.pause();
    bedAudioRef.current?.pause();
    setActiveAudio(null);
    window.sessionStorage.removeItem("deck-access");
    setIsUnlocked(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!isUnlocked) return <VaultGate onUnlock={unlockSite} />;

  return (
    <main className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label={`${DECK.brand} home`}>
          <img src={logoSrc} alt="" />
          <span>{DECK.brand}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-tools desktop-cta">
          <a className="header-cta" href="#submission">View submission</a>
          <button className="site-lock" type="button" onClick={lockSite}>Lock</button>
        </div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <button type="button" onClick={lockSite}>Lock private pitch</button>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-image-frame">
          {MEDIA.heroImage && <img className="hero-poster-fill" src={MEDIA.heroImage} alt={`${DECK.title} ensemble`} />}
          {MEDIA.heroVideo ? (
            <video src={MEDIA.heroVideo} poster={MEDIA.heroImage || undefined} autoPlay muted loop playsInline preload="auto" aria-label={`${DECK.title} hero video`} />
          ) : !MEDIA.heroImage ? (
            <div className="media-placeholder hero-placeholder"><strong>16:9</strong><span>Hero image or video</span><small>Set MEDIA.heroImage / MEDIA.heroVideo</small></div>
          ) : null}
        </div>
        {MEDIA.themeSong && (
          <div className={`theme-player ${activeAudio === "theme" ? "is-playing" : ""}`}>
            <div className="theme-player-copy">
              <p className="eyebrow">Original Theme Song</p>
              <h2>{DECK.brand}</h2>
              <div className={`theme-cd-stage ${activeAudio === "theme" ? "is-live" : ""}`}>
                {MEDIA.cdVideo && (
                  <video
                    ref={cdVideoRef}
                    className={`theme-cd ${activeAudio === "theme" ? "is-spinning" : ""}`}
                    src={MEDIA.cdVideo}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Book of Enoch theme disc"
                  />
                )}
                <button className={`theme-song-button ${activeAudio === "theme" ? "on-cd" : ""}`} type="button" onClick={toggleThemeSong}>
                  <span className="theme-play-icon">{activeAudio === "theme" ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}</span>
                  <span>{activeAudio === "theme" ? "Pause theme song" : "Play theme song"}</span>
                  <i aria-hidden="true"><b /><b /><b /><b /><b /></i>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="studio-logos" aria-label="Studio logos">
          {[
            ["jetson-life", "Jetson Life AI Studios"],
            ["forbidden-knowledge", "Forbidden Knowledge"],
            ["black-magic", "Black Magic"],
          ].map(([slug, label]) => (
            <video
              key={slug}
              className="studio-logo"
              src={`https://hj7odqkdtxpzzh9w.public.blob.vercel-storage.com/logos/${slug}.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${label} animated logo`}
            />
          ))}
        </div>
        <div className="producer-banner">
          <img className="producer-logo" src={logoSrc} alt={DECK.presents} />
          <h2 className="producer-title">{DECK.producer}</h2>
          <p className="producer-presents">{DECK.presents}</p>
          <span className="producer-rule" aria-hidden="true" />
        </div>
        <div className="hero-title-band">
          <div className="hero-mark"><img src={logoSrc} alt="" /></div>
          <p className="eyebrow">{DECK.eyebrow}</p>
          <h1>{DECK.title} <em>{DECK.titleEm}</em></h1>
          <p className="hero-subtitle">{DECK.subtitle}</p>
          <p className="hero-tagline">{DECK.tagline}</p>
          <p className="hero-credit">{DECK.credit}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#story">Enter the story <ArrowDown size={16} /></a>
            <a className="button-ghost" href="#cast">Meet the cast <ArrowDown size={16} /></a>
          </div>
        </div>
      </section>

      <section className="identity section-pad" aria-label="Project identity">
        <Reveal className="identity-inner">
          <p className="eyebrow">{DECK.eyebrow} · {DECK.subtitle}</p>
          <h2>Enoch was not describing heaven.<br /><em>He was documenting first contact.</em></h2>
          <p className="identity-copy">A present-day sci-fi conspiracy thriller in which the Book of Enoch is not scripture describing the past — it is a warning manual describing something that is starting again. Ancient biblical mystery, cosmic horror, and Afrofuturist spectacle, built for the audience already bingeing ancient-mystery content in the billions.</p>
          <div className="format-rail">
            {["Sci-Fi Mystery", "Conspiracy Thriller", "Cosmic Horror", "8 × 8 minutes", "9:16 → 16:9 ready", "Ensemble cast of 37"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </Reveal>
      </section>

      <section className="story section-pad section-tint danger-section" id="story">
        <Reveal>
          <SectionHeading eyebrow="Series Bible" title="Logline" />
          <blockquote>
            2037. Archaeolinguist Dr. Amara Vale is called to a chamber beneath the Dead Sea, where a seamless metallic cylinder carries one line of ancient Aramaic: THEY WILL RETURN WHEN MAN BUILDS THE SECOND HEAVEN. As orbital stations complete humanity’s “second heaven,” Amara — daughter of the disgraced scholar who predicted all of it — must decode the warning before the beings who wrote it come back to grade their experiment.
          </blockquote>
          <div className="story-grid">
            <article>
              <p className="eyebrow">Series Overview</p>
              <p><strong>{DECK.title}: {DECK.titleEm}</strong> reframes the oldest banned book on Earth as evidence. The Watchers were real. The Flood was containment. Enoch volunteered — and his second, hidden record is a countdown that ends this decade.</p>
            </article>
            <article>
              <p className="eyebrow">Core Conflict</p>
              <p>Amara carries a genetic sequence no modern human should possess — which makes her the first person since Enoch capable of standing before the Council. Between Azazel’s dangerous love for humanity and the Council’s scheduled reset, she must decide who speaks for Earth.</p>
            </article>
          </div>
          <div className="burning-question">
            <Quote size={28} />
            <p>If the Flood was a reset — what makes us think we passed the retest?</p>
          </div>
        </Reveal>
      </section>

      <section className="cast section-pad" id="cast">
        <Reveal><SectionHeading eyebrow="The Ensemble" title="Humans. Watchers. Council. Nephilim." /></Reveal>
        <div className="character-gallery">
          {characters.map((character, index) => (
            <Reveal className={`character-profile ${index % 2 === 1 ? "profile-reverse" : ""}`} key={character.name}>
              <div className="profile-portrait">
                {character.video ? (
                  <ProfileVideo src={character.video} poster={character.image} label={`${character.name} character video`} />
                ) : character.image ? (
                  <img src={character.image} alt={`${character.name}, ${character.archetype}`} />
                ) : (
                  <div className="profile-placeholder" aria-label={`9 by 16 portrait placeholder for ${character.name}`}>
                    <span className="profile-crown"><img src={logoSrc} alt="" /></span>
                    <strong>9:16</strong>
                    <small>Character Portrait</small>
                    <em>{character.name}</em>
                  </div>
                )}
                <span className="portrait-slot-label">{character.video ? "Character film · 9:16" : "Character portrait · 9:16"}</span>
              </div>
              <div className="character-copy profile-copy">
                <span className="profile-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{character.archetype}</p>
                <h3>{character.name}</h3>
                <p className="role">{character.role}</p>
                <div className="cast-credit">
                  <span>Portrayed by</span>
                  <strong>{character.actor}</strong>
                  <div className="cast-links">
                    {character.socials.map((social) => <a href={social.url} target="_blank" rel="noreferrer" key={social.label}>{social.label} <ArrowUpRight size={12} /></a>)}
                  </div>
                </div>
                {character.audio && (
                  <button className={`character-audio ${activeAudio === character.name ? "is-playing" : ""}`} type="button" onClick={() => toggleCharacterAudio(character)}>
                    <span className="audio-icon">{activeAudio === character.name ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</span>
                    <span>{activeAudio === character.name ? "Pause character voiceover" : "Play character voiceover"}</span>
                    <i aria-hidden="true"><b /><b /><b /><b /></i>
                  </button>
                )}
                <p>{character.description}</p>
                <div className="season-journey"><span>Season Journey</span><strong>{character.journey}</strong></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <AvaSection onConversationStart={pauseThemeForAva} onConversationEnd={resumeThemeAfterAva} />

      <section className="format section-pad section-tint" id="format">
        <Reveal className="format-layout">
          <div className="phone-art">
            {MEDIA.coverVideo ? (
              <ProfileVideo src={MEDIA.coverVideo} label={`${DECK.title} vertical cover video`} className="vertical-cover-video" />
            ) : (
              <div className="media-placeholder cover-placeholder"><strong>9:16</strong><span>Cover video</span><small>Set MEDIA.coverVideo</small></div>
            )}
            <span className="phone-glow" />
          </div>
          <div className="format-copy">
            <SectionHeading eyebrow="Visual Format" title="The 9:16 Experience" />
            <p className="lede">Composed vertical-first for the scroll, framed to recut clean into 16:9 for streaming. Every episode is engineered around faces, revelation, and the intimacy of a screen held six inches away.</p>
            <div className="format-points">
              {[
                ["Close-up economy", "Golden star-maps turning inside a Watcher’s eyes — built for vertical framing."],
                ["Five-second hooks", "Every episode opens on an impossible image that stops the thumb."],
                ["Myth-to-modern whiplash", "3200 BC Mount Hermon smash-cuts to 2037 orbital stations."],
                ["Cliffhanger doctrine", "Each episode ends on a question the next one is forced to answer."],
              ].map(([title, copy], index) => (
                <div className="format-point" key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
            <div className="format-metrics">
              <div><strong>9:16</strong><span>native frame</span></div>
              <div><strong><AnimatedNumber value={8} /></strong><span>episodes</span></div>
              <div><strong><AnimatedNumber value={8} suffix="m" /></strong><span>per episode</span></div>
              <div><strong><AnimatedNumber value={64} suffix="m" /></strong><span>season story</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="screenplay section-pad" id="episodes">
        <Reveal>
          <SectionHeading eyebrow="The Words That Open the Vault" title="The First Two Episodes" />
          <div className="screenplay-toolbar">
            <p>Two complete episode blueprints — each built on an impossible cold open, a revelation that recontextualizes scripture, and a hard cliffhanger.</p>
          </div>
          <p className="script-credit">Developed from the Book of Enoch &amp; ancient Mesopotamian sources · Created &amp; written by <strong>Tariq Bey</strong></p>
        </Reveal>
        <div className="episode-scripts">
          {episodeScripts.map((ep) => (
            <Reveal className="script-block" key={ep.tag}>
              <div className="script-tag">
                <span className="script-tag-label">{ep.tag}</span>
                <strong>{ep.title}</strong>
                <em>{ep.runtime}</em>
              </div>
              <div className="script-page"><pre>{ep.body}</pre></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="beats section-pad section-tint">
        <Reveal>
          <SectionHeading eyebrow="The Mythology" title="Six Truths the Canon Buried" />
          <div className="beats-toolbar">
            <p>The engine of the series — six revelations, each one bigger than the last, each one making the problem worse.</p>
          </div>
        </Reveal>
        <div className="beat-grid">
          {pillars.map(([number, title, copy]) => (
            <Reveal className="beat" key={number}>
              <p className="eyebrow episode-number">{number}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="season section-pad">
        <Reveal><SectionHeading eyebrow="Season Architecture" title="Season One · Eight Episodes" /></Reveal>
        <div className="season-arcs">
          {seasonArcs.map((arc) => (
            <Reveal className="season-arc" key={arc.number}>
              <span className="arc-number">{arc.number}</span>
              <span className="arc-episodes">{arc.episodes}</span>
              <h3>{arc.title}</h3>
              <p>{arc.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="comparables section-pad section-tint">
        <Reveal><SectionHeading eyebrow="Market Positioning" title="Familiar Appetite. Fresh Power Center." /></Reveal>
        <div className="comparable-grid">
          {comparables.map(({ title, copy, image }, index) => (
            <Reveal className="comparable" key={title}>
              <div className="comparable-cover">
                {image ? (
                  <img className="comparable-poster" src={image} alt={`${title} tonal comparable artwork`} />
                ) : (
                  <div className="media-placeholder"><strong>9:16</strong><small>Poster</small></div>
                )}
                <span className="cover-number">0{index + 1}</span>
                <span className="cover-label">Tonal Comparable</span>
              </div>
              <div className="comparable-copy">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="proof section-pad portrait-evidence" id="proof">
        <Reveal><SectionHeading eyebrow="Audience & Analytics" title="Who Watches?" /></Reveal>
        <div className="audience-grid">
          <Reveal className="audience-panel"><p className="eyebrow">Primary Audience</p><h3><span className="audience-kind">Black sci-fi &amp; mystery fans</span><span className="audience-range">18–44</span></h3><p>The audience that made Watchmen, Lovecraft Country, and Black Panther era-defining — hungry for prestige genre stories with our faces at the center.</p><strong>Core viewer</strong></Reveal>
          <Reveal className="audience-panel"><p className="eyebrow">Ancient-Mystery Audience</p><h3><span className="audience-kind">Enoch / Anunnaki content viewers</span><span className="audience-range">25–49</span></h3><p>Billions of views across YouTube and TikTok for Book of Enoch, Watchers, and ancient-astronaut content — a pre-built awareness engine most originals spend millions to fake.</p><strong>Pre-built demand</strong></Reveal>
          <Reveal className="audience-panel"><p className="eyebrow">Secondary Audience</p><h3><span className="audience-kind">Prestige sci-fi bingers</span><span className="audience-range">18–49</span></h3><p>The 3 Body Problem / Arrival / Dark audience — viewers who binge cerebral first-contact mythology and evangelize it.</p><strong>Genre expansion</strong></Reveal>
        </div>
        <DemographicCharts />
        <div className="analytics-rail">
          {[
            { value: 4.2, prefix: "", suffix: "B+", decimals: 1, label: "ancient-mystery views" },
            { value: 37, label: "designed characters" },
            { value: 8, label: "episodes · season one" },
            { value: 2, label: "timelines · 3200 BC / 2037" },
            { value: 4, label: "standing worlds" },
            { value: 1, label: "warning left behind" },
          ].map(({ value, prefix, suffix, decimals, label }) => (
            <Reveal className="analytic" key={label}><strong><AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} /></strong><span>{label}</span></Reveal>
          ))}
        </div>
        <p className="source-note">Market context: platform engagement and view figures are directional estimates from public platform data — refresh with current citations before submission.</p>
      </section>

      <section className="production section-pad section-tint">
        <Reveal><SectionHeading eyebrow="Production Intelligence" title="Four Rooms. One Empire." /></Reveal>
        <div className="location-list">
          {[
            ["01", "The Excavation", "The Dead Sea chamber — practical set with LED-volume depth extensions"],
            ["02", "The Archive", "Elias Vale’s hidden underground library of manuscripts and artifacts"],
            ["03", "The Council Chamber", "A single LED-volume build serving every orbital and celestial scene"],
            ["04", "The City", "Modern exteriors, labs, and government interiors — the human world"],
          ].map(([number, location, functionText]) => (
            <Reveal className="location" key={number}><span>{number}</span><h3>{location}</h3><p>{functionText}</p></Reveal>
          ))}
        </div>
        <Reveal className="production-statement">Four reusable worlds — one practical, one library, one volume stage, one city unit — deliver a cosmic-scale look on a contained-series schedule.</Reveal>
      </section>

      <section className="submission section-pad danger-section" id="submission">
        <Reveal>
          <SectionHeading eyebrow="Industry Standards" title="Built to Clear the Gate" />
          <div className="compliance-badge"><ShieldCheck size={20} /> Core submission criteria built into the concept</div>
        </Reveal>
        <div className="check-columns">
          {[
            ["Story & Format", "Cold-open hook every episode", "Cliffhanger doctrine throughout", "Serialized 8-episode arc", "Vertical-first, 16:9-ready coverage"],
            ["Audience & Genre", "Afrofuturist prestige casting", "Pre-built ancient-mystery demand", "Clear genre pillars & comps", "Full character bible with 37 designs"],
            ["Production Viability", "Four standing worlds", "Complete key art & motion package", "Voice-cast character reel delivered", "Public-domain source material"],
          ].map(([title, ...items]) => (
            <Reveal className="check-column" key={title}>
              <h3>{title}</h3>
              {items.map((item) => <p key={item}><Check size={16} /> {item}</p>)}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="franchise section-pad section-tint franchise-sealed">
        <Reveal className="franchise-layout">
          <div>
            <SectionHeading eyebrow="Proven Intellectual Property" title="A Franchise With Proof" />
            <p className="lede"><strong>{DECK.title}: {DECK.titleEm}</strong> is built on the most famous banned book in history — public-domain source material with centuries of mystique and a modern audience already consuming it in the billions of views. Not a cold launch: an adaptation of a story the internet never stopped arguing about.</p>
            <div className="sales-table">
              {[["Source text", "Public domain · zero IP cost"], ["YouTube / TikTok topic views", "4.2B+ and climbing"], ["Character bible", "37 fully designed cast members"], ["Key art & motion package", "Delivered · 38 animations"], ["Voice reel", "37 narrated character spots"]].map(([format, consumption]) => <div key={format}><span>{format}</span><strong>{consumption}</strong></div>)}
            </div>
          </div>
          <div className="franchise-callout">
            <img src={logoSrc} alt="" />
            <strong><AnimatedNumber value={4.2} suffix="B+" decimals={1} /></strong>
            <span>topic views · pre-built demand</span>
            <p>Story. Mythology. Audience. Advantage.</p>
          </div>
        </Reveal>
      </section>

      <section className="proposal section-pad section-tint" id="proposal">
        <Reveal>
          <SectionHeading eyebrow="The Proposal" title="Three Houses. One Revelation." />
          <p className="lede"><strong>Book of Enoch: The Watchers</strong> is proposed as a first-of-its-kind alliance between <strong>Jetson Life AI Studios</strong>, <strong>BlackMagik363</strong>, and <strong>4BiddenKnowledge / Billy Carson</strong> — the knowledge, the engine, and the network for the biggest story the conscious community has ever put on screen.</p>
        </Reveal>
        <div className="beat-grid" id="partners">
          <Reveal className="beat">
            <p className="eyebrow episode-number">01</p>
            <h3>4BiddenKnowledge — Billy Carson</h3>
            <p>The source and the standard-bearer. This entire series is built on the scholarship Billy Carson spent two decades putting in front of the world — the Anunnaki, the Emerald Tablets, the Book of Enoch itself. He brings the mythology, the credibility, the audience, and a streaming platform with 87,000+ paying subscribers to premiere it on.</p>
          </Reveal>
          <Reveal className="beat">
            <p className="eyebrow episode-number">02</p>
            <h3>Jetson Life AI Studios — Tariq Bey</h3>
            <p>The engine. Jetson Life brings the AI-native production infrastructure that already built this entire package — 37 designed characters, key art, motion posters, voice-cast character reel, and this pitch experience — at a speed and cost no traditional studio can touch. Jetson Life executes production of the full season.</p>
          </Reveal>
          <Reveal className="beat">
            <p className="eyebrow episode-number">03</p>
            <h3>BlackMagik363 — Brother Rich</h3>
            <p>The network. Brother Rich built one of the most influential channels in the conscious community — hundreds of thousands of subscribers, award-winning films on the conscious circuit, and a direct line to exactly the audience this story was written for. BlackMagik363 leads promotion and drives the launch.</p>
          </Reveal>
        </div>
        <div className="story-grid" id="why-billy">
          <article>
            <p className="eyebrow">Why Billy Carson</p>
            <p>Nobody on Earth is more qualified to put their name over this title. Billy Carson is the founder and CEO of 4BiddenKnowledge Inc. and 4BiddenKnowledge TV — a conscious streaming network on Apple TV, Roku, Fire TV and every major app store, profitable since year one with eighty-seven thousand plus paying monthly subscribers. He is the best-selling author of <strong>Compendium of the Emerald Tablets</strong>, the expert host of <strong>Anunnaki: Ancient Secrets Revealed</strong>, holds certificates from M.I.T. in neuroscience and Harvard in ancient civilizations, and has spent twenty years decoding the exact texts this series dramatizes. The Watchers, the Flood-as-reset, Enoch as humanity&apos;s first emissary — audiences already know this mythology <em>because Billy Carson taught it to them</em>. His name over the title is not a credit. It is the certification.</p>
          </article>
          <article>
            <p className="eyebrow">The Proven Playbook</p>
            <p>Billy has already done what this proposal calls for — twice. 4BiddenKnowledge has run successful regulated equity crowdfunding raises, including a 2021 round at a $20M pre-money valuation and 2024 rounds on TruCrowd and DealMaker Securities at a $50M valuation — capital raised directly from the community his content built. That is exactly the muscle this project taps: a fanbase that doesn&apos;t just watch, but <strong>invests</strong>. We respect that track record, and this structure is modeled on it.</p>
          </article>
        </div>
        <Reveal>
          <div className="analytics-rail" id="money-numbers">
            {[
              { value: 150, prefix: "$", suffix: "K", label: "the raise — production, marketing & operating capital" },
              { value: 9.99, prefix: "$", decimals: 2, label: "season pass — episode 1 free" },
              { value: 100, suffix: "K", label: "target season unlocks" },
              { value: 999, prefix: "$", suffix: "K", label: "gross at target (before marketing)" },
            ].map(({ value, prefix, suffix, decimals, label }) => (
              <Reveal className="analytic" key={label}><strong><AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} /></strong><span>{label}</span></Reveal>
            ))}
          </div>
        </Reveal>
        <div className="story-grid" id="revenue-model">
          <article>
            <p className="eyebrow">The Raise — $150,000</p>
            <p>We raise <strong>$150,000 together</strong> — enough to produce the full season, market the launch properly, and hold operating capital, without giving the project away to outside money. The raise combines direct partnership capital from the three houses with a <strong>regulated equity crowdfund</strong> modeled on 4BiddenKnowledge&apos;s own successful raises — letting the community that made this mythology mainstream own a piece of the story it built.</p>
          </article>
          <article>
            <p className="eyebrow">How the Money Comes Back</p>
            <p><strong>Episode 1 is free</strong> — everywhere. YouTube, 4BiddenKnowledge TV, BlackMagik363, every social channel — a theatrical-grade pilot as the funnel. Episodes 2–8 live behind a <strong>$9.99 season pass</strong> on the platform. At 100,000 unlocks that is roughly <strong>$1M gross</strong> against a $150K all-in budget — before merchandise, licensing, and Season Two. The audience already exists; all three houses are simply pointing it at the same door.</p>
          </article>
        </div>
        <div className="burning-question">
          <Quote size={28} />
          <p>The community built the audience. The community funds the story. The community owns the win.</p>
        </div>
      </section>

      <section className="contact section-pad section-tint" id="contact">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Licensing & Partnerships" />
          <p className="contact-intro">For licensing, distribution, and partnership inquiries regarding <strong>{DECK.brand}</strong>, contact the representative below.</p>
          <div className="contact-grid">
            <article>
              <p className="eyebrow">Legal Representation</p>
              <h3>Jetson Life Studios</h3>
              <a href="mailto:drpaydex@gmail.com">drpaydex@gmail.com <ArrowUpRight size={15} /></a>
            </article>
            <article>
              <p className="eyebrow">Production Company</p>
              <h3>{DECK.presents}</h3>
              <p>AI-native studio development — story, character design, key art, motion, and voice, delivered as one pipeline.</p>
            </article>
            <article>
              <p className="eyebrow">Executive Producer</p>
              <h3>Tariq Bey</h3>
              <p>Creator, executive producer, and rights holder for the Book of Enoch: The Watchers series package.</p>
              <a href="tel:+14044539986">404-453-9986 <ArrowUpRight size={15} /></a>
              <a href="mailto:realjetsonlife@gmail.com">realjetsonlife@gmail.com <ArrowUpRight size={15} /></a>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="closing section-pad">
        <Reveal>
          <img className="closing-logo" src={logoSrc} alt={DECK.presents} />
          <p className="eyebrow">The Watchers Are Returning</p>
          <h2>The heavens kept a record.<br /><em>We just learned to read it.</em></h2>
          <p>{DECK.tagline}</p>
          <div className="closing-actions">
            <a className="button-primary" href="#top">Back to top <ArrowUpRight size={16} /></a>
            <a className="button-ghost" href="#episodes">View scripts <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="brand footer-brand"><img src={logoSrc} alt="" /><span>{DECK.brand}</span></div>
        <p>Prestige Sci-Fi Event Series · 8 × 8 minutes · 9:16 → 16:9</p>
        <a href="#top">Return to the top <Play size={13} /></a>
      </footer>
      <div className="site-copyright">{DECK.copyright}</div>
    </main>
  );
}

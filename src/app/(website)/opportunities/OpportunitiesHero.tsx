"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Briefcase, CalendarCheck, Check, GraduationCap, MapPin, Sparkles } from "lucide-react";

import ps from "@/components/website/ProductPageTemplate.module.css";

import h from "./opportunitiesHero.module.css";

// Opportunities hero: headline, location search and proof on the left; on the right a job seeker inside a
// slowly turning orbit, with the journey CleverLN supports (new match -> resume shortlisted -> interview
// scheduled) as floating cards.
// The cards are an illustration of the flow, not live listings.

// Shown until (or unless) the visitor's own city comes back from /api/location.
const DEFAULT_CITY = "Bangalore";

const WORDS = ["Jobs", "Freelancing", "Guidance"];

// Proof, using numbers already shown elsewhere on the site.
const HERO_STATS = [
  { value: "20000+", label: "Jobs listed this year" },
  { value: "2K+", label: "Students registered" },
  { value: "519+", label: "Universities trust us" },
];

// Sample matches for the illustration: roles CleverLN trains for, in cities CleverLN serves.
const MATCHES = [
  { role: "UI/UX Designer", meta: "Bangalore · Full-time" },
  { role: "Python Developer", meta: "Chennai · Internship" },
  { role: "Digital Marketer", meta: "Coimbatore · Freelance" },
  { role: "HR Analyst", meta: "Bangalore · Full-time" },
];

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Staggered entrance: each element rises in a little after the previous one.
const step = (i: number) => ({ "--d": `${i * 90}ms` }) as CSSProperties;

function parseStat(value: string) {
  const m = value.match(/^(\d+)(.*)$/);
  return m ? { n: Number(m[1]), suffix: m[2] } : { n: 0, suffix: value };
}

export default function OpportunitiesHero() {
  const [place, setPlace] = useState(DEFAULT_CITY);
  const [word, setWord] = useState(0);
  const [match, setMatch] = useState(0);
  const [progress, setProgress] = useState(1);

  // the highlighted word in "Jobs. Freelancing. Guidance" and the sample match both cycle
  useEffect(() => {
    if (reducedMotion()) return;
    const words = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 1800);
    const matches = setInterval(() => setMatch((m) => (m + 1) % MATCHES.length), 3200);
    return () => {
      clearInterval(words);
      clearInterval(matches);
    };
  }, []);

  // the visitor's city, from the hosting platform (see api/location); Bangalore when it isn't known
  useEffect(() => {
    let active = true;
    fetch("/api/location")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { city?: string | null } | null) => {
        if (active && d?.city) setPlace(d.city);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // stats count up from zero once, while they rise into view
  useEffect(() => {
    if (reducedMotion()) return;
    const start = performance.now() + 450;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, Math.max(0, (now - start) / 1400));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const current = MATCHES[match];

  return (
    <section className={h.hero}>
      <div className={h.inner}>

        {/* ================= COPY ================= */}
        <div className={h.copy}>

          <h1 className={`${ps.proheroHeading} ${h.heading}`} style={step(0)}>
            Meet{" "}
            <span className={h.highlight}>Opportunities</span>
          </h1>

          <p className={`${ps.proheroSubtext} ${h.sub}`} style={step(1)}>
            {WORDS.map((w, i) => (
              <span key={w} className={i === word ? h.wordActive : h.word}>{w}.</span>
            ))}
            — CleverLN.
          </p>

          {/* search bar: the visitor's location + apply */}
          <div className={h.search} style={step(2)}>
            <div className={h.searchField}>
              <span className={h.searchPin} aria-hidden="true">
                <MapPin size={18} strokeWidth={2.2} />
              </span>
              <span className={h.searchText}>
                <span className={h.searchLabel}>Location</span>
                <span className={h.searchValue}>{place}</span>
              </span>
            </div>
            <button
              type="button"
              className={`${ps.proheroPrimaryBtn} ${h.apply}`}
              onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            >
              Apply Now
            </button>
          </div>

          <ul className={h.stats} style={step(3)}>
            {HERO_STATS.map((stat) => {
              const { n, suffix } = parseStat(stat.value);
              return (
                <li key={stat.label}>
                  <strong aria-label={stat.value}>{Math.round(n * progress)}{suffix}</strong>
                  <span>{stat.label}</span>
                </li>
              );
            })}
          </ul>

        </div>

        {/* ================= VISUAL ================= */}
        <div className={h.visual} aria-hidden="true">

          <div className={h.orbit}>
            <span className={`${h.orbitChip} ${h.chipTop}`}><Briefcase size={18} strokeWidth={2} /></span>
            <span className={`${h.orbitChip} ${h.chipLeft}`}><GraduationCap size={18} strokeWidth={2} /></span>
            <span className={`${h.orbitChip} ${h.chipRight}`}><MapPin size={18} strokeWidth={2} /></span>
          </div>

          <Image
            src="/images/opportunities/job-seeker.webp"
            alt=""
            width={1197}
            height={1127}
            priority
            sizes="(max-width: 900px) 420px, 560px"
            className={h.person}
          />

          <div className={`${h.cardWrap} ${h.cardMatch}`}>
            <div className={h.card}>
              <span className={`${h.cardIcon} ${h.iconMint}`}><Sparkles size={16} strokeWidth={2.2} /></span>
              <div key={match} className={h.matchBody}>
                <span className={h.cardLabel}>New job match</span>
                <strong>{current.role}</strong>
                <span className={h.cardMeta}>{current.meta}</span>
              </div>
              <span className={h.applyPill}>Apply</span>
            </div>
          </div>

          <div className={`${h.cardWrap} ${h.cardShortlist}`}>
            <div className={h.card}>
              <span className={`${h.cardIcon} ${h.iconGreen}`}>
                <Check size={16} strokeWidth={3} />
              </span>
              <div>
                <strong>Resume shortlisted</strong>
                <span className={h.cardMeta}>Recruiter viewed your profile</span>
              </div>
            </div>
          </div>

          <div className={`${h.cardWrap} ${h.cardInterview}`}>
            <div className={h.card}>
              <span className={`${h.cardIcon} ${h.iconAmber}`}><CalendarCheck size={16} strokeWidth={2.2} /></span>
              <div>
                <strong>Interview scheduled</strong>
                <span className={h.cardMeta}>Monday · 11:00 AM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

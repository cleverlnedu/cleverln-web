"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  CalendarClock,
  Check,
  Hand,
  Laptop,
  MessageCircleQuestion,
  MessageSquare,
  Mic,
  MonitorPlay,
  SendHorizontal,
} from "lucide-react";

import ps from "@/components/website/ProductPageTemplate.module.css";
import w from "./workshops.module.css";

// Workshops coming soon: the copy on the left, and on the right a preview of a live workshop (an expert
// on stage, a Q&A chat that keeps moving, learners joining), then how a workshop will run.
// The chat is a mock-up: no names, counts or dates are presented as real.

const POINTS = ["Live and interactive", "Hands-on, step by step", "Led by industry experts"];

type Message = { from: "learner" | "expert"; name: string; text: string };

const CHAT: Message[] = [
  { from: "learner", name: "A", text: "How do I make my portfolio stand out?" },
  { from: "expert", name: "Expert", text: "Show your process, not just the result. Let’s build one live." },
  { from: "learner", name: "R", text: "Can we try it on our own project?" },
  { from: "expert", name: "Expert", text: "Yes! Open your file and follow along with me." },
  { from: "learner", name: "S", text: "This is so helpful, thank you!" },
];

const VISIBLE = 3;

const STEPS = [
  { icon: CalendarCheck, title: "Pick a workshop", text: "Choose a topic from the skills you want to grow." },
  { icon: MonitorPlay, title: "Join live", text: "Learn in a live, interactive session with an industry expert." },
  { icon: Laptop, title: "Build with the expert", text: "Work hands-on alongside them, one step at a time." },
  { icon: MessageCircleQuestion, title: "Ask anything", text: "Live Q&A, so you leave with answers, not just notes." },
];

const AVATARS = [
  { letter: "A", color: "#f4b740" },
  { letter: "R", color: "#5b8def" },
  { letter: "S", color: "#e86f8a" },
  { letter: "K", color: "#16a37a" },
];

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// entrance delay for the copy, one step after another
const step = (i: number) => ({ "--d": `${0.08 + i * 0.1}s` }) as CSSProperties;

export default function WorkshopsView() {
  // how many chat messages have arrived; the window shows the last three
  const [sent, setSent] = useState(VISIBLE);

  useEffect(() => {
    if (reducedMotion()) return;
    const timer = window.setInterval(() => setSent((n) => n + 1), 2600);
    return () => window.clearInterval(timer);
  }, []);

  const shown = Array.from({ length: VISIBLE }, (_, k) => {
    const id = sent - VISIBLE + k;
    return { id, ...CHAT[id % CHAT.length] };
  });

  return (
    <main className={w.page}>

      {/* ================= HERO ================= */}
      <section className={w.hero}>
        <div className={w.inner}>

          <div className={w.copy}>
            <p className={w.eyebrow} style={step(0)}>
              <span className={w.eyebrowDot} aria-hidden="true" />
              Workshops · Coming soon
            </p>

            <h1 className={w.title} style={step(1)}>
              Learn live from the people who <span>do the work.</span>
            </h1>

            <p className={w.sub} style={step(2)}>
              Hands-on workshops with industry experts, behind-the-scenes sessions and live Q&amp;A are on
              their way. We’re putting the finishing touches on them.
            </p>

            <div className={w.actions} style={step(3)}>
              <Link href="/courses" className={`${ps.proheroPrimaryBtn} ${w.btn}`}>
                Explore courses
              </Link>
              <Link href="/help-center" className={`${ps.proheroSecondaryBtn} ${w.btn}`}>
                Talk to our team
              </Link>
            </div>

            <ul className={w.points} style={step(4)}>
              {POINTS.map((point) => (
                <li key={point}>
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* preview of a live workshop (decorative) */}
          <div className={w.visual} aria-hidden="true">
            <div className={w.window}>

              <div className={w.bar}>
                <span className={w.barDots}><i /><i /><i /></span>
                <span className={w.barTitle}>CleverLN Workshop</span>
                <span className={w.live}><span className={w.liveDot} />LIVE</span>
              </div>

              <div className={w.stage}>
                <div className={w.speaker}>
                  <Image
                    src="/images/course-heroes/plum.webp"
                    alt=""
                    width={1133}
                    height={1200}
                    priority
                    sizes="(max-width: 600px) 260px, 300px"
                    className={w.expert}
                  />
                  <div className={w.nameTag}>
                    <span className={w.wave}><i /><i /><i /><i /></span>
                    <span>
                      <strong>Industry expert</strong>
                      <small>Hosting live</small>
                    </span>
                  </div>
                </div>

                <div className={w.chat}>
                  <p className={w.chatHead}>
                    <MessageSquare size={13} strokeWidth={2.4} />
                    Live Q&amp;A
                  </p>
                  <div className={w.messages}>
                    {shown.map((message) => (
                      <div
                        key={message.id}
                        className={`${w.message} ${message.from === "expert" ? w.messageExpert : ""}`}
                      >
                        <span className={w.messageAvatar}>{message.from === "expert" ? "E" : message.name}</span>
                        <p>{message.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className={w.chatInput}>
                    <span>Ask a question…</span>
                    <SendHorizontal size={14} strokeWidth={2.4} />
                  </div>
                </div>
              </div>

              <div className={w.controls}>
                <div className={w.people}>
                  <span className={w.avatars}>
                    {AVATARS.map(({ letter, color }) => (
                      <span key={letter} style={{ background: color }}>{letter}</span>
                    ))}
                  </span>
                  <small>Learners joining</small>
                </div>
                <div className={w.buttons}>
                  <span><Mic size={15} strokeWidth={2.2} /></span>
                  <span className={w.raised}><Hand size={15} strokeWidth={2.2} /></span>
                  <span><MessageSquare size={15} strokeWidth={2.2} /></span>
                </div>
              </div>
            </div>

            <div className={w.seats}>
              <span className={w.seatsIcon}><CalendarClock size={18} strokeWidth={2.2} /></span>
              <span>
                <strong>Seats opening soon</strong>
                <small>Dates will be announced here</small>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WILL WORK ================= */}
      <section className={w.how}>
        <div className={w.howInner}>
          <h2 className={w.howTitle}>How a CleverLN workshop works</h2>
          <p className={w.howSub}>Short, focused sessions built around doing, not just watching.</p>

          <ol className={w.steps}>
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className={w.stepCard}>
                <span className={w.stepTop}>
                  <span className={w.stepIcon}><Icon size={20} strokeWidth={2} /></span>
                  <span className={w.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  );
}

import useTitleAnimation from "../Animation/useTitleAnimation";
import "./style.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ACTION_URL =
  "https://public.herotofu.com/v1/4ef9cee0-7c44-11f0-92ff-11e2bc736dd8";

const ST = () =>
  window.innerWidth < 1100 ? { scroller: ".scroll-container" } : {};

const FormSection = () => {
  useTitleAnimation();
  const navigate = useNavigate();
  const [budget, setBudget] = useState("5000–10000");
  const [isLoading, setIsLoading] = useState(false);
  const phoneRef = useRef(null);

  const sanitizePhone = (v) => {
    const cleaned = v.replace(/[^\d()+\- ]/g, "");
    const noPluses = cleaned.replace(/\+/g, "");
    return "+" + noPluses;
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    data.append("_subject", "New project inquiry");
    data.append("page", window.location.href);

    try {
      setIsLoading(true);
      const res = await fetch(ACTION_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      navigate("/sent");
    } catch {
      form.submit();
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form form",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".form",
            start: "top 85%",
            ...ST(),
          },
        },
      );
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => ctx.revert();
  }, []);

  return (
    <section className="form" id="connect">
      <div className="container">
        <div className="form__wrapper">
          <h3 className="form-title-top">Let’s start the conversation</h3>
          <h2 className="form-title animation-title">Great design </h2>
          <h3 className="form-title-middle">starts with</h3>
          <h2 className="form-title animation-title">great collaboration</h2>
        </div>

        <form
          onSubmit={onSubmit}
          action={ACTION_URL}
          method="POST"
          acceptCharset="UTF-8"
        >
          <div className="form-fields">
            <input
              type="text"
              name="name"
              placeholder="your name*"
              autoComplete="name"
              required
            />

            <input
              ref={phoneRef}
              type="tel"
              name="phone"
              placeholder="phone*"
              autoComplete="tel"
              inputMode="tel"
              required
              pattern="^\+[0-9()\-\s]{6,}$"
              title="Start with +, then digits, spaces, ( ) - (min 7 chars)"
              onFocus={(e) => {
                const el = e.currentTarget;
                if (!el.value || !el.value.startsWith("+")) {
                  el.value = "+";
                  requestAnimationFrame(() => {
                    const len = el.value.length;
                    el.setSelectionRange(len, len);
                  });
                }
              }}
              onInput={(e) => {
                const el = e.currentTarget;
                const pos = el.selectionStart || 0;
                el.value = sanitizePhone(el.value);
                if (pos > 1 && el.value.length >= pos) {
                  try {
                    el.setSelectionRange(pos, pos);
                  } catch {}
                }
              }}
              onKeyDown={(e) => {
                const el = e.currentTarget;

                if (
                  (e.key === "Backspace" &&
                    el.selectionStart === 1 &&
                    el.selectionEnd === 1) ||
                  (e.key === "Delete" &&
                    el.selectionStart === 0 &&
                    el.selectionEnd === 0)
                ) {
                  e.preventDefault();
                }
              }}
              onBlur={(e) => {
                const el = e.currentTarget;
                const digits = el.value.replace(/\D/g, "");
                if (digits.length === 0) {
                  el.value = "";
                }
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="your email*"
              autoComplete="email"
              required
            />

            <textarea
              name="message"
              placeholder="How can I help you"
              required
            ></textarea>

            <h4>project budget (usd)</h4>
            <div className="budget">
              <div
                className="budget__wrapper"
                onChange={(e) => {
                  if (e.target.name === "budget") setBudget(e.target.value);
                }}
              >
                <label
                  className={
                    budget === "5000–10000" ? "is-active-radio" : undefined
                  }
                >
                  <input
                    type="radio"
                    name="budget"
                    value="5000–10000"
                    required
                    defaultChecked
                  />
                  <span>5k-10k</span>
                </label>
                <label
                  className={
                    budget === "10000–20000" ? "is-active-radio" : undefined
                  }
                >
                  <input type="radio" name="budget" value="10000–20000" />
                  <span>10k-20k</span>
                </label>
                <label
                  className={budget === "More" ? "is-active-radio" : undefined}
                >
                  <input type="radio" name="budget" value="More" />
                  <span>more</span>
                </label>
              </div>
            </div>
          </div>

          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />

          <button className="link-line" type="submit" disabled={isLoading}>
            {isLoading ? "Sending…" : "Discuss the project"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104"
                stroke="#101010"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormSection;

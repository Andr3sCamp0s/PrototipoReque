"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { supabase } from "@/config/supabase";

export default function Home() {
  const [status, setStatus] = useState("⏳ Probando Supabase...");

  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.auth.getUser();

      // ❌ Error real (no solo "sin sesión")
      if (error && error.name !== "AuthSessionMissingError") {
        console.log("ERROR SUPABASE:", error);
        setStatus("❌ Error real con Supabase");
        return;
      }

      // 🟡 Sin sesión (normal)
      if (!data?.user) {
        console.log("Sin usuario logueado");
        setStatus("🟡 Supabase conectado (sin sesión)");
        return;
      }

      // 🟢 Usuario logueado
      console.log("Usuario:", data.user);
      setStatus("✅ Usuario logueado en Supabase");
    };

    testSupabase();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

      {/* HERO ORIGINAL */}
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "blue" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>

        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex gap-3">
        <a
          className="button button--primary button--md rounded-full"
          href={siteConfig.links.docs}
          target="_blank"
        >
          Documentation
        </a>

        <a
          className="button button--tertiary button--md rounded-full"
          href={siteConfig.links.github}
          target="_blank"
        >
          <GithubIcon size={20} />
          GitHub
        </a>
      </div>

      {/* 🔥 SUPABASE STATUS */}
      <div className="mt-6 p-4 rounded-xl bg-gray-900 text-white shadow-md">
        <h2 className="text-lg font-semibold mb-2">
          Supabase Status
        </h2>

        <p className="text-sm text-gray-300">
          {status}
        </p>
      </div>

    </section>
  );
}
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionDivider } from "@/components/ascii/AsciiDivider";

const statusColors = {
  active: "bg-success/20 text-success border-success/30",
  completed: "bg-info/20 text-info border-info/30",
  upcoming: "bg-warning/20 text-warning border-warning/30",
};

const statusLabels = {
  active: "Active",
  completed: "Completed",
  upcoming: "Upcoming",
};

export function Projects() {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  return (
    <section id="research" className="py-24 px-4 bg-background-subtle">
      {/* Git-style divider at top */}
      <SectionDivider variant="git-simple" spacing="sm" opacity={0.40} animation="slideIn" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="max-w-2xl mb-16"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            className="font-mono text-sm text-accent mb-2 block"
            variants={fadeUp}
          >
            // research
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            variants={fadeUp}
          >
            Active projects
          </motion.h2>
          <motion.p className="text-foreground-secondary text-lg" variants={fadeUp}>
            Our current research initiatives spanning AI, cryptography, and decentralized systems.
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="group p-6 border border-border rounded-lg bg-background
                         hover:border-border-strong hover:scale-[1.02] hover:-translate-y-1
                         transition-all duration-200"
              variants={fadeUp}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background-muted text-foreground-secondary
                                  group-hover:bg-accent-muted group-hover:text-accent
                                  group-hover:scale-110 transition-all duration-200">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-mono rounded border",
                    statusColors[project.status]
                  )}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono text-foreground-muted bg-background-muted rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  View on GitHub
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

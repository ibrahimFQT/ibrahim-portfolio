import { useState } from "react";
import Section from "../layout/Section";
import ProjectRow from "../ui/ProjectRow";
import PreviewCard from "../ui/PreviewCard";
import { projects } from "../../data/projects";

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <Section id="work" number="02" title="Selected work">
      <div className="flex flex-col">
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            onHover={(proj, e) => {
              setHovered(proj);
              setMouse({ x: e.clientX, y: e.clientY });
            }}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
      <PreviewCard project={hovered} mouse={mouse} />
    </Section>
  );
}
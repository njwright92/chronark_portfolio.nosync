"useClient";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="overflow-hidden relative duration-700 border shadow-md rounded-xl hover:bg-zinc-900/10 group md:gap-8 hover:border-zinc-300/40 border-peachFuzz/30"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 shadown-md transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute drop-shadow-md inset-0 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute drop-shadow-md inset-0 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>

      {children}
    </div>
  );
};

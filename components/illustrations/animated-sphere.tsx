export function AnimatedSphere() {
  const particles = [
    { anim: "p-orbit-1", dur: "4s",   radius: 118, size: 7,  color: "#818cf8", glow: "0 0 10px #6366f1, 0 0 20px #6366f1" },
    { anim: "p-orbit-2", dur: "5.5s", radius: 104, size: 5,  color: "#c4b5fd", glow: "0 0 8px #8b5cf6" },
    { anim: "p-orbit-3", dur: "3.8s", radius: 112, size: 6,  color: "#60a5fa", glow: "0 0 9px #3b82f6" },
    { anim: "p-orbit-4", dur: "6.2s", radius: 98,  size: 4,  color: "#f0abfc", glow: "0 0 7px #d946ef" },
  ];

  return (
    <div className="sphere-bounce relative flex items-center justify-center w-80 h-80" aria-hidden="true">

      {/* Ambient outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 68%)",
          animation: "sphere-glow-pulse 3.2s ease-in-out infinite",
        }}
      />

      {/* Pulse ring — outer */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(99,102,241,0.2)",
          animation: "ring-pulse 3.2s ease-in-out infinite",
        }}
      />

      {/* Pulse ring — inner */}
      <div
        className="absolute w-60 h-60 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(129,140,248,0.3)",
          animation: "ring-pulse 3.2s ease-in-out infinite",
          animationDelay: "-1.1s",
        }}
      />

      {/* 3-D orbital ring */}
      <div className="absolute flex items-center justify-center w-52 h-52 pointer-events-none" style={{ perspective: "360px" }}>
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1.5px solid rgba(129,140,248,0.55)",
            boxShadow: "0 0 14px rgba(99,102,241,0.45)",
            animation: "orbit-spin 5s linear infinite",
            transform: "rotateX(72deg)",
          }}
        />
      </div>

      {/* Main sphere body */}
      <div
        className="relative z-10 w-44 h-44 rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, #a5b4fc 0%, #6366f1 32%, #4338ca 62%, #1e1b4b 90%)",
          boxShadow: `
            0 0 55px rgba(99,102,241,0.75),
            0 0 110px rgba(99,102,241,0.35),
            0 0 180px rgba(99,102,241,0.12),
            inset -18px -18px 38px rgba(0,0,0,0.65),
            inset 9px 9px 22px rgba(255,255,255,0.13)
          `,
        }}
      >
        {/* Primary highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "17%", left: "19%",
            width: "38%", height: "26%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.38) 0%, transparent 100%)",
            filter: "blur(3px)",
          }}
        />
        {/* Secondary small highlight */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "21%", right: "17%",
            width: "13%", height: "9%",
            background: "rgba(255,255,255,0.18)",
            filter: "blur(1px)",
          }}
        />
        {/* Surface shimmer lines */}
        <div
          className="sphere-shimmer-line absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
          }}
        />
        <div
          className="sphere-shimmer-line-2 absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* Orbiting particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: `${p.anim} ${p.dur} linear infinite`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: p.glow,
              transform: `translateX(${p.radius}px)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

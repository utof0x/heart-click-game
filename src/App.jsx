import React, { useState } from "react";
import { Heart } from "lucide-react";

const Confetti = () => {
  return Array.from({ length: 100 }).map((_, index) => {
    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 3;
    const randomSize = Math.random() * 10 + 5;

    return (
      <div
        key={index}
        className="fixed w-3 h-3 transform rotate-45"
        style={{
          left: `${randomLeft}%`,
          top: "-20px",
          width: `${randomSize}px`,
          height: `${randomSize}px`,
          backgroundColor:
            index % 3 === 0
              ? "#ff4d6d"
              : index % 3 === 1
                ? "#ffd700"
                : "#4a90e2",
          animation: `fall 3s linear ${randomDelay}s`,
          opacity: 0,
        }}
      />
    );
  });
};

const HeartClickGame = () => {
  const [clicks, setClicks] = useState(0);
  const [showHeart, setShowHeart] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 20) {
      setShowHeart(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const baseSize = 80;
  const growthPerClick = 6;
  const currentSize = baseSize + clicks * growthPerClick;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(45deg);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(405deg);
              opacity: 0;
            }
          }
        `}
      </style>

      <div className="relative w-full h-screen flex items-center justify-center">
        {showConfetti && <Confetti />}

        <div
          onClick={handleClick}
          className="cursor-pointer transform transition-transform hover:scale-110 active:scale-95"
        >
          {showHeart ? (
            <div className="relative flex items-center justify-center">
              <Heart
                size={currentSize}
                color="#ff4d6d"
                fill="#ff4d6d"
                className="animate-pulse transition-all duration-300 ease-in-out"
              />
              <span
                className="absolute select-none text-white font-bold"
                style={{ fontSize: `${Math.min(currentSize / 4, 24)}px` }}
              >
                Click!
              </span>
            </div>
          ) : (
            <div className="text-4xl font-bold text-pink-600 select-none">
              You did it! 💖
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartClickGame;

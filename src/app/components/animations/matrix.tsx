import React, { useEffect, useRef } from 'react';

interface MatrixTextEffectProps {
  text: string;
  onComplete: () => void;
}

const MatrixTextEffect: React.FC<MatrixTextEffectProps> = ({ text, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth / 3;
    canvas.height = window.innerHeight;

    const fontSize = 20;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789@#$%^&*()*&^%".split("");
    const textChars = text.split('');
    let textIndex = 0;
    let textRendered = false;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = textIndex < textChars.length && !textRendered
          ? textChars[textIndex]
          : matrixChars[Math.floor(Math.random() * matrixChars.length)];

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height) {
          if (Math.random() > 0.975) {
            drops[i] = 0;
          }
        } else {
          drops[i]++;
        }

        if (textIndex < textChars.length && !textRendered) {
          textIndex++;
          if (textIndex >= textChars.length) {
            textRendered = true;
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
    };
  }, [text, onComplete]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default MatrixTextEffect;
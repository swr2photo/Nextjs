export const playSound = (soundType: 'happyBirthday' | 'wow' | 'cheer' | 'blow') => {
  // สร้างเสียงด้วย Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  switch (soundType) {
    case 'happyBirthday':
      // ลำดับ: C C D C F E
      playMelody(audioContext, [262, 262, 294, 262, 349, 330], 500);
      break;
    case 'wow':
      playWowSound(audioContext);
      break;
    case 'cheer':
      playCheerSound(audioContext);
      break;
    case 'blow':
      playBlowSound(audioContext);
      break;
  }
};

const playMelody = (ctx: AudioContext, frequencies: number[], duration: number) => {
  const now = ctx.currentTime;
  const noteDuration = duration / 1000;

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = freq;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, now + i * noteDuration);
    gain.gain.exponentialRampToValueAtTime(0.01, now + (i + 1) * noteDuration);
    
    osc.start(now + i * noteDuration);
    osc.stop(now + (i + 1) * noteDuration);
  });
};

const playWowSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.5);
  osc.type = 'sine';
  
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0, now + 0.5);
  
  osc.start(now);
  osc.stop(now + 0.5);
};

const playCheerSound = (ctx: AudioContext) => {
  playMelody(ctx, [330, 392, 494, 587], 400);
};

const playBlowSound = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < buffer.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  
  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  filter.type = 'highpass';
  filter.frequency.value = 2000;
  
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
  
  noise.start(now);
};

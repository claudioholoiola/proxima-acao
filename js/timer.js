export class Timer {
  constructor(current, onTick) { this.current = current; this.onTick = onTick; this.id = null; }
  remaining() { const elapsed = Math.max(0, Math.floor((Date.now() - new Date(this.current.startedAt).getTime()) / 60000)); return Math.max(0, this.current.plannedMinutes - elapsed); }
  elapsed() { return Math.min(this.current.plannedMinutes, Math.max(0, Math.floor((Date.now() - new Date(this.current.startedAt).getTime()) / 60000))); }
  start() { this.stop(); this.onTick(this.remaining(), this.elapsed()); this.id = setInterval(() => this.onTick(this.remaining(), this.elapsed()), 1000); }
  stop() { if (this.id) clearInterval(this.id); this.id = null; }
}

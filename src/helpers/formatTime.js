export function formatTime(time) {
  // Time is a natural number in seconds
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  // Output format is M:SS or 0:33 or 0:05
  return minutes.toString() + ':' + seconds.toString().padStart(2, '0')
}

/**
 * A simple time class for measuring elapsed time in milliseconds.
 *
 * @class Timer
 */
export class Timer {
  /**
   * The timestamp whent he timer stars, recorded using `performance.now()`.
   * @type {number | null}
   * @private
   */
  private startTime: number | null = null;

  /**
   * The timestamp when the timer ends, recorded using `performance.now()`.
   * @type {number | null}
   * @private
   */
  private endTime: number | null = null;

  /**
   * Starts the timer by recording the current timestamp
   *
   * @returns {void}
   */
  public start(): void {
    this.startTime = performance.now();
    this.endTime = null; // reset end time for next use
  }

  /**
   * Stops the timer and calculates the elapsed time in milliseconds.
   *
   * @throws {Error} If the timer was not started before calling `end()`.
   * @returns {number} The elapsed time in milliseconds
   */
  public end(): number {
    if (this.startTime === null) {
      throw new Error("Timer has not been started. Call start() first");
    }
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  }
}

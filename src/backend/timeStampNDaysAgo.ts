class Timestamp {
  private date: Date;
  constructor() {
    this.date = new Date();
  }
  getTimestamp30DaysAgo() {
    return new Date().setDate(this.date.getDate() - 30);
  }
  getTimestamp() {
    return this.date.getTime();
  }
}

export { Timestamp };

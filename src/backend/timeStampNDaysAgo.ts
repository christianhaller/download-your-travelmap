class Timestamp {
  private date: Date;
  constructor() {
    this.date = new Date();
  }
  getTimestampNDaysAgo(days: number) {
    return new Date().setDate(this.date.getDate() - days);
  }
  getTimestamp() {
    return this.date.getTime();
  }
}

export { Timestamp };

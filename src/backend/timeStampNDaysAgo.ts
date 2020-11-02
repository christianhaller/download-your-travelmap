class Timestamp {
  getT() {
    return new Date().setDate(new Date().getDate() - 30);
  }
}

export { Timestamp };

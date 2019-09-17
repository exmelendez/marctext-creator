class BookEntries {
  entries = [];

  addEntry(entry) {
    this.entryVerify(entry)
      ? this.entries.push(entry.data)
      : console.log(`entry error`);
  }

  entryVerify(entry) {
    return entry.propCount > 5;
  }

  get allEntries() {
    return this.entries;
  }
}

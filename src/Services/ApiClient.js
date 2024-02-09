export default class ApiClient {
  constructor(apiUrl) {
    if (!apiUrl) {
      throw new Error('apiUrl is required');
    }

    this.apiUrl = apiUrl;

    if (!this.apiUrl.endsWith('/')) {
      this.apiUrl += '/';
    }
  }

  async getLevel(level) {
    let response = await fetch(`${this.apiUrl}game/${level}`);
    if (!response.ok) {
      return console.error(response.statusText);
    }
    return await response.json();
  }
}
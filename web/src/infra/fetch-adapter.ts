import HttpClient from "./http-client";

export default class FetchAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url)
    return response.json()
  }

  async post(url: string, body: any): Promise<any> {
    const response = await fetch(url, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    return response.json()
  }
}
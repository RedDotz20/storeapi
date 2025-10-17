/**
 * HTTP Client Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only HTTP requests
 * Follows Open/Closed Principle (OCP) - can be extended without modification
 *
 * This service encapsulates all HTTP fetch operations with consistent error handling
 * and configuration management.
 */

import type { IHttpClient, RequestConfig } from "./interfaces/IHttpClient";

export class HttpClient implements IHttpClient {
	private baseURL: string;
	private defaultHeaders: Record<string, string>;

	constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
		this.baseURL = baseURL;
		this.defaultHeaders = {
			"Content-Type": "application/json",
			...defaultHeaders,
		};
	}

	/**
	 * Build full URL with query parameters
	 */
	private buildURL(
		url: string,
		params?: Record<string, string | number>
	): string {
		const fullURL = url.startsWith("http") ? url : `${this.baseURL}${url}`;

		if (!params) return fullURL;

		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			searchParams.append(key, String(value));
		});

		return `${fullURL}?${searchParams.toString()}`;
	}

	/**
	 * Make a fetch request with error handling
	 */
	private async request<T>(
		url: string,
		config: RequestConfig = {}
	): Promise<T> {
		const { headers = {}, method = "GET", body, params } = config;

		const fullURL = this.buildURL(url, params);
		const mergedHeaders = { ...this.defaultHeaders, ...headers };

		try {
			const response = await fetch(fullURL, {
				method,
				headers: mergedHeaders,
				body: body ? JSON.stringify(body) : undefined,
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error("An unknown error occurred");
		}
	}

	/**
	 * GET request
	 */
	async get<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request<T>(url, { ...config, method: "GET" });
	}

	/**
	 * POST request
	 */
	async post<T>(
		url: string,
		data?: unknown,
		config?: RequestConfig
	): Promise<T> {
		return this.request<T>(url, { ...config, method: "POST", body: data });
	}

	/**
	 * PUT request
	 */
	async put<T>(
		url: string,
		data?: unknown,
		config?: RequestConfig
	): Promise<T> {
		return this.request<T>(url, { ...config, method: "PUT", body: data });
	}

	/**
	 * DELETE request
	 */
	async delete<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request<T>(url, { ...config, method: "DELETE" });
	}

	/**
	 * PATCH request
	 */
	async patch<T>(
		url: string,
		data?: unknown,
		config?: RequestConfig
	): Promise<T> {
		return this.request<T>(url, { ...config, method: "PATCH", body: data });
	}

	/**
	 * Update base URL
	 */
	setBaseURL(baseURL: string): void {
		this.baseURL = baseURL;
	}

	/**
	 * Update default headers
	 */
	setDefaultHeaders(headers: Record<string, string>): void {
		this.defaultHeaders = { ...this.defaultHeaders, ...headers };
	}
}

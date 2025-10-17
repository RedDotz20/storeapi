/**
 * HTTP Client Service Interface
 * Follows Interface Segregation Principle (ISP)
 *
 * Defines a contract for HTTP operations, allowing different implementations
 * (fetch, axios, mock client) without changing dependent code.
 */

export interface RequestConfig {
	headers?: Record<string, string>;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	body?: unknown;
	params?: Record<string, string | number>;
}

export interface IHttpClient {
	/**
	 * Make a GET request
	 */
	get<T>(url: string, config?: RequestConfig): Promise<T>;

	/**
	 * Make a POST request
	 */
	post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;

	/**
	 * Make a PUT request
	 */
	put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;

	/**
	 * Make a DELETE request
	 */
	delete<T>(url: string, config?: RequestConfig): Promise<T>;

	/**
	 * Make a PATCH request
	 */
	patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
}

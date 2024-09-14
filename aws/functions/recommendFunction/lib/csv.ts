export function arrayToCSV<T extends Record<string, unknown>>(data: T[]): string {
	if (!data.length) return '';

	const headers = Object.keys(data[0]);

	const csvRows = data.map((obj: Record<string, unknown>) =>
		headers
			.map((header) => JSON.stringify(obj[header], (key, value) => (value === null ? '' : value)))
			.join(',')
	);
	return [headers.join(','), ...csvRows].join('\n');
}

import AnsiToHTML from 'ansi-to-html'
import { useMemo } from 'react'
import { useTheme } from '#app/routes/theme/index.tsx'

export function useAnsiToHtml() {
	const theme = useTheme()
	const ansi = useMemo(
		() =>
			new AnsiToHTML(
				theme === 'dark'
					? { fg: '#d6deeb', bg: '#121318', escapeXML: true }
					: { fg: '#000000', bg: '#f3f3f3', escapeXML: true },
			),
		[theme],
	)
	return ansi
}

// remove this when this is fixed: https://github.com/rburns/ansi-to-html/issues/112
export function stripCursorMovements(data: string) {
	const escapeChar = String.fromCharCode(27)
	return data
		.replaceAll(new RegExp(`${escapeChar}\\[\\d+A`, 'g'), '')
		.replaceAll(new RegExp(`${escapeChar}\\[\\d+K`, 'g'), '')
}

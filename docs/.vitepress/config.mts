import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'ip-kit',
	description: 'Security-first IP resolution for Node.js',

	locales: {
		root: {
			label: 'English',
			lang: 'en',
			link: '/',
			themeConfig: {
				nav: [
					{ text: 'Docs', link: '/getting-started' },
					{
						text: 'GitHub',
						link: 'https://github.com/TeaCoder52/ip-kit',
					},
				],
				sidebar: {
					'/': [
						{
							text: 'Documentation',
							items: [
								{
									text: 'Getting Started',
									link: '/getting-started',
								},
								{ text: 'Express Adapter', link: '/express' },
								{ text: 'Trust Proxy', link: '/trust-proxy' },
							],
						},
					],
				},
			},
		},
		ru: {
			label: 'Русский',
			lang: 'ru',
			link: '/ru/',
			themeConfig: {
				nav: [
					{ text: 'Документация', link: '/ru/getting-started' },
					{
						text: 'GitHub',
						link: 'https://github.com/TeaCoder52/ip-kit',
					},
				],
				sidebar: {
					'/ru/': [
						{
							text: 'Документация',
							items: [
								{
									text: 'Начало работы',
									link: '/ru/getting-started',
								},
								{
									text: 'Express адаптер',
									link: '/ru/express',
								},
								{
									text: 'Trust Proxy',
									link: '/ru/trust-proxy',
								},
							],
						},
					],
				},
			},
		},
	},
})

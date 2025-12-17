import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'ip-kit',
	description: 'Security-first IP resolution for Node.js',
	lang: 'en-US',
	sitemap: {
		hostname: 'https://teacoder52.github.io/ip-kit',
	},
	head: [
		['meta', { name: 'theme-color', content: '#0ea5e9' }],
		['meta', { property: 'og:title', content: 'ip-kit' }],
		[
			'meta',
			{
				property: 'og:description',
				content: 'Security-first IP resolution for Node.js',
			},
		],
	],

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
				socialLinks: [
					{
						icon: 'github',
						link: 'https://github.com/TeaCoder52/ip-kit',
					},
				],
				footer: {
					message: 'Выпущено под лицензией MIT.',
					copyright: '© 2025 TeaCoder',
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
				socialLinks: [
					{
						icon: 'github',
						link: 'https://github.com/TeaCoder52/ip-kit',
					},
				],
				footer: {
					message: 'Released under the MIT License.',
					copyright: '© 2025 TeaCoder',
				},
			},
		},
	},
})

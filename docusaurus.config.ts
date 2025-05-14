import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Pollito's Opinion on Azure",
  tagline: 'Info dump of Azure stuff',
  favicon: 'img/favicon.ico',

  url: 'https://azure.pollito.tech',
  baseUrl: '/',

  organizationName: 'franBec',
  projectName: 'azure',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/microsoft-azure.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'Author',
              to: '/about/about-the-author'
            },
            {
              label: 'Special Thanks',
              to: '/about/special-thanks'
            }
          ]
        },
        {
          title: 'Get in touch',
          items: [
            {
              label: 'Blog',
              to: 'https://pollito.dev/',
            },
            {
              label: 'LinkedIn',
              to: 'https://www.linkedin.com/in/franco-becvort/'
            }
          ],
        },
        {
          title: 'Licenses',
          items: [
            {
              label: 'Code License',
              to: '/licenses/code-license'
            },
            {
              label: 'Content License',
              to: '/licenses/content-license'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Franco Exequiel Becvort. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

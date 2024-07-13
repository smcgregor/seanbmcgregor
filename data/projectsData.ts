interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'AI Incident Database',
    description: `todo todo todo.`,
    imgSrc: '/static/images/White_AIID.svg',
    href: 'https://incidentdatabase.ai',
  },
  {
    title: 'Dyff',
    description: `todo todo todo.`,
    imgSrc: '/static/images/dyff.svg',
    href: 'https://dyff.io',
  },
  {
    title: 'Dyff',
    description: `todo todo todo.`,
    imgSrc: '/static/images/dyff.svg',
    href: 'https://dyff.io',
  },
]

export default projectsData

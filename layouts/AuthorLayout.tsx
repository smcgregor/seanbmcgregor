import { ReactNode } from 'react'
import type { Authors, CV } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import SocialIcon from '@/components/social-icons'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Entry from '@/components/Drawer'

import { ReactIconLi, ReactIconInline } from 'components/Icons'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  cv: CoreContent<CV>[]
}

export default function AuthorLayout({ children, content, cv }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, about } = content

  const chapters = cv
    .filter((entry) => entry.path.includes('Chapters'))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const papers = cv
    .filter((entry) => entry.path.includes('Papers'))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const posters = cv
    .filter((entry) => entry.path.includes('Posters'))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const presentations = cv
    .filter((entry) => entry.path.includes('Presentations'))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const service = cv
    .filter((entry) => entry.path.includes('Service'))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <h1>About</h1>
            <div dangerouslySetInnerHTML={{ __html: about?.html }} />
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-full">
            {children}
            <h1>Curriculum Vitae</h1>
            <p>
              My maintained sources about my academic and professional histories are{' '}
              <a href="https://scholar.google.com/citations?user=kpHcM8YAAAAJ">Google Scholar</a>{' '}
              and <a href="https://www.linkedin.com/in/seanbmcgregor">LinkedIn</a>, respectively. I
              also give a narrative of my past and present efforts below, including details on my
              contributions to co-authored works.
            </p>
            <p>
              <ReactIconInline size={25} i="FaStar" /> = A particular career highlight.
            </p>
            <h2>Papers</h2>
            <ul>
              {papers.map((entry) => {
                return <Entry key={entry.citation} entry={entry}></Entry>
              })}
            </ul>
            <h2>Book Chapters</h2>
            <ul>
              {chapters.map((entry) => {
                return <Entry key={entry.citation} entry={entry}></Entry>
              })}
            </ul>
            <h2>Posters without Accompanying Presentations or Papers</h2>
            <ul>
              {posters.map((entry) => {
                return <Entry key={entry.citation} entry={entry}></Entry>
              })}
            </ul>
            <h2>Presentations without Accompanying Papers</h2>
            <ul>
              {presentations.map((entry) => {
                //return renderCVEntry(entry)
                return <Entry key={entry.citation} entry={entry}></Entry>
              })}
            </ul>
            <h2>Service</h2>
            <ul>
              {service.map((entry) => {
                return <Entry key={entry.title} entry={entry} service={true}></Entry>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {ReactIconInline} from "components/Icons"
import { MDXLayoutRenderer } from 'pliny/mdx-components'

function renderActionIcons(entry) {
  const {  demo, bibtex, paper, poster, slides, video } = entry;

  if ( ! (demo || bibtex || paper || poster || slides || video) ) {
    return false;
  }

  const activeColor = "black";

  return (
        <div className="space-y-4 xl:col-span-4">
          <div className="prose max-w-none text-gray-500 dark:text-gray-400 flex justify-between">
            {demo ? <a href={demo}><ReactIconInline i="LuMousePointerClick" color={activeColor}>Demo</ReactIconInline></a> : ""}
            {video ? <a href={video}><ReactIconInline i="MdOutlineOndemandVideo" color={activeColor}>Video</ReactIconInline></a> : ""}
            {slides ? <a href={slides}><ReactIconInline i="HiOutlinePresentationChartBar" color={activeColor}>Slides</ReactIconInline></a> : ""}
            {poster ? <a href={poster}><ReactIconInline i="PiVideoConferenceLight" color={activeColor}>Poster</ReactIconInline></a> : ""}
            {paper ? <a href={paper}><ReactIconInline i="SiArxiv" color={"black"}>Paper</ReactIconInline></a> : ""}
            {bibtex ? <ReactIconInline i="PiMapPinSimpleAreaLight" color={activeColor}>Bibtex</ReactIconInline> : ""}
          </div>
        </div>
  )
}

function tableRow(title, val) {

  if ( !val ) {
    return <></>
  }

  return (
    <div className="sm:flex sm:px-6 sm:py-5">
      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">{val}</dd>
    </div>
  );
}

export default function Entry({entry, service=false}) {
  const [open, setOpen] = useState(false)

  const {title, citation, venue, draft, year, authors, highlight} = entry;

  if (draft) {
    return (<></>)
  }

  const cite = service ? year + ":  " + title : citation;

  return (
    <li>
        <a
            onClick={() => setOpen(true)}
            className="zoom relative rounded-md"
          >
            {highlight ? <ReactIconInline size={25} i="FaStar" /> : <></>}{cite}
        </a>
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Dialog.Panel
                    className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">{title}</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <ReactIconInline i="MdClose" color={"black"}>Close</ReactIconInline>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Main */}
                      <div className="divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-0 sm:py-0">
                          <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                            {tableRow("People", entry.authors)}
                            {tableRow("Venue", entry.venue)}
                            {tableRow("Year", entry.year)}
                            {tableRow("Links", renderActionIcons(entry))}
                            <div className="sm:flex sm:px-6 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                <div className="prose space-y-4 xl:col-span-4">
                                  <MDXLayoutRenderer code={entry.body.code} />
                                </div>
                              </dd>
                            </div>
                            {tableRow("Citation", entry.citation)}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
    </li>
  )
}

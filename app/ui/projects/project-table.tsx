'use client';

import useFetchProjects from "@/app/lib/hooks/use-fetch-projects";
import TableComponent from "@/app/lib/table-component";
import {useState} from "react";
import { useRouter } from 'next/navigation'

const headers = ['code', 'name', 'manager', 'customer', 'upwork', 'status']

const ProjectTable = () => {
  const [sortBy , setSortBy] = useState<string|null>(null)
  const [projects, loading, error] = useFetchProjects(sortBy)
  const router = useRouter()

  const handleSort = (sortingKey:string) => {
    setSortBy(sortingKey);
  }

  const handleSelect = (projectId:string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <TableComponent headers={headers} data={projects} loading={loading} onSort={handleSort} onSelect={handleSelect} />
  )
}

export default ProjectTable

'use client';

import useFetchProjects from "@/app/lib/hooks/use-fetch-projects";
import Table from "@/app/lib/table";
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
    <Table headers={headers} data={projects} loading={loading} onSort={handleSort} onSelect={handleSelect} />
  )
}

export default ProjectTable

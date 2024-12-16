import { useState, useEffect } from 'react'
import { sampleUsers } from '@/lib/sample-data'

let isDataLoaded = false;

export function useUsers() {
  const [users, setUsers] = useState(sampleUsers)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!isDataLoaded) {
          // Simulate API call delay only for the first load
          await new Promise(resolve => setTimeout(resolve, 1000));
          isDataLoaded = true;
        }
        setUsers(sampleUsers)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching users'))
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}


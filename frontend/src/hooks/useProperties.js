import { useState, useEffect, useCallback, useRef } from 'react'
import { mockProperties } from '../data/mockProperties'

function applyFilters(data, filters) {
  return data.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.transactionType && p.transactionType !== filters.transactionType) return false
    if (filters.city && p.city !== filters.city) return false
    if (filters.quartier && p.quartier !== filters.quartier) return false
    if (filters.minPrice && p.price < Number(filters.minPrice)) return false
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false
    if (filters.minRooms && p.rooms < Number(filters.minRooms)) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const matched =
        p.city.toLowerCase().includes(q) ||
        Object.values(p.title).some((v) => v.toLowerCase().includes(q))
      if (!matched) return false
    }
    return true
  })
}

export function useProperties(initialFilters) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(initialFilters)

  const debounceRef = useRef(null)
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedFilters(filters), 400)
    return () => clearTimeout(debounceRef.current)
  }, [filters])

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(debouncedFilters).forEach(([key, val]) => {
        if (val !== '') params.append(key, val)
      })
      const res = await fetch(`/api/properties?${params.toString()}`)
      if (!res.ok) throw new Error('Network error')
      setProperties(await res.json())
    } catch {
      // API unavailable — use mock data with client-side filtering
      setProperties(applyFilters(mockProperties, debouncedFilters))
    } finally {
      setLoading(false)
    }
  }, [debouncedFilters])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  return { properties, loading, filters, setFilters }
}

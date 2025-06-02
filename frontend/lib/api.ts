const API_BASE_URL = '/api'

interface TourBase {
  title: string
  price: number
  location: string
  description: string
  durationId: number
  activityId: number
  included: string
  excluded: string
  accommodation: string
}

interface Tour extends TourBase {
  id: number
  createdAt: string
  updatedAt: string
  duration: {
    id: number
    name: string
  }
  activity: {
    id: number
    name: string
  }
  programs: Array<{
    id: number
    dayNumber: number
    description: string
    images: Array<{
      id: number
      url: string
      isAccommodation: boolean
    }>
  }>
  images: Array<{
    id: number
    url: string
    isAccommodation: boolean
  }>
}

export const fetchTours = async (): Promise<Tour[]> => {
  const response = await fetch(`${API_BASE_URL}/tours`)
  if (!response.ok) throw new Error('Failed to fetch tours')
  return response.json()
}

export const fetchTourById = async (id: number): Promise<Tour> => {
  const response = await fetch(`${API_BASE_URL}/tours/${id}`)
  if (!response.ok) throw new Error('Failed to fetch tour')
  return response.json()
}

export const createTour = async (tourData: TourBase): Promise<Tour> => {
  const response = await fetch(`${API_BASE_URL}/tours`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tourData)
  })
  if (!response.ok) throw new Error('Failed to create tour')
  return response.json()
}

export const updateTour = async (id: number, tourData: Partial<TourBase>): Promise<Tour> => {
  const response = await fetch(`${API_BASE_URL}/tours/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tourData)
  })
  if (!response.ok) throw new Error('Failed to update tour')
  return response.json()
}

export const deleteTour = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tours/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to delete tour')
}
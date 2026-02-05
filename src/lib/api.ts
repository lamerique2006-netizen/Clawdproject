// Backend API client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface GenerateRequest {
  product_image_url: string
  model_type: string
  position: string
}

export interface GenerateResponse {
  job_id: string
  status: string
  video_url?: string
}

export interface JobStatus {
  id: string
  status: string
  video_url?: string
  created_at: string
}

export async function generateVideo(request: GenerateRequest): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Failed to generate video: ${response.statusText}`)
  }

  return response.json()
}

export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`)

  if (!response.ok) {
    throw new Error(`Failed to get job status: ${response.statusText}`)
  }

  return response.json()
}

// Polling helper for job status
export async function pollJobStatus(
  jobId: string,
  maxAttempts: number = 120,
  delayMs: number = 1000
): Promise<JobStatus> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const status = await getJobStatus(jobId)
      if (status.status === 'completed' || status.status === 'failed') {
        return status
      }
    } catch (error) {
      console.error('Error polling job status:', error)
    }

    if (attempt < maxAttempts - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  throw new Error('Job polling timeout')
}

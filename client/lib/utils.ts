import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PRODUCTION_DOCX_URL = "https://dipakkhandagale.vercel.app/resume/Dipak_Khandagale_Resume.docx"
export const OFFICE_RESUME_VIEWER_URL = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(PRODUCTION_DOCX_URL)}`

export function handleResumeClick(e?: React.MouseEvent) {
  if (e) e.preventDefault()
  if (typeof window !== "undefined") {
    window.open(OFFICE_RESUME_VIEWER_URL, "_blank", "noopener,noreferrer")
  }
}

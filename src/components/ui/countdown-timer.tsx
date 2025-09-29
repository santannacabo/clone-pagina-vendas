"use client"

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  initialHours?: number
  initialMinutes?: number
  initialSeconds?: number
}

export function CountdownTimer({ 
  initialHours = 23, 
  initialMinutes = 45, 
  initialSeconds = 12 
}: CountdownTimerProps) {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        let { hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Timer acabou, reinicia
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="text-lg font-bold text-red-600">
      {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </div>
  )
}
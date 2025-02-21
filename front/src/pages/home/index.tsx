import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import {
  HomePageFirstStepSchema,
  HomePageSecondStepSchema,
  type HomePageFirstStepType,
  type HomePageSecondStepType
} from 'schemas'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'store'
import { FirstStepForm, SecondStepForm } from './steps'
import { useMutation } from '@tanstack/react-query'
import { register, type RegisterRequest, isAuthenticated } from 'services'
import { toast } from 'react-toastify'
import { text } from 'consts'
export function Home() {
  const { setUser } = useUserStore()
  const [step, setStep] = useState<'first' | 'second'>('first')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/clients')
    }
  }, [navigate])

  const firstStepForm = useForm<HomePageFirstStepType>({
    resolver: zodResolver(HomePageFirstStepSchema)
  })

  const secondStepForm = useForm<HomePageSecondStepType>({
    resolver: zodResolver(HomePageSecondStepSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: createUser } = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(text.CREATE_USER_SUCCESS)
        navigate('/login')
      }
    }
  })

  const handleLogin = useCallback(() => {
    const userData = {
      name: firstStepForm.getValues('name'),
      email: secondStepForm.getValues('email'),
      password: secondStepForm.getValues('password')
    }
    createUser(userData)
  }, [navigate, setUser, firstStepForm, secondStepForm, createUser])

  const handleNextStep = useCallback((data: HomePageFirstStepType) => {
    if (data) setStep('second')
  }, [])

  const handleStepBack = useCallback(() => {
    setStep('first')
    secondStepForm.reset()
    firstStepForm.reset()
  }, [secondStepForm, firstStepForm])

  const ComponentMap = {
    first: FirstStepForm({ handleNextStep, firstStepForm }),
    second: SecondStepForm({ handleLogin, handleStepBack, secondStepForm })
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      {ComponentMap[step]}
    </section>
  )
}

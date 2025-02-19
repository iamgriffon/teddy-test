import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import {
  HomePageFirstStepSchema,
  HomePageSecondStepSchema,
  type HomePageFirstStepType,
  type HomePageSecondStepType
} from 'schemas'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'store'
import { UserDTO } from 'dtos'
import { FirstStepForm, SecondStepForm } from './steps'
import { useMutation } from '@tanstack/react-query'
import { register, type RegisterRequest } from 'services'
import { toast } from 'react-toastify'

export function Home() {
  const { setUser } = useUserStore()
  const [step, setStep] = useState<'first' | 'second'>('first')
  const navigate = useNavigate()

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
        toast.success('Usuário criado com sucesso!')
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
  }, [navigate, setUser, firstStepForm, secondStepForm])

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

  return ComponentMap[step]
}

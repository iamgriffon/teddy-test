import { UseFormReturn } from 'react-hook-form'
import { HomePageFirstStepType, HomePageSecondStepType } from 'schemas'

export interface FirstStepFormProps {
  handleNextStep: (data: HomePageFirstStepType) => void
  firstStepForm: UseFormReturn<HomePageFirstStepType>
}

export interface SecondStepFormProps {
  handleLogin: (data: HomePageSecondStepType) => void
  handleStepBack: () => void
  secondStepForm: UseFormReturn<HomePageSecondStepType>
}

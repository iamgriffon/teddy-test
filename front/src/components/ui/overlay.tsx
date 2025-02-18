interface OverlayProps {
  children?: React.ReactNode
}

export function Overlay({ children }: OverlayProps) {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-theme-black/90" data-testid="overlay">
      {children}
    </div>
  )
}

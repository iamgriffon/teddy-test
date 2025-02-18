interface OverlayProps {
  children?: React.ReactNode
}

export function Overlay({ children }: OverlayProps) {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-screen bg-theme-black/90"
      data-testid="overlay"
    >
      {children}
    </div>
  )
}

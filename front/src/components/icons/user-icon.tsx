import { IconProps } from "./types";

export function UserIcon({
  className,
  width = 12,
  height = 18,
  fill = '#EE7D46',
  stroke = 'none'
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 18"
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00003 0.625C3.8167 0.625 2.0417 2.4 2.0417 4.58333C2.0417 6.725 3.7167 8.45833 5.90003 8.53333C5.9667 8.525 6.03336 8.525 6.08336 8.53333C6.10003 8.53333 6.10836 8.53333 6.12503 8.53333C6.13336 8.53333 6.13336 8.53333 6.1417 8.53333C8.27503 8.45833 9.95003 6.725 9.95836 4.58333C9.95836 2.4 8.18336 0.625 6.00003 0.625Z"
        fill={fill}
      />
      <path
        d="M10.2334 10.75C7.90836 9.2 4.1167 9.2 1.77503 10.75C0.716695 11.4583 0.133362 12.4167 0.133362 13.4417C0.133362 14.4667 0.716695 15.4167 1.7667 16.1167C2.93336 16.9 4.4667 17.2917 6.00003 17.2917C7.53336 17.2917 9.0667 16.9 10.2334 16.1167C11.2834 15.4083 11.8667 14.4583 11.8667 13.425C11.8584 12.4 11.2834 11.45 10.2334 10.75Z"
        fill={fill}
      />
    </svg>
  )
}

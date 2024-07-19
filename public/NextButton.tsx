
type NextButtonProps ={
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const NextButton:React.FC<NextButtonProps> =({onClick}) => {
    return <button className="flex justify-center align-middle"   onClick= {onClick}>
    <svg
      width="20"
      height="60"
      viewBox="0 0 12 21"
      fill="#885801"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.22998 18.73L1.99998 20.5L12 10.5L1.99998 0.5L0.22998 2.27L8.45998 10.5L0.22998 18.73Z"
      />
    </svg>
  </button>
}
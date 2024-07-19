type PrevButtonProps ={
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PrevButton: React.FC<PrevButtonProps>= ({onClick}) => {
    return <button className="flex justify-center align-middle" onClick= {onClick}>
    <svg
      width="20"
      height="60"
      viewBox="0 0 12 21"
      fill="#885801"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5098 2.37001L10.7298 0.600006L0.839844 10.5L10.7398 20.4L12.5098 18.63L4.37984 10.5L12.5098 2.37001Z"
      />
    </svg>
  </button>
}
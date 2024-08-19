type Props = React.SVGProps<SVGSVGElement>;

const HamburgerIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    {...props}
  >
    <path
      d="M2 1.66602H18M2 6.99935H18M2 12.3327H18"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HamburgerIcon;

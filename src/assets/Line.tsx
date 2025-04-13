import { useAnimatedValue } from "../hooks";

export default function DrawnLine(props: {
  strokeColor?: string;
  strokeWidth?: number;
}) {
  const versions: React.ReactElement[] = [
    <DrawnLineA {...props} key="a" />,
    <DrawnLineB {...props} key="b" />,
    <DrawnLineC {...props} key="c" />,
    <DrawnLineD {...props} key="d" />,
  ];

  const versionIndex = useAnimatedValue(versions.length);

  const currentVersion = versions[versionIndex];

  return currentVersion;
}

function DrawnLineD({
  strokeColor = "#FFFAC9",
  strokeWidth = 3,
}: {
  strokeColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width="248"
      height="12"
      viewBox="0 0 248 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M1.86523 5.69971C9.83635 5.69971 25.9527 6.5839 37.2931 8.15133C67.2126 12.2867 72.8416 6.1552 101.558 5.47866C114.404 5.17602 125.973 2.59165 140.69 1.90171C153.219 1.31434 169.299 3.90454 175.776 4.58108C186.235 5.67349 201.451 4.81552 206.817 3.02705C212.472 1.14184 218.867 2.56485 227.568 2.7993C229.598 2.57825 230.924 2.13616 234.26 1.90841C237.596 1.68066 242.901 1.68066 245.688 1.68066"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrawnLineA({
  strokeColor = "#FFFAC9",
  strokeWidth = 3,
}: {
  strokeColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width="250"
      height="12"
      viewBox="0 0 250 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2.14307 9.78311C2.58969 8.88986 13.3154 8.4297 29.5529 8.54136C39.5737 8.61027 46.5686 9.32972 54.7364 9.66807C61.7825 9.95996 74.7397 9.78311 81.8586 9.67145C91.6994 9.51711 95.731 8.65978 105.641 8.31805C110.211 8.16047 114.232 6.85975 123.906 6.06463C136.613 5.02009 146.037 3.92286 157.402 3.58113C164.982 3.35322 173.565 2.79277 180.837 2.45442C187.209 2.15791 199.05 2.33938 205.594 2.45104C213.037 2.57804 222.214 3.01608 235.067 2.90443C239.659 2.79277 240.329 2.56946 241.791 2.45442C243.252 2.33938 245.485 2.33938 247.786 2.33938"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrawnLineB({
  strokeColor = "#FFFAC9",
  strokeWidth = 3,
}: {
  strokeColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width="246"
      height="12"
      viewBox="0 0 246 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M244.019 2.21875C242.456 4.68871 237.943 7.40229 232.089 8.19403C226.921 8.89303 221.499 8.98578 216.63 9.54744C211.124 10.1825 205.258 8.30907 198.379 7.74741C182.951 6.48762 175.726 8.30907 170.272 8.87074C166.676 9.24106 149.66 8.30907 137.909 7.74741C135.544 7.63436 133.277 7.85568 126.896 8.19403C112.272 8.96942 101.025 8.08576 93.5206 7.74741C77.3229 7.01712 65.6067 7.85568 60.7885 8.19403C50.858 8.8914 43.2755 8.08576 39.0156 7.74741C24.3735 6.58441 14.4682 8.30907 7.86362 9.54406C6.95684 9.88579 6.06359 10.1091 5.04516 10.2241C4.02672 10.3392 2.91016 10.3392 1.75977 9.66248"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrawnLineC({
  strokeColor = "#FFFAC9",
  strokeWidth = 3,
}: {
  strokeColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width="255"
      height="9"
      viewBox="0 0 255 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2.43652 5.6926C2.65984 5.6926 2.88315 5.6926 9.92085 5.6926C16.9586 5.6926 30.8039 5.6926 38.6063 5.58094C50.7041 5.40781 56.099 4.56927 66.4526 4.5625C72.1225 4.5588 79.3099 5.6926 86.7469 5.80425C91.07 5.86916 100.254 6.3693 112.766 6.48095C122.878 6.57119 130.536 6.59938 142.917 6.25764C145.662 6.18186 146.777 5.92267 155.727 5.80763C164.676 5.6926 181.424 5.6926 190.499 5.58094C200.472 5.45823 206.077 5.01589 213.629 4.90424C223.679 4.75564 235.439 4.11588 239.472 3.77753C235.439 4.11588 236.332 3.89257 239.472 3.77753C242.612 3.66249 247.971 3.66249 253.493 2.30908"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

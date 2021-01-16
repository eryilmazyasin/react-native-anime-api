import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-search"
      {...props}
    >
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  )
}

export default SvgComponent

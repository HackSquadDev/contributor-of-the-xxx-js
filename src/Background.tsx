interface IProps {
    width: string;
    height: string;
}

export const Background = (props: IProps) => {
    const { height, width } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={width}
            height={height}
            preserveAspectRatio="none"
            viewBox={`0 0 ${width} ${height}`}
        >
            <g mask='url("#SvgjsMask1636")' fill="none">
                <rect
                    width={width}
                    height={height}
                    x="0"
                    y="0"
                    fill="url(#SvgjsLinearGradient1637)"
                ></rect>
                <path
                    d="M1005.9522635196554 331.29510736068596L1117.8408189353902 54.361214803459916 729.0183709624293 219.4065519449511z"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float2"
                ></path>
                <path
                    d="M232.68957834717634 597.3584945164466L-76.89657436108081 597.3584945164466-76.89657436108081 906.9446472247038 232.68957834717637 906.9446472247038z"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float3"
                ></path>
                <path
                    d="M768.43 872.43 a230.51 230.51 0 1 0 461.02 0 a230.51 230.51 0 1 0 -461.02 0z"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float2"
                ></path>
                <path
                    d="M-14.16 368.23 a245.16 245.16 0 1 0 490.32 0 a245.16 245.16 0 1 0 -490.32 0z"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float3"
                ></path>
                <path
                    d="M1316.799,821.542C1418.011,818.631,1485.996,729.466,1535.282,641.017C1582.868,555.617,1613.76,456.198,1568.725,369.426C1520.523,276.552,1421.436,219.852,1316.799,220.048C1212.49,220.244,1117.189,279.201,1066.504,370.368C1017.199,459.053,1026.182,565.514,1075.406,654.244C1126.309,745.999,1211.913,824.559,1316.799,821.542"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float3"
                ></path>
                <path
                    d="M1537.563,226.879C1574.457,226.825,1609.069,208.004,1627.429,176.003C1645.705,144.148,1644.251,104.929,1625.718,73.223C1607.36,41.817,1573.921,21.063,1537.563,22.264C1503.002,23.406,1476.446,48.905,1458.952,78.733C1441.197,109.006,1430.794,145.264,1447.244,176.265C1464.582,208.939,1500.574,226.933,1537.563,226.879"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float2"
                ></path>
                <path
                    d="M492.7 837.02 a274.1 274.1 0 1 0 548.2 0 a274.1 274.1 0 1 0 -548.2 0z"
                    fill="rgba(142, 28, 28, 0.53)"
                    className="triangle-float3"
                ></path>
            </g>
            <defs>
                <mask id="SvgjsMask1636">
                    <rect width={width} height={height} fill="#ffffff"></rect>
                </mask>
                <linearGradient
                    x1="50%"
                    y1="100%"
                    x2="50%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                    id="SvgjsLinearGradient1637"
                >
                    <stop stop-color="rgba(195, 109, 43, 1)" offset="0"></stop>
                    <stop stop-color="rgba(149, 14, 85, 1)" offset="1"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};

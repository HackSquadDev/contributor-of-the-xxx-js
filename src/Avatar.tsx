import { interpolate, useCurrentFrame } from 'remotion';

interface IProps {
    src: string;
    size?: string;
}

export const Avatar = (props: IProps) => {
    const { src, size = '256px' } = props;
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });

    return (
        <img
            style={{ opacity }}
            draggable="false"
            src={src}
            width={size}
            height={size}
            className="rounded-full ring-8 ring-[#e2894a] ring-opacity-30"
        />
    );
};

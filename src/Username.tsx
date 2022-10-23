import { interpolate } from 'remotion';
import { useCurrentFrame } from 'remotion';
import React from 'react';

interface IProps {
    name: string;
}

export const Username = (props: IProps) => {
    const { name } = props;
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [20, 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    });
    return (
        <div
            style={{ opacity }}
            className="text-white text-5xl font-bold leading-relaxed"
        >
            {name}
        </div>
    );
};

import { AbsoluteFill, useVideoConfig } from 'remotion';
import { Avatar } from './Avatar';
import { Background } from './Background';
import { Username } from './Username';

export const MyComposition = () => {
    const config = useVideoConfig();

    return (
        <>
            <Background
                width={`${config.width}px`}
                height={`${config.height}px`}
            />
            <AbsoluteFill className="bg-transparent justify-center items-center">
                <Avatar src="https://avatars.githubusercontent.com/u/46562212?v=4" />
                <Username name="Archaeopteryx1" />
            </AbsoluteFill>
        </>
    );
};

import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import './style.css';

export const RemotionVideo: React.FC = () => {
    return (
        <>
            <Composition
                id="MyComp"
                component={MyComposition}
                durationInFrames={150}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    );
};

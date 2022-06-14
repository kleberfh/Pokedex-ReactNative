import AnimatedLottieView from 'lottie-react-native';

export default function PokeballLoading() {
  // @ts-ignore
  return <AnimatedLottieView
    style={{
      width: 120,
      height: 120,
    }}
    loop={true}
    autoPlay={true}
    source={require('../assets/animations/pokeball-loading-animation.json')}
  />
};
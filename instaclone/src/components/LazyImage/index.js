import React, {useState, useEffect} from 'react';
import { Animated } from 'react-native'

import {Small, Original} from './styles'

const OriginalAnimated = Animated.createAnimatedComponent(Original)


export default function LazyImage({
    smallSource,
    Source,
    aspectRatio,
    shouldLoad,
}) { 
    const opacity = new Animated.Value(0)
    const [load,setLoad] = useState(false)

    useEffect(()=>{
        if(shouldLoad){ 
            setTimeout(() => {
                setLoad(true)
            }, 1000)
        }
    }, [shouldLoad]) //dispara quando mudar

    function handleAnimate() {
        Animated.timing(opacity, {
            toValue: 1, //incrementa ate quando
            duration: 500, //demora quanto
            useNativeDriver: true, //usar isso
        }).start()
    }


  return (
    <Small 
        source = {smallSource}
        aspect={aspectRatio}
        resizeMode = 'contain'   
        blurRadius = {3} 
    >
        {load && <OriginalAnimated 
            style = {{ opacity }}
            source = {Source}
            aspect = {aspectRatio}
            resizeMode = 'contain'
            onLoadEnd={handleAnimate}
        />}
    </Small>
  );
}
